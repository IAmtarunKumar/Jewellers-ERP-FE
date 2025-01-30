import { StyledHeader } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import { toastify } from "common/helpers/toast";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
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

const Employees = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEmp, setIsEmp] = useState();
  const { darkTheme } = useContext(ThemeContext);

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

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsEmp((prevEmp) => ({
      ...prevEmp,
      [fieldName]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/users/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const message = await response.text();
        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        setTableData(data);
        setPending(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="mt-7" fluid>
      <Row>
        <Col className="my-5 my-xl-0" xl="12">
          <Card className="shadow bg-default">
            <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h3 className="text-white mb-0">Employee Details</h3>
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
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add a new Employee</ModalHeader>
        <ModalBody>
          {" "}
          <Form>
            <Container>
              <Row>
                <Col lg={6}>
                  <FormGroup>
                    <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="name">
                      Employee Name:
                    </label>
                    <input
                      id="name"
                      className="form-control py-4 px-2"
                      placeholder="Enter employee name"
                      type="text"
                      //   value={isSupplier.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                    {/* {validationErrors.name && (
                      <p className="text-danger">{validationErrors.name}</p>
                    )} */}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="contact">
                      Contact:
                    </label>
                    <input
                      id="contact"
                      className="form-control py-4 px-2"
                      placeholder="Enter contact"
                      type="text"
                      //   value={isSupplier.contact}
                      onChange={(e) => handleInputChange(e, "contact")}
                    />
                    {/* {validationErrors.contact && (
                      <p className="text-danger">{validationErrors.contact}</p>
                    )} */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <FormGroup>
                    <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="address">
                      Address:
                    </label>
                    <input
                      id="address"
                      className="form-control py-4 px-2"
                      placeholder="Enter address"
                      type="text"
                      //   value={isSupplier.address}
                      onChange={(e) => handleInputChange(e, "address")}
                    />
                    {/* {validationErrors.address && (
                      <p className="text-danger">{validationErrors.address}</p>
                    )} */}
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            // onClick={() => {
            //   handleSubmit(isNewData);
            // }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Employees;
