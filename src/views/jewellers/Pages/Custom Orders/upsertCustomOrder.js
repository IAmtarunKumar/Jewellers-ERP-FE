import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertCustomOrder = ({
  customOrder,
  setcustomOrder,
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
    setcustomOrder((prevRepair) => ({
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
    setcustomOrder((prevCustomOrder) => ({
      ...prevCustomOrder,
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
                <p className="text-danger">{validationErrors.productName}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="orderDate"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Order Date:
              </label>
              <input
                id="orderDate"
                className="form-control px-2 py-4"
                type="date"
                value={customOrder.orderDate}
                onChange={(e) => handleInputChange(e, "orderDate")}
              />
              {validationErrors.orderDate && (
                <p className="text-danger">{validationErrors.orderDate}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="completionDate"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Completion Date:
              </label>
              <input
                id="completionDate"
                className="form-control py-4 px-2"
                type="date"
                value={customOrder.completionDate}
                onChange={(e) => handleInputChange(e, "completionDate")}
              />
              {validationErrors.completionDate && (
                <p className="text-danger">{validationErrors.completionDate}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="productDescription"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Description:
              </label>
              <textarea
                id="productDescription"
                className="form-control px-2 py-4"
                type="text"
                placeholder="Enter description"
                value={customOrder.productDescription}
                onChange={(e) => handleInputChange(e, "productDescription")}
              />
              {validationErrors.productDescription && (
                <p className="text-danger">
                  {validationErrors.productDescription}
                </p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertCustomOrder;
