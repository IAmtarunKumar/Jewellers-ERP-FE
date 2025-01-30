import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
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
import { validateField, validateForm } from "./validation";
import Columns from "./columns";

const Cashdetail = ({
  show,
  validationErrors,
  setValidationErrors,
  darkThemeStyles,
  lightThemeStyles,
  darkTheme,
  cashPaymentDetails,
  setCashPaymentDetails,
  cashPaymentTableData,
  setCashPaymentTableData,
}) => {
  const [modal, isModal] = useState(false);

  const updateData = (id, columnId, newValue) => {
    const newData = cashPaymentTableData.map((row) => {
      console.log(row, id);
      if (row.id === id) {
        console.log(id);
        const updatedRow = { ...row, [columnId]: newValue };
        const { amount, date, givenTo } = updatedRow;
        if (
          columnId === "amount" ||
          columnId === "date" ||
          columnId === "givenTo"
        ) {
          updatedRow.amount = amount;
          updatedRow.date = date;
          updatedRow.givenTo = givenTo;
        }

        return updatedRow;
      }
      return row;
    });
    setCashPaymentTableData(newData);
  };
  const deleteData = (id) => {
    const newData = cashPaymentTableData.filter((item) => item.id !== id);
    setCashPaymentTableData(newData);
  };
  const toggleModal = () => {
    isModal(!modal);
  };
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;

    setCashPaymentDetails((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));
    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handlSave = () => {
    const errors = validateForm(cashPaymentDetails);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      const uniqueId = `${new Date().getTime()}`;
      console.log(uniqueId);
      const newEntry = {
        ...cashPaymentDetails,
        id: uniqueId,
      };
      console.log(newEntry);
      toggleModal();
      setCashPaymentTableData((prevTableData) => [...prevTableData, newEntry]);
      setCashPaymentDetails({
        amount: 0,
        date: "",
        givenTo: "",
      });
    }
  };
  return (
    <>
      <Row
        className={`${
          !show ? "d-none" : "d-flex align-items-right justify-content-end"
        }`}
      >
        <Col className="mt-4">
          <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
            <h3 className={`${darkTheme ? " text-white" : " text-dark"} mb-0`}>
              Cash Detail
            </h3>
            <button className="add-btn" onClick={toggleModal}>
              +
            </button>
          </CardHeader>
          <DataTable
            columns={Columns(updateData, deleteData)}
            data={cashPaymentTableData}
            fixedHeader
            customStyles={darkTheme ? darkThemeStyles : lightThemeStyles}
          />
        </Col>
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          className={`${
            darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
          }`}
        >
          <ModalHeader toggle={toggleModal}>
            <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
              Add a new cash payment
            </p>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Container>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        id="amount"
                        value={cashPaymentDetails.amount}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "amount")}
                      />
                      {validationErrors.amount && (
                        <p className="text-danger">{validationErrors.amount}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                        htmlFor="date"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter date"
                        id="date"
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "date")}
                      />
                      {validationErrors.date && (
                        <p className="text-danger">{validationErrors.date}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                        htmlFor="givenTo"
                      >
                        Given To
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        id="givenTo"
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "givenTo")}
                      />
                      {validationErrors.givenTo && (
                        <p className="text-danger">
                          {validationErrors.givenTo}
                        </p>
                      )}
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
                handlSave();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
    </>
  );
};

export default Cashdetail;
