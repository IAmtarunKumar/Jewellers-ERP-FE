// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
  ModalFooter,
  Container,
  Button,
  Row,
  // UncontrolledTooltip,
} from "reactstrap";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import jwtDecode from "jwt-decode";

// core components

import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { toastify } from "common/helpers/toast";
import LongNameFormatter from "components/common/longName";

const TaskAssignedTo = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  // eslint-disable-next-line
  const [modal, setModal] = useState(false);
  // eslint-disable-next-line
  const [selectedTask, setSelectedTask] = useState(null);
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }

  const { data, refetchData } = useAllEmpDetails(
    `https://jewellers-erp.onrender.com/users/${user.sessionId}`,

    pending,
    setPending
  );
  // // console.log(data);
  const tasks = data.assignedToYou;

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isNear = (date) => {
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    return date > today && date <= twoDaysFromNow;
  };

  const sendNotification = (row) => {
    const deadlineDate = new Date(row.deadline);
    if (isToday(deadlineDate)) {
      toastify({ msg: `Task ${row.title} is due today.`, type: "error" });
    } else if (isNear(deadlineDate)) {
      toastify({ msg: `Task ${row.title} is due soon.`, type: "error" });
    }
  };

  useEffect(() => {
    tasks?.forEach((task) => {
      if (task.status !== "Completed") {
        const deadlineDate = new Date(task.deadline);
        if (isToday(deadlineDate) || isNear(deadlineDate)) {
          sendNotification(task);
        }
      }
    });
    // eslint-disable-next-line
  }, [tasks]);

  const taskTableColumns = (openModal) => [
    {
      name: "TASK ASSIGNED BY",
      selector: (row) => row.assignedByName,
    },
    {
      name: "TASK TITLE",
      selector: (row) => row.title,
      cell: (row) => (
        <LongNameFormatter content={row.title} max={20} id={row._id} />
      ),
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
    },
    {
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

  const openModal = (task) => {
    setSelectedTask(task);
    setModal(true);
  };
  // eslint-disable-next-line
  const closeModal = () => {
    setSelectedTask(null);
    setModal(false);
  };
  // // console.log(user);
  const flattenedTaskData = data.assignedToYou;
  // // console.log(flattenedTaskData);

  async function taskStatusHandler(selectedTask) {
    // // console.log(selectedTask);
    const update = {
      status: selectedTask.status,
    };
    // // console.log(update);

    const response = await fetch(
      `https://jewellers-erp.onrender.com/taskStatus/${user.sessionId}/assignedToYou/${selectedTask.taskId}`,
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
    // // // console.log(selectedTask);
    toastify({ msg: "Task Status Updated", type: "success" });
    setPending(true);
    refetchData();

    if (selectedTask.status === "Completed") {
      let yourDate = new Date();
      const date = yourDate.toISOString().split("T")[0];

      await fetch(`https://jewellers-erp.onrender.com/updateScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          deadline: selectedTask.deadline,
          date,
        }),
      });
      // // console.log(data.json());
    }
  }

  return (
    <>
      <Card className="shadow mt-5">
        <CardHeader className="border-0">
          <h3 className="mb-0">Task Assigned To You</h3>
        </CardHeader>

        <DataTable
          columns={taskTableColumns(openModal)}
          data={flattenedTaskData}
          defaultSortFieldId={4}
          defaultSortAsc={false}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          progressPending={pending}
        />
      </Card>

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
                    <label htmlFor="task-title">Status:</label>
                  </Col>
                  <Col lg={8}>
                    {" "}
                    <select
                      name="employee"
                      id="employee"
                      className="form-control mx-4  "
                      onChange={(e) => {
                        setSelectedTask({
                          ...selectedTask,
                          status: e.target.value,
                        });
                      }}
                    >
                      {" "}
                      <option value="">Select One of the status</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
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
              taskStatusHandler(selectedTask);
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
    </>
  );
};

export default TaskAssignedTo;
