import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertCustomer = ({
  isCustomer,
  setIsCustomer,
  validationErrors,
  validateField,
  setValidationErrors,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsCustomer((prevSupplier) => ({
      ...prevSupplier,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
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
                htmlFor="name"
              >
                Customer Name:
              </label>
              <input
                id="name"
                className="form-control px-2 py-4"
                type="text"
                placeholder="Enter customer name"
                value={isCustomer.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
              {validationErrors.name && (
                <p className="text-danger">{validationErrors.name}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="contact"
              >
                Contact:
              </label>
              <input
                id="contact"
                className="form-control px-2 py-4 "
                type="text"
                placeholder="Enter contact"
                value={isCustomer.contact}
                onChange={(e) => handleInputChange(e, "contact")}
              />
              {validationErrors.contact && (
                <p className="text-danger">{validationErrors.contact}</p>
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
                htmlFor="address"
              >
                Address:
              </label>
              <input
                id="address"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter address"
                value={isCustomer.address}
                onChange={(e) => handleInputChange(e, "address")}
              />
              {validationErrors.address && (
                <p className="text-danger">{validationErrors.address}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="pincode"
              >
                Pincode:
              </label>
              <input
                id="pincode" 
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter Pincode"
                value={isCustomer.pincode}
                onChange={(e) => handleInputChange(e, "pincode")}
              />
              {validationErrors.pincode && (
                <p className="text-danger">{validationErrors.pincode}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertCustomer;
