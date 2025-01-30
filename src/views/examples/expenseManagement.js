// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
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
import React, { useState } from "react";
import DataTable from "react-data-table-component";
// core components
import Header from "components/Headers/Header.js";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { toastify } from "common/helpers/toast";
import { Ability } from "@casl/ability";

import { abilities } from "common/constant/constant";
import jwtDecode from "jwt-decode";
import EmpHeader from "components/Headers/empHeader";

const ExpenseManagement = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);

  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const roleAbilities = abilities[user.ability] || [];
  const ability = new Ability(roleAbilities);

  const acceptExpenseHandler = async (userId, expenseId) => {
    const update = { approvalStatus: "Approved" };

    const response = await fetch(
      `https://jewellers-erp.onrender.com/users/${userId}/expenses/${expenseId}`,
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
    toastify({ msg: "Expense Approved Successfully", type: "success" });
    setPending(true);
    refetchData();
  };
  const rejectExpenseHandler = async (userId, expenseId) => {
    const update = { approvalStatus: "Rejected" };

    const response = await fetch(
      `https://jewellers-erp.onrender.com/users/${userId}/expenses/${expenseId}`,
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
    toastify({ msg: "Expense Rejected Successfully", type: "danger" });
    setPending(true);
    refetchData();
  };

  // const ability = useContext(Ability.)
  const expenseTableColumns = [
    {
      name: "NAME",
      selector: (row) => row.name,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
    },
    {
      name: "STATUS",
      selector: (row) => row.approvalStatus,
      cell: (row) => {
        if (row.approvalStatus === "Pending")
          return (
            <div className="bg-yellow p-2 text-white rounded">
              {row.approvalStatus}
            </div>
          );
        if (row.approvalStatus === "Rejected")
          return (
            <div className="bg-danger p-2 text-white rounded">
              {row.approvalStatus}
            </div>
          );
        if (row.approvalStatus === "Approved")
          return (
            <div className="bg-success p-2 text-white rounded">
              {row.approvalStatus}
            </div>
          );
      },
    },
    ability.can("manage", "Expense Management") && {
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        if (row.approvalStatus === "Pending") {
          return (
            <div>
              <button
                className=" btn btn-success p-2"
                onClick={() =>
                  acceptExpenseHandler(row.sessionId, row.expenseId)
                }
              >
                Accept
              </button>
              <button
                className=" btn btn-danger p-2"
                onClick={() =>
                  rejectExpenseHandler(row.sessionId, row.expenseId)
                }
              >
                Reject
              </button>
            </div>
          );
        } else {
          return (
            <span className="bg-info p-2 text-white rounded">Settled</span>
          );
        }
      },
    },
  ];

  const { data, refetchData } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",

    pending,
    setPending
  );

  const flattenedExpenseData = data?.flatMap((item) =>
    item.expenses.map((expense) => ({
      ...item,
      ...expense,
    }))
  );

  const expenseData = flattenedExpenseData.filter(item => item.ability !== "HR_ABILITY");

  return (
    <>
      {user.ability === "CEO_ABILITY" && <Header />}
      {user.ability !== "CEO_ABILITY" && <EmpHeader />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Expense Management</h3>
              </CardHeader>
              <DataTable
                columns={expenseTableColumns}
                data={expenseData}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ExpenseManagement;
