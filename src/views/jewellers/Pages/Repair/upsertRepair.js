import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertRepair = ({
  isRepair,
  setIsRepair,
  validationErrors,
  validateField,
  setValidationErrors,
  productData,
  customerData,
}) => {
  const { darkTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new_customer") {
      navigate("/admin/customers");
      return;
    }
    if (selectedOption.value === "create_new_product") {
      navigate("/admin/allProducts");
      return;
    }

    const value = selectedOption.value;
    setIsRepair((prevRepair) => ({
      ...prevRepair,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsRepair((prevRepair) => ({
      ...prevRepair,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const selectOptionsCustomer = customerData.map((center) => ({
    value: center.customerId,
    label: center.name,
  }));

  selectOptionsCustomer.push({
    value: "create_new_customer",
    label: "Create a new customer",
  });

  const selectOptionsProduct = productData.map((product) => ({
    value: product.productId,
    label: product.productName,
  }));

  selectOptionsProduct.push({
    value: "create_new_product",
    label: "Create a new product",
  });

  return (
    <Form>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="repairCost"
              >
                Repair Cost:
              </label>
              <input
                id="repairCost"
                className="form-control py-4 px-2"
                placeholder="Enter repair cost"
                type="text"
                value={isRepair.repairCost}
                onChange={(e) => handleInputChange(e, "repairCost")}
              />
              {validationErrors.repairCost && (
                <p className="text-danger">{validationErrors.repairCost}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="customerId"
              >
                Customer:
              </label>
              <ReactSelect
                options={selectOptionsCustomer}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "customerId")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.customerId && (
                <p className="text-danger">{validationErrors.customerId}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="expectedReturnDate"
              >
                Expected Return Date:
              </label>
              <input
                id="expectedReturnDate"
                className="form-control py-4 px-2"
                type="date"
                value={isRepair.expectedReturnDate}
                onChange={(e) => handleInputChange(e, "expectedReturnDate")}
              />
              {validationErrors.expectedReturnDate && (
                <p className="text-danger">
                  {validationErrors.expectedReturnDate}
                </p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="repairDate"
              >
                Repair Date:
              </label>
              <input
                id="repairDate"
                className="form-control py-4 px-2"
                type="date"
                value={isRepair.repairDate}
                onChange={(e) => handleInputChange(e, "repairDate")}
              />
              {validationErrors.repairDate && (
                <p className="text-danger">{validationErrors.repairDate}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="productId"
              >
                Product:
              </label>
              <ReactSelect
                options={selectOptionsProduct}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "productId")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.productId && (
                <p className="text-danger">{validationErrors.productId}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="issueDescription"
              >
                Issue Description:
              </label>
              <textarea
                id="issueDescription"
                className="form-control py-4 px-2"
                placeholder="Enter description"
                type="text"
                value={isRepair.issueDescription}
                onChange={(e) => handleInputChange(e, "issueDescription")}
              />
              {validationErrors.issueDescription && (
                <p className="text-danger">
                  {validationErrors.issueDescription}
                </p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertRepair;
