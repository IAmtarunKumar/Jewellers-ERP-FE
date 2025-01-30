import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertProducts = ({
  isProduct,
  setIsProduct,
  validationErrors,
  validateField,
  setValidationErrors,
  setImages,
}) => {
  const { darkTheme } = useContext(ThemeContext);

  const selectOptionsPurity = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption.value;
    setIsProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleInputChange = (e, fieldName) => {
    let value = e.target.value;
    if (fieldName === "gemStones") {
      value = value
        //eslint-disable-next-line
        .split(/[\s,\.]+/)
        .filter(Boolean)
        .map((item) => item.trim());
    }
    setIsProduct((prevProduct) => ({
      ...prevProduct,
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
  return (
    <Form>
      <Container>
        <Row className="">
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
              <input
                id="productName"
                className="form-control px-2 py-4"
                type="text"
                placeholder="Enter product name"
                value={isProduct.productName}
                onChange={(e) => handleInputChange(e, "productName")}
              />
              {validationErrors.productName && (
                <p className="text-danger">{validationErrors.productName}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="sku"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                SKU:
              </label>
              <input
                id="sku"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter SKU"
                value={isProduct.sku}
                onChange={(e) => handleInputChange(e, "sku")}
              />
              {validationErrors.sku && (
                <p className="text-danger">{validationErrors.sku}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="gemStones"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Gem Stone:
              </label>
              <input
                id="gemStones"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter gemstones"
                value={isProduct.gemStones}
                onChange={(e) => handleInputChange(e, "gemStones")}
              />
              {validationErrors.gemStones && (
                <p className="text-danger">{validationErrors.gemStones}</p>
              )}
            </FormGroup>
          </Col>

          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="material"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Material:
              </label>
              <input
                id="material"
                className="form-control  px-2"
                type="text"
                placeholder="Enter material type"
                value={isProduct.material}
                onChange={(e) => handleInputChange(e, "material")}
              />
              {validationErrors.material && (
                <p className="text-danger">{validationErrors.material}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="price"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Price:
              </label>
              <input
                id="price"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter price"
                value={isProduct.price}
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
                htmlFor="size"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Size:
              </label>
              <input
                id="size"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter Size"
                value={isProduct.size}
                onChange={(e) => handleInputChange(e, "size")}
              />
              {validationErrors.size && (
                <p className="text-danger">{validationErrors.size}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="type"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Type
              </label>
              <input
                id="type"
                className="form-control  px-2 "
                type="text"
                placeholder="Enter type"
                value={isProduct.type}
                onChange={(e) => handleInputChange(e, "type")}
              />
              {validationErrors.type && (
                <p className="text-danger">{validationErrors.type}</p>
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
        </Row>
        <Row>
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
                type="text"
                placeholder="Enter weight"
                value={isProduct.weight}
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
                htmlFor="stock"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Initial Stock:
              </label>
              <input
                id="stock"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter stock"
                value={isProduct.initialStock}
                onChange={(e) => handleInputChange(e, "initialStock")}
              />
              {validationErrors.initialStock && (
                <p className="text-danger">{validationErrors.initialStock}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="design"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Design:
              </label>
              <input
                id="design"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter design"
                value={isProduct.design}
                onChange={(e) => handleInputChange(e, "design")}
              />
              {validationErrors.design && (
                <p className="text-danger">{validationErrors.design}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="imageURL"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Image:
              </label>
              <input
                id="imageURL"
                className="form-control"
                type="file"
                value={isProduct.imageURL}
                onChange={handleImageChange}
              />
              {validationErrors.imageURL && (
                <p className="text-danger">{validationErrors.imageURL}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="decription"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Description:
              </label>
              <textarea
                id="description"
                className="form-control"
                type="text"
                placeholder="Enter description"
                value={isProduct.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
              {validationErrors.description && (
                <p className="text-danger">{validationErrors.description}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertProducts;
