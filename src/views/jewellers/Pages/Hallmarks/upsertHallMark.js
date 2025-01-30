import React from "react";
import { useContext } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { ThemeContext } from "common/context/themeContext";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import { customSelectStyles } from "common/constant/constant";

const UpsertHallMark = ({
  isHallMark,
  setIsHallMark,
  validationErrors,
  validateField,
  setValidationErrors,
  hallmarkCenterData,
  productData,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new_hallmark") {
      navigate("/admin/hallmarkCenter");
      return;
    }
    if (selectedOption.value === "create_new_product") {
      navigate("/admin/allProducts");
      return;
    }

    const value = selectedOption.value;
    setIsHallMark((prevHallMark) => ({
      ...prevHallMark,
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
    setIsHallMark((prevHallMark) => ({
      ...prevHallMark,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const selectOptionsProduct = productData.map((product) => ({
    value: product.productId,
    label: product.productName,
  }));
  selectOptionsProduct.push({
    value: "create_new_product",
    label: "Create a new product",
  });
  const selectOptionsHallmarkCenter = hallmarkCenterData.map((center) => ({
    value: center.hallmarkCenterId,
    label: center.centerName,
  }));

  selectOptionsHallmarkCenter.push({
    value: "create_new_hallmark",
    label: "Create a new hallmark center",
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
                htmlFor="productId"
              >
                Product Name:
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
                htmlFor="hallmarkCenterId"
              >
                HallMark Center Name:
              </label>
              <ReactSelect
                options={selectOptionsHallmarkCenter}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "hallmarkCenterId")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.hallmarkCenterId && (
                <p className="text-danger">
                  {validationErrors.hallmarkCenterId}
                </p>
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
                htmlFor="hallmarkDate"
              >
                Hall Mark Date:
              </label>
              <input
                id="hallmarkDate"
                className="form-control px-2"
                type="date"
                value={isHallMark.hallmarkDate}
                onChange={(e) => handleInputChange(e, "hallmarkDate")}
              />
              {validationErrors.hallmarkDate && (
                <p className="text-danger">{validationErrors.hallmarkDate}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertHallMark;
