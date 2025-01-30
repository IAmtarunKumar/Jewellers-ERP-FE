import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,

  // UncontrolledTooltip,
} from "reactstrap";
import DataTable from "react-data-table-component";
// core components
import LongNameFormatter from "components/common/longName";
import SalesHeader from "components/Headers/salesHeader";
import { toastify } from "common/helpers/toast";
import jwtDecode from "jwt-decode";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";



const RejectedClients = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [rejectedClient, setRejectedClient] = useState([]);
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }

  const reopenClientHandler = async (data) => {
    const update = {
      data,
      userId: user.email,
    };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/api/reopenClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );

      const responseData = await response.text();
      getRejectedClients();
      toastify({ msg: responseData, type: "success" });
    } catch (error) {
      toastify({ msg: error, type: "error" });
      console.error("Error:", error);
    }
  };

  const rejectedTableColumns = () => [
    {
      name: "Company Name",
      selector: (row) => row.companyName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Company Type",
      selector: (row) => row.companyType,
    },
    {
      name: "Keywords",
      selector: (row) => row.keywords,
      cell: (row) => row.keywords.join(","),
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) => (
        <LongNameFormatter content={row.description} max={20} id={row._id} />
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Rejected By Name",
      selector: (row) => row.rejectedBy.name,
    },
    {
      name: "Rejected By Email",
      selector: (row) => row.rejectedBy.email,
      cell: (row) => (
        <LongNameFormatter
          content={row.rejectedBy.email}
          max={20}
          id={row._id}
        />
      ),
    },
    {
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        return (
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => reopenClientHandler(row)}
          >
            Reopen
          </button>
        );
      },
    },
  ];

  async function getRejectedClients() {
    try {
      const response = await fetch("https://jewellers-erp.onrender.com/rejectedClients");
      const data = await response.json();
      setRejectedClient(data);
      setPending(false);
      // // console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPending(false);
    }
  }
  useEffect(() => {
    getRejectedClients();
  }, []);
  const { data: empData } = useAllEmpDetails(
    `https://jewellers-erp.onrender.com/users/${user.sessionId}`,
    pending,
    setPending
  );
  return (
    <>
      <SalesHeader empData={empData} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Leads Not Converted:</h3>
              </CardHeader>
              <DataTable
                columns={rejectedTableColumns()}
                data={rejectedClient}
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

export default RejectedClients;
