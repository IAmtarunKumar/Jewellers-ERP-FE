import Header from "components/Headers/Header";
import EmpHeader from "components/Headers/empHeader";
import LongNameFormatter from "components/common/longName";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardHeader, Container, Row } from "reactstrap";

const OverdueTasksTable = () => {
  const [overDueTasks, setOverDueTasks] = useState([]);
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }

  async function getOverdueTasks(email) {
    try {
      const response = await fetch(`https://jewellers-erp.onrender.com/overduetasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const pendingTasks = await response.json();
      setOverDueTasks(pendingTasks);
    } catch (error) {
      console.error("Failed to fetch overdue tasks:", error);
    }
  }

  useEffect(() => {
    if (user && user.email) {
      getOverdueTasks(user.email);
    }
  }, [user, user.email]);

  // Flatten the tasks for easier mapping to the DataTable
  const flattenedTasks = overDueTasks.flatMap((taskGroup) =>
    taskGroup.tasks.map((task) => ({
      employeeName: taskGroup.employeeName,
      assignedBy: task.assignedBy,
      assignedByName: task.assignedByName,
      title: task.title,
      deadline: task.deadline,
      status: task.status,
      taskId: task.taskId,
    }))
  );

  // Define the table columns
  const columns = [
    {
      name: "EMPLOYEE NAME",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "ASSIGNED BY",
      selector: (row) => `${row.assignedBy} (${row.assignedByName})`,
      sortable: true,
      wrap: true,
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
      cell: (row) => (
        <LongNameFormatter content={row.title} max={20} id={row._id} />
      ),
      sortable: true,
    },
    {
      name: "DEADLINE",
      selector: (row) => row.deadline,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "TASK ID",
      selector: (row) => row.taskId,
      sortable: true,
    },
  ];

  return (
    <div>
      {user.ability === "CEO_ABILITY" && <Header />}
      {user.ability !== "CEO_ABILITY" && <EmpHeader />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Overdue Tasks</h3>
              </CardHeader>
              <DataTable
                columns={columns}
                data={flattenedTasks}
                pagination
                defaultSortFieldId={4}
                defaultSortAsc={false}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default OverdueTasksTable;
