import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React, { useEffect } from "react";
import { useContext } from "react";
import ReactSelect from "react-select";
import {
  Button,
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

const PurchaseItem = ({
  modal,
  toggleModal,
  handleModalInputChange,
  handleModalSave,
  validationErrors,
  isData,
  setIsData,
  validateField,
  setValidationErrors,
  finalAmount,
  setFinalAmount,
  setBaseAmount,
  baseAmount,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const calculateBaseAmount = () => {
    let amount = (isData.rate / 10) * isData.weight;
    setBaseAmount(amount);
    isData.amount = amount;
  };

  const calculateFinalAmount = () => {
    let amount = (isData.rate / 10) * isData.weight * isData.quantity;
    setFinalAmount(amount);
    isData.finalAmount = amount;
  };
  useEffect(() => {
    calculateFinalAmount();
    calculateBaseAmount();
  }, [isData.quantity, isData.rate, isData.weight]);

  const selectOptionsPurity = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption.value;

    setIsData((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggleModal}
      className={`${
        darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
      }`}
    >
      <ModalHeader toggle={toggleModal}>
        {" "}
        <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
          Add a new item
        </p>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Container>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="name"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    className="form-control py-4 px-2"
                    placeholder="Enter name"
                    type="text"
                    value={isData.name}
                    onChange={(e) => handleModalInputChange(e, "name")}
                  />
                  {validationErrors.name && (
                    <p className="text-danger">{validationErrors.name}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="purity"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Purity:
                  </label>
                  <ReactSelect
                    options={selectOptionsPurity}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "purity")
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                  />
                  {validationErrors.purity && (
                    <p className="text-danger">{validationErrors.purity}</p>
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                    htmlFor="rate"
                  >
                    Rate (per 10 grams)*:
                  </label>
                  <input
                    id="rate"
                    className="form-control py-4 px-2"
                    placeholder="Enter rate"
                    type="number"
                    value={isData.rate}
                    onChange={(e) => handleModalInputChange(e, "rate")}
                  />
                  {validationErrors.rate && (
                    <p className="text-danger">{validationErrors.rate}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="weight"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Weight (in grams)*:
                  </label>
                  <input
                    id="weight"
                    className="form-control  px-2 py-4"
                    type="number"
                    placeholder="Enter weight"
                    value={isData.weight}
                    onChange={(e) => handleModalInputChange(e, "weight")}
                  />
                  {validationErrors.weight && (
                    <p className="text-danger">{validationErrors.weight}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={12}>
                <FormGroup>
                  <label
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                    htmlFor="amount"
                  >
                    Base Amount:
                  </label>
                  <input
                    id="amount"
                    className="form-control py-4 px-2"
                    placeholder="Enter amount"
                    type="number"
                    value={baseAmount}
                    // onChange={(e) => handleModalInputChange(e, "amount")}
                    readOnly
                  />
                  {validationErrors.amount && (
                    <p className="text-danger">{validationErrors.amount}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                    htmlFor="quantity"
                  >
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    className="form-control py-4 px-2"
                    placeholder="Enter quantity"
                    type="number"
                    value={isData.quantity}
                    onChange={(e) => handleModalInputChange(e, "quantity")}
                  />
                  {validationErrors.quantity && (
                    <p className="text-danger">{validationErrors.quantity}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={12}>
                <FormGroup>
                  <label
                    htmlFor="finalAmount"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Final Amount
                  </label>
                  <input
                    id="finalAmount"
                    className="form-control  px-2 py-4"
                    type="number"
                    placeholder="final amount"
                    value={finalAmount}
                    readOnly
                  />
                  {/* {validationErrors.finalAmount && (
                    <p className="text-danger">
                      {validationErrors.makingChargesRate}
                    </p>
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
          onClick={() => {
            handleModalSave();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PurchaseItem;
