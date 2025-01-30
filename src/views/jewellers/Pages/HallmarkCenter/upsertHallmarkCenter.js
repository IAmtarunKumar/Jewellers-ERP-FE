import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertHallMarkCenter = ({
  isHallMarkCenter,
  setIsHallMarkCenter,
  validationErrors,
  validateField,
  setValidationErrors,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsHallMarkCenter((prevCenter) => ({
      ...prevCenter,
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
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="centerName">
                Center Name:
              </label>
              <input
                id="centerName"
                className="form-control px-2 py-4 "
                placeholder="Enter center name"
                type="text"
                value={isHallMarkCenter.centerName}
                onChange={(e) => handleInputChange(e, "centerName")}
              />
              {validationErrors.centerName && (
                <p className="text-danger">{validationErrors.centerName}</p>
              )}
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
                value={isHallMarkCenter.contact}
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
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="address">
                Address:
              </label>
              <input
                id="address"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter address"
                value={isHallMarkCenter.address}
                onChange={(e) => handleInputChange(e, "address")}
              />
              {validationErrors.address && (
                <p className="text-danger">{validationErrors.address}</p>
              )}
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
                value={isHallMarkCenter.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
              {validationErrors.email && (
                <p className="text-danger">{validationErrors.email}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="authorizedBy">
                Authorized By:
              </label>
              <input
                id="    "
                className="form-control py-4 px-2"
                placeholder="Enter authorized by"
                type="text"
                value={isHallMarkCenter.authorizedBy}
                onChange={(e) => handleInputChange(e, "authorizedBy")}
              />
              {validationErrors.authorizedBy && (
                <p className="text-danger">{validationErrors.authorizedBy}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertHallMarkCenter;
