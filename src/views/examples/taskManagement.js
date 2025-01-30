// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
  Col,
  // CardFooter,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Media,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  // Progress,
  // Table,
  Container,
  Row,
  // UncontrolledTooltip,
} from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
// core components
import Header from "components/Headers/Header.js";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { toastify } from "common/helpers/toast";
import TaskAssignedTo from "./taskAssignedTo";

import { abilities } from "common/constant/constant";
import { Ability } from "@casl/ability";
import jwtDecode from "jwt-decode";
import EmpHeader from "components/Headers/empHeader";
import LongNameFormatter from "components/common/longName";

const TaskManagement = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { data, refetchData } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",
    pending,
    setPending
  );

  const taskTableColumns = (openModal) => [
    {
      name: "TASK ASSIGNED BY",
      selector: (row) => row.name || row.assignedbyName,
    },
    {
      name: "TASK TITLE",
      selector: (row) => row.title,
      cell: (row) => (
        <LongNameFormatter content={row.title} max={20} id={row._id} />
      ),
    },
    {
      name: "TASK ASSIGNED TO",
      selector: (row) => row.assignedToName,
    },
    {
      name: "EMAIL",
      selector: (row) => row.assignedTo,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      cell: (row) => {
        if (row.status === "Assigned")
          return (
            <div className="bg-yellow p-2 text-white rounded">{row.status}</div>
          );
        if (row.status === "Completed")
          return (
            <div className="bg-green p-2 text-white rounded">{row.status}</div>
          );
        if (row.status === "In Progress")
          return (
            <div className="bg-orange p-2 text-white rounded">{row.status}</div>
          );
      },
    },
    {
      name: "DEADLINE",
      selector: (row) => row.deadline,
      sortable: true,
    },
    ability.can("manage", "Task Management") && {
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        const isDisabled = row.status === "Completed";
        return (
          <button
            className="btn btn-default px-4 py-2"
            onClick={() => !isDisabled && openModal(row)}
            disabled={isDisabled}
          >
            Edit
          </button>
        );
      },
    },
  ];
  // // console.log(data);

  // const selectToUserId = (id) => {

  // };
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const roleAbilities = abilities[user.ability] || [];
  const ability = new Ability(roleAbilities);

  const openModal = (task) => {
    setSelectedTask(task);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModal(false);
  };

  const flattenedTaskData = data?.flatMap((item) => {
    if (item.assignedByYou) {
      return item.assignedByYou.map((task) => ({
        ...item,
        ...task,
      }));
    } else {
      return item;
    }
  });
  // // console.log(flattenedTaskData);
  async function taskModificationHandler(selectedTask) {
    // // console.log(selectedTask);
    const update = {
      title: selectedTask.title,
      deadline: selectedTask.deadline,
      name: selectedTask.name,
    };
    // // console.log(update);
    const response = await fetch(
      `https://jewellers-erp.onrender.com/taskModification/${selectedTask.assignedTo}/${selectedTask.id}/${selectedTask.taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // // console.log(selectedTask);
    toastify({ msg: "Task Reassigned", type: "success" });
    setPending(true);
    refetchData();
  }
  const emp = data.filter(
    (curEmp) =>
      curEmp.ability === "EMP_ABILITY" ||
      curEmp.ability === "HR_ABILITY" ||
      curEmp.ability === "TL_ABILITY"
  );
  // // console.log(emp);
  return (
    <>
      {user.ability === "CEO_ABILITY" && <Header />}
      {user.ability !== "CEO_ABILITY" && <EmpHeader />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          {ability.can("read", "Task Management") &&
            ability.can("read", "Task Assigned By") && (
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Task Management By You:</h3>
                  </CardHeader>

                  <DataTable
                    columns={taskTableColumns(openModal)}
                    data={flattenedTaskData}
                    defaultSortFieldId={6}
                    defaultSortAsc={false}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    progressPending={pending}
                  />
                </Card>
              </div>
            )}
        </Row>
        <div className="">
          {ability.can("manage", "Task Assigned To") && <TaskAssignedTo />}
        </div>

        <Modal isOpen={modal} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>
            Edit Task {selectedTask?.taskId}
          </ModalHeader>
          <ModalBody>
            <form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <Container>
                  <Row className="align-items-center">
                    <Col lg={4}>
                      {" "}
                      <label htmlFor="task-title">Task Title:</label>
                    </Col>
                    <Col lg={8}>
                      {" "}
                      <input
                        id="task-title"
                        className="form-control mx-4"
                        type="text"
                        value={selectedTask?.title || ""}
                        onChange={(e) =>
                          setSelectedTask({
                            ...selectedTask,
                            title: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col lg={4} className="mt-4">
                      {" "}
                      <label htmlFor="deadline">Deadline:</label>
                    </Col>
                    <Col lg={8} className="mt-4">
                      {" "}
                      <input
                        id="deadline"
                        className="form-control mx-4"
                        type="date"
                        value={selectedTask?.deadline || ""}
                        onChange={(e) =>
                          setSelectedTask({
                            ...selectedTask,
                            deadline: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col lg={4} className="mt-4">
                      {" "}
                      <label htmlFor="assigned-to">Assigned To:</label>
                    </Col>
                    <Col lg={8} className="mt-4">
                      {" "}
                      <select
                        name="employee"
                        id="employee"
                        className="form-control mx-4  "
                        onChange={(e) => {
                          const [name, id] = e.target.value.split("|");
                          setSelectedTask({ ...selectedTask, name, id });
                          // selectToUserId(id);
                        }}
                      >
                        {" "}
                        <option value="">Select One of the employees</option>
                        {emp &&
                          emp.map((curEmp, index) => {
                            return (
                              <option
                                value={`${curEmp.name}|${curEmp.sessionId}`}
                                key={index}
                              >
                                {curEmp.name}
                              </option>
                            );
                          })}
                      </select>
                    </Col>
                  </Row>
                </Container>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                taskModificationHandler(selectedTask);
                closeModal();
              }}
            >
              Save
            </Button>
            <Button color="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default TaskManagement;
