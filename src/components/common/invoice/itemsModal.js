import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

const ItemsModal = ({
  modal,
  toggleModal,
  handleModalInputChange,
  handleModalSave,
  validationErrors,
  isData,
  setIsData,
  productData,
  validateField,
  setValidationErrors,
  finalAmount,
  setFinalAmount,
  setBaseAmount,
  baseAmount,
  tableData,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const calculateBaseAmount = () => {
    let amount = (isData.rate / 10) * isData.weight;
    setBaseAmount(amount);
    isData.amount = amount;
  };

  const calculateFinalAmount = () => {
    let amount =
      isData.quantity && isData.makingCharges === 0
        ? ((isData.rate / 10) * isData.weight +
            isData.weight * isData.makingChargesGram) *
          isData.quantity
        : ((isData.rate / 10) * isData.weight +
            (isData.rate / 10) *
              isData.weight *
              (isData.makingChargesPercentage / 100)) *
          isData.quantity;
    setFinalAmount(amount);
    isData.finalAmount = amount;
  };
  useEffect(() => {
    calculateFinalAmount();
    calculateBaseAmount();
  }, [
    isData.quantity,
    isData.makingCharges,
    isData.rate,
    isData.weight,
    isData.makingChargesGram,
    isData.makingChargesPercentage,
  ]);

  const selectOptionsPurity = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];
  const selectOptionsMaking = [
    { value: 0, label: "Labour per Gram" },
    { value: 1, label: "Percentage" },
  ];

  const selectOptionsProduct = productData
    .filter((product) => {
      const isInStock = product.currentStock > 0;
      const isNotInTableData = !tableData.some(
        (tableItem) => tableItem.productName === product.productName
      );
      return isInStock && isNotInTableData;
    })
    .map((product) => ({
      value: product.productName,
      label: product.productName,
    }));

  selectOptionsProduct.push({
    value: "create_new_product",
    label: "Create a new product",
  });

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption.value;
    if (selectedOption.value === "create_new_product") {
      navigate("/admin/allProducts");
      return;
    }
    if (fieldName === "makingCharges") {
      if (value === 0) {
        setIsData((prevItem) => ({
          ...prevItem,
          makingCharges: 0,
          makingChargesPercentage: 0,
        }));
      } else if (value === 1) {
        setIsData((prevItem) => ({
          ...prevItem,
          makingCharges: 1,
          makingChargesGram: 0,
        }));
      }
    } else {
      setIsData((prevItem) => ({
        ...prevItem,
        [fieldName]: value,
      }));
    }

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
                    htmlFor="productName"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Product Name:
                  </label>
                  <ReactSelect
                    options={selectOptionsProduct}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "productName")
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                  />

                  {validationErrors.productName && (
                    <p className="text-danger">
                      {validationErrors.productName}
                    </p>
                  )}
                  {selectOptionsProduct.length === 1 && (
                    <p className="text-warning">
                      No products available for selection. Make sure you have
                      stock available or that product is already added in the
                      invoice.
                    </p>
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
                    Gold Rate (per 10 grams)*:
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
                    htmlFor="makingCharges"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Making Charges:
                  </label>
                  <ReactSelect
                    options={selectOptionsMaking}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "makingCharges")
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                  />
                  {validationErrors.makingCharges && (
                    <p className="text-danger">
                      {validationErrors.makingCharges}
                    </p>
                  )}
                </FormGroup>
              </Col>
              {isData.makingCharges === 0 && (
                <Col lg={6}>
                  <FormGroup>
                    <label
                      htmlFor="makingChargesRate"
                      className={`${
                        darkTheme ? " text-white" : " text-dark"
                      } form-control-label`}
                    >
                      Making Charges Per Gram
                    </label>
                    <input
                      id="makingChargesGram"
                      className="form-control  px-2 py-4"
                      type="number"
                      placeholder="Enter Making Charges Per Gram"
                      value={isData.makingChargesGram}
                      onChange={(e) =>
                        handleModalInputChange(e, "makingChargesGram")
                      }
                    />
                    {validationErrors.makingChargesGram && (
                      <p className="text-danger">
                        {validationErrors.makingChargesGram}
                      </p>
                    )}
                  </FormGroup>
                </Col>
              )}
              {isData.makingCharges === 1 && (
                <Col lg={6}>
                  <FormGroup>
                    <label
                      htmlFor="makingChargesPercentage"
                      className={`${
                        darkTheme ? " text-white" : " text-dark"
                      } form-control-label`}
                    >
                      Making Charges Percentage
                    </label>
                    <input
                      id="makingChargesPercentage"
                      className="form-control  px-2 py-4"
                      type="number"
                      placeholder="Enter Making Charges Rate"
                      value={isData.makingChargesPercentage}
                      onChange={(e) =>
                        handleModalInputChange(e, "makingChargesPercentage")
                      }
                    />
                    {validationErrors.makingChargesPercentage && (
                      <p className="text-danger">
                        {validationErrors.makingChargesPercentage}
                      </p>
                    )}
                  </FormGroup>
                </Col>
              )}
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

export default ItemsModal;
