import { useState} from "react";
import DataTable from "react-data-table-component";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import JewelHeader from "components/Headers/jewelHeader";
import { toastify } from "common/helpers/toast";
import { StyledHeader } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

function AllUser() {
  const { darkTheme } = useContext(ThemeContext);
  const [pending, setPending] = useState(true);
  //eslint-disable-next-line
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [isUser, setIsUser] = useState(null);
  const columns = [
    {
      name: <StyledHeader>Id</StyledHeader>,
      selector: (row) => row.sessionId,
      sortable: true,
    },
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Email</StyledHeader>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <StyledHeader>Mobile</StyledHeader>,
      selector: (row) => row.mobile,
      sortable: true,
    },
  ];

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/users/fetch",
    setPending,
    false
  );

  const toggleModal = () => {
    setModal(!modal);
  };
  const saveData = async (newData) => {
    // console.log(newData);
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/users/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        toastify({ msg: "User added successfully", type: "success" });
        refreshData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <JewelHeader />
      <Container className="mt--7" fluid>
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">All Users</h3>
                <button onClick={toggleModal} className="add-btn">
                  +
                </button>
              </CardHeader>
              <DataTable
                columns={columns}
                data={tableData}
                defaultSortFieldId={5}
                defaultSortAsc={false}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </div>
        </Row>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add a new Users</ModalHeader>
          <ModalBody>
            <Form>
              <Container>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="name">
                        Name:
                      </label>
                      <input
                        id="name"
                        className="form-control py-4 px-2"
                        placeholder="Enter name"
                        type="text"
                        // value={""}
                        onChange={(e) =>
                          setIsUser({
                            ...isUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="email">
                        Email:
                      </label>
                      <input
                        id="email"
                        className="form-control py-4 px-2"
                        placeholder="Enter email"
                        type="text"
                        // value={""}
                        onChange={(e) =>
                          setIsUser({
                            ...isUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="mobile">
                        Mobile:
                      </label>
                      <input
                        id="mobile"
                        className="form-control py-4 px-2"
                        placeholder="Enter mobile"
                        type="text"
                        // value={""}
                        onChange={(e) =>
                          setIsUser({
                            ...isUser,
                            mobile: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                saveData(isUser);
                toggleModal();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}
export default AllUser;
