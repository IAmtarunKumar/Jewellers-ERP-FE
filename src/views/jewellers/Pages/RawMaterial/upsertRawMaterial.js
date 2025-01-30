import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertRawMaterial = ({
  isRawMaterial,
  setIsRawMaterial,
  validationErrors,
  validateField,
  setValidationErrors,
  supplierData,
  setImages,
}) => {
  const { darkTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new") {
      navigate("/admin/suppliers");
      return;
    }

    const value = selectedOption.value;
    setIsRawMaterial((prevRawMateril) => ({
      ...prevRawMateril,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleImageChange = (e) => {
    // console.log("e", e.target.files);
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    const error = validateField("imageURL", e);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      //eslint-disable-next-line
      ["imageURL"]: error,
    }));
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsRawMaterial((prevRawMateril) => ({
      ...prevRawMateril,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const selectOptionsSupplier = supplierData.map((supplier) => ({
    value: supplier.supplierId,
    label: supplier.name,
  }));

  selectOptionsSupplier.push({
    value: "create_new",
    label: "Create a new supplier",
  });

  return (
    <Form>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="name"
              >
                Name:
              </label>
              <input
                id="name"
                className="form-control py-4 px-2"
                placeholder="Enter name"
                type="text"
                value={isRawMaterial.name}
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
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="type"
              >
                Type:
              </label>
              <input
                id="type"
                type="text"
                className="form-control py-4 px-2"
                placeholder="Enter type"
                value={isRawMaterial.type}
                onChange={(e) => handleInputChange(e, "type")}
              />
              {validationErrors.type && (
                <p className="text-danger">{validationErrors.type}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="weight"
              >
                Weight (in grams)*:
              </label>
              <input
                id="weight"
                className="form-control py-4 px-2"
                placeholder="Enter weight"
                type="text"
                value={isRawMaterial.weight}
                onChange={(e) => handleInputChange(e, "weight")}
              />
              {validationErrors.weight && (
                <p className="text-danger">{validationErrors.weight}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="date"
              >
                Date:
              </label>
              <input
                id="date"
                className="form-control py-4 px-2"
                type="date"
                value={isRawMaterial.date}
                onChange={(e) => handleInputChange(e, "date")}
              />
              {validationErrors.date && (
                <p className="text-danger">
                  {validationErrors.date}
                </p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="price"
              >
                Price:
              </label>
              <input
                id="price"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter price"
                value={isRawMaterial.price}
                onChange={(e) => handleInputChange(e, "price")}
              />
              {validationErrors.price && (
                <p className="text-danger">{validationErrors.price}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="supplierId"
              >
                Supplier:
              </label>
              <ReactSelect
                options={selectOptionsSupplier}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "supplierId")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.supplierId && (
                <p className="text-danger">{validationErrors.supplierId}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                id="description"
                className="form-control py-4 px-2"
                placeholder="Enter description"
                type="text"
                value={isRawMaterial.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
              {validationErrors.description && (
                <p className="text-danger">{validationErrors.description}</p>
              )}
            </FormGroup>
          </Col>
          {/* <Row className="d-flex align-items-right justify-content-end"> */}
          <Col xl={6}>
            <p className={`${darkTheme ? " text-white" : " text-dark"
              } form-control-label`}>Cash Payment</p>
            <input
              type="radio"
              id="paymentCash"
              name="radioYes"
              value="Yes"
              onChange={(e) => handleInputChange(e, "paymentCash")}
              checked={isRawMaterial?.paymentCash === "Yes"}
            />{" "}
            <label htmlFor="yes" id="paymentCash">
              Yes
            </label>
            <br />
            <input
              type="radio"
              id="paymentCash"
              name="radioNo"
              value="No"
              onChange={(e) => handleInputChange(e, "paymentCash")}
              checked={isRawMaterial?.paymentCash === "No"}
            />{" "}
            <label htmlFor="no">No</label>
            <br />
            {validationErrors.paymentCash && (
              <p className="text-danger">{validationErrors.paymentCash}</p>
            )}
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="imageURL"
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
              >
                Purchase Invoice Image:
              </label>
              <input
                id="imageURL"
                className="form-control"
                type="file"
                value={isRawMaterial.imageURL}
                onChange={handleImageChange}
              />
              {validationErrors.imageURL && (
                <p className="text-danger">{validationErrors.imageURL}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertRawMaterial;
