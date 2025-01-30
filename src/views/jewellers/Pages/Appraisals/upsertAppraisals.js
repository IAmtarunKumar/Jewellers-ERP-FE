import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertAppraisal = ({
  isAppraisals,
  setIsAppraisals,
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
    setIsAppraisals((prevAppraisals) => ({
      ...prevAppraisals,
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
    setIsAppraisals((prevAppraisals) => ({
      ...prevAppraisals,
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
                htmlFor="customerId"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
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
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="productId"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
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
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="appraiserEmailId"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Appraiser Email Id:
              </label>
              <input
                id="appraiserEmailId"
                className="form-control px-2 py-4"
                type="text"
                placeholder="Enter email Id"
                value={isAppraisals.appraiserEmailId}
                onChange={(e) => handleInputChange(e, "appraiserEmailId")}
              />
              {validationErrors.appraiserEmailId && (
                <p className="text-danger">
                  {validationErrors.appraiserEmailId}
                </p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="appraisedValue"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Appraisal Value:
              </label>
              <input
                id="appraisedValue"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter value"
                value={isAppraisals.appraisedValue}
                onChange={(e) => handleInputChange(e, "appraisedValue")}
              />
              {validationErrors.appraisedValue && (
                <p className="text-danger">{validationErrors.appraisedValue}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="appraisalDate"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Appraisal Date:
              </label>
              <input
                id="appraisalDate"
                className="form-control px-2"
                type="date"
                value={isAppraisals.appraisalDate}
                onChange={(e) => handleInputChange(e, "appraisalDate")}
              />
              {validationErrors.appraisalDate && (
                <p className="text-danger">{validationErrors.appraisalDate}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertAppraisal;
