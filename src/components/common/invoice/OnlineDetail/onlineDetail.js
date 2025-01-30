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
import ReactSelect from "react-select";
import { customSelectStyles } from "common/constant/constant";

const OnlineDetail = ({
  show,
  validationErrors,
  setValidationErrors,
  darkThemeStyles,
  lightThemeStyles,
  darkTheme,
  onlinePaymentDetails,
  setOnlinePaymentDetails,
  onlinePaymentTableData,
  setOnlinePaymentTableData,
}) => {
  const [modal, isModal] = useState(false);

  const updateData = (id, columnId, newValue) => {
    const newData = onlinePaymentTableData.map((row) => {
      console.log(row, id);
      if (row.id === id) {
        console.log(id);
        const updatedRow = { ...row, [columnId]: newValue };
        const { amount, date, accountNo, via } = updatedRow;
        if (
          columnId === "amount" ||
          columnId === "date" ||
          columnId === "accountNo" ||
          columnId === "via"
        ) {
          updatedRow.amount = amount;
          updatedRow.date = date;
          updatedRow.via = via;
          updatedRow.accountNo = accountNo;
        }

        return updatedRow;
      }
      return row;
    });
    setOnlinePaymentTableData(newData);
  };
  const deleteData = (id) => {
    const newData = onlinePaymentTableData.filter((item) => item.id !== id);
    setOnlinePaymentTableData(newData);
  };
  const toggleModal = () => {
    isModal(!modal);
  };
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;

    setOnlinePaymentDetails((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));
    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption.value;

    setOnlinePaymentDetails((prevItem) => ({
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
    const errors = validateForm(onlinePaymentDetails);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      const uniqueId = `${new Date().getTime()}`;
      console.log(uniqueId);
      const newEntry = {
        ...onlinePaymentDetails,
        id: uniqueId,
      };
      console.log(newEntry);
      toggleModal();
      setOnlinePaymentTableData((prevTableData) => [...prevTableData, newEntry]);
      setOnlinePaymentDetails({
        amount: 0,
        date: "",
        accountNo: "",
        via: "",
        tranId: "",
      });
    }
  };

  const selectOptionsVIA = [
    { value: "neft", label: "NEFT" },
    { value: "rtgs", label: "RTGS" },
    { value: "imps", label: "IMPS" },
    { value: "upi", label: "UPI" },
  ];
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
              Online Transaction Detail
            </h3>
            <button className="add-btn" onClick={toggleModal}>
              +
            </button>
          </CardHeader>
          <DataTable
            columns={Columns(updateData, deleteData)}
            data={onlinePaymentTableData}
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
              Add a new online payment
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
                        htmlFor="tranId"
                      >
                        Transaction Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Transaction Id"
                        id="tranId"
                        value={onlinePaymentDetails.tranId}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "tranId")}
                      />
                      {validationErrors.tranId && (
                        <p className="text-danger">{validationErrors.tranId}</p>
                      )}
                    </FormGroup>
                  </Col>
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
                        value={onlinePaymentDetails.amount}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "amount")}
                      />
                      {validationErrors.amount && (
                        <p className="text-danger">{validationErrors.amount}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <label
                        htmlFor="via"
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Via
                      </label>
                      <ReactSelect
                        options={selectOptionsVIA}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, "via")
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={customSelectStyles}
                      />
                      {validationErrors.via && (
                        <p className="text-danger">{validationErrors.via}</p>
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
                        htmlFor="accountNo"
                      >
                        Account Number
                      </label>
                      <input
                        type="number"
                        placeholder="Enter account number"
                        id="accountNo"
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "accountNo")}
                      />
                      {validationErrors.accountNo && (
                        <p className="text-danger">
                          {validationErrors.accountNo}
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

export default OnlineDetail;
