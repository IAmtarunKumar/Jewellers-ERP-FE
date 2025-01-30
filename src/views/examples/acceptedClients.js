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
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import jwtDecode from "jwt-decode";

const AcceptedClients = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [acceptedClient, setAcceptedClient] = useState([]);

  const acceptedTableColumns = () => [
    {
      name: "Company Name",
      selector: (row) => row.companyName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => (
        <LongNameFormatter content={row.email} max={20} id={row._id} />
      ),
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
      name: "Accepted By Name",
      selector: (row) => row.acceptedBy.name,
    },
    {
      name: "Accepted By Email",
      selector: (row) => row.acceptedBy.email,
      cell: (row) => (
        <LongNameFormatter content={row.acceptedBy.email} max={20} id={row._id} />
      ),
    },
  ];

  async function getAcceptedClients() {
    try {
      const response = await fetch("https://jewellers-erp.onrender.com/acceptedClients");
      const data = await response.json();
      setAcceptedClient(data);
      setPending(false);
      // // console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPending(false);
    }
  }
  useEffect(() => {
    getAcceptedClients();
  }, []);
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
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
                <h3 className="text-white mb-0">Leads Converted:</h3>
              </CardHeader>
              <DataTable
                columns={acceptedTableColumns()}
                data={acceptedClient}
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

export default AcceptedClients;
