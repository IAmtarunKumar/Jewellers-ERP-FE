import {
  Card,
  CardHeader,
  Container,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  Row,
  Col,
  Form,
  // UncontrolledTooltip,
} from "reactstrap";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
// core components
import SalesHeader from "components/Headers/salesHeader.js";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
// import { toastify } from "common/helpers/toast";
// import { Ability } from "@casl/ability";

// import { abilities } from "common/constant/constant";
import LongNameFormatter from "components/common/longName";
import TextAreaField from "common/fields/textarea-field";
import { useForm } from "react-hook-form";

import { toastify } from "common/helpers/toast";
import jwtDecode from "jwt-decode";
import Loader from "common/loader/loader";

const SalesLeads = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [pitchModal, setPitchModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [pitchData, setPitchData] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const {
    handleSubmit,
    reset,
    register,
    //eslint-disbale-next-line
    // formState: { errors },
    control,
  } = useForm();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pitchData);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy text");
    }
  };

  const openModal = (sale) => {
    setSelectedSale(sale);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedSale(null);
    setModal(false);
  };
  const closePitchModal = () => {
    setPitchData(null);
    setPitchModal(false);
  };
  const { data: salesData, refetchData: refetchSalesData } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/sales",
    pending,
    setPending
  );
  const { data: empData, refetchData: refetchEmpData } = useAllEmpDetails(
    `https://jewellers-erp.onrender.com/users/${user.sessionId}`,
    pending,
    setPending
  );
  const clientTableHandler = async (data) => {
    const update = {
      data,
      userId: user.email,
    };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/api/salesLeadsToUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );

      const responseData = await response.text();
      refetchEmpData();
      refetchSalesData();
      toastify({ msg: responseData, type: "success" });
    } catch (error) {
      toastify({ msg: error, type: "error" });
    }
  };
  const acceptClientHandler = async (data) => {
    const update = {
      data,
      userId: user.email,
    };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/api/acceptedClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );

      const responseData = await response.text();
      refetchEmpData();
      refetchSalesData();
      toastify({ msg: responseData, type: "success" });
    } catch (error) {
      toastify({ msg: error, type: "danger" });
      console.error("Error:", error);
    }
  };
  const rejectClientHandler = async (data) => {
    const update = {
      data,
      userId: user.email,
    };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/api/rejectedClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );

      const responseData = await response.text();
      refetchEmpData();
      refetchSalesData();
      toastify({ msg: responseData, type: "error" });
    } catch (error) {
      toastify({ msg: error, type: "error" });
      console.error("Error:", error);
    }
  };
  //let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  // const roleAbilities = abilities[user.ability] || [];
  // const ability = new Ability(roleAbilities);

  const salesTableColumns = () => [
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
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        return (
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => clientTableHandler(row)}
          >
            Select Client
          </button>
        );
      },
    },
  ];
  const clientTableColumns = (openModal) => [
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
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        return (
          <button
            className="btn btn-primary px-2 py-2"
            onClick={() => openModal(row)}
          // onClick={() => clientTableHandler(row)}
          >
            Generate Pitch
          </button>
        );
      },
    },
    {
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        if (row.status === "In Progress") {
          return (
            <div>
              <button
                className=" btn btn-success px-2 py-1"
                onClick={() => acceptClientHandler(row)}
              >
                <i className="ni ni-check-bold" />
              </button>
              <button
                className=" btn btn-danger px-2 py-1"
                onClick={() => rejectClientHandler(row)}
              >
                <i className="ni ni-fat-remove" />
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

  // const flattenedClientsData = empData?.flatMap((item) =>
  //   item.assignedClients.map((client) => ({
  //     ...item,
  //     ...client,
  //   }))
  // );

  const getPitchHandler = async (data) => {
    setModal(false);

    const update = {
      ...data,
      companyName: selectedSale.companyName,
      companyType: selectedSale.companyType,
      description: selectedSale.description,
      email: selectedSale.email,
      keywords: selectedSale.keywords,
      phone: selectedSale.phone,
    };
    // // console.log(update);
    setPitchModal(true);
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/api/marketingStrategy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );

      const responseData = await response.json();
      // // console.log(responseData.marketingStrategy.content);
      // toastify({ msg: { responseData }, type: "success" });
      //   navigate("/auth/login");
      setPitchData(responseData.marketingStrategy.content);
    } catch (error) {
      //   toastify({ msg: error, type: "danger" });
      console.error("Error:", error);
    }
    reset();
  };

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
                <h3 className="text-white mb-0">Your Clients:</h3>
              </CardHeader>
              <DataTable
                columns={clientTableColumns(openModal)}
                data={empData.assignedClients}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />

              <Modal isOpen={modal} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Generate a pitch</ModalHeader>
                <ModalBody>
                  <Form role="form" onSubmit={handleSubmit(getPitchHandler)}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label>Previous Convos if any:</label>

                      <TextAreaField
                        control={control}
                        name="previousConversation"
                        placeholder="Description"
                        className="form-control ms-4"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label>Description</label>

                      <TextAreaField
                        control={control}
                        name="extrasDescription"
                        placeholder="Description"
                        className="form-control ms-4"
                      />
                    </div>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                            {...register("mails")}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span className="text-muted">
                              Do you want to include recent mails
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center mt-5">
                      <Button color="primary" type="submit">
                        Get pitch
                      </Button>
                      <Button color="secondary" onClick={closeModal}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
              </Modal>

              <Modal isOpen={pitchModal} toggle={closePitchModal}>
                <ModalHeader toggle={closePitchModal}>
                  Here is your pitch
                </ModalHeader>
                <ModalBody>
                  {pitchData ? (
                    <p>{pitchData}</p>
                  ) : (
                    <div className="text-center">
                      We are fetching a perfect pitch
                      <Loader />
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  {pitchData && (
                    <Button
                      color="secondary"
                      onClick={copyToClipboard}
                      data-toggle="tooltip"
                      data-placement="top"
                      title={copySuccess ? copySuccess : "Copy"}
                    >
                      Copy
                    </Button>
                  )}
                  <Button color="secondary" onClick={closePitchModal}>
                    Ok
                  </Button>
                </ModalFooter>
              </Modal>
            </Card>
          </div>
        </Row>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Leads Generated Till Now:</h3>
              </CardHeader>
              <DataTable
                columns={salesTableColumns()}
                data={salesData}
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

export default SalesLeads;
