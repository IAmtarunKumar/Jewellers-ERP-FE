import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertJobWork = ({
  isJobWork,
  setIsJobWork,
  validationErrors,
  validateField,
  setValidationErrors,
  vendorData,
  rawMaterialData,
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
  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new_raw") {
      navigate("/admin/rawMaterial");
      return;
    }
    if (selectedOption.value === "create_new_vendor") {
      navigate("/admin/vendor");
      return;
    }

    const value = selectedOption.value;

    setIsJobWork((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsJobWork((prevRawMateril) => ({
      ...prevRawMateril,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const selectOptionsVendor = vendorData.map((center) => ({
    // value: center.vendorId,
    value: center.name,
    label: center.name,
  }));

  selectOptionsVendor.push({
    value: "create_new_vendor",
    label: "Create a new vendor",
  });

  const selectOptionsRaw = rawMaterialData.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  selectOptionsRaw.push({
    value: "create_new_raw",
    label: "Create a new raw material",
  });

  return (
    <Form>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="rawMaterialName"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Raw Material Name:
              </label>
              <ReactSelect
                options={selectOptionsRaw}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "rawMaterialName")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.rawMaterialName && (
                <p className="text-danger">
                  {validationErrors.rawMaterialName}
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
                htmlFor="rawMaterialType"
              >
                Raw Material Type:
              </label>
              <input
                id="rawMaterialType"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter type"
                // value={""}
                value={isJobWork.rawMaterialType}
                onChange={(e) => handleInputChange(e, "rawMaterialType")}
              />
              {validationErrors.rawMaterialType && (
                <p className="text-danger">
                  {validationErrors.rawMaterialType}
                </p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="vendorName"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Vendor Name:
              </label>
              <ReactSelect
                options={selectOptionsVendor}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "vendorName")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.vendorName && (
                <p className="text-danger">{validationErrors.vendorName}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="priceDecided"
              >
                Price Decided:
              </label>
              <input
                id="priceDecided"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter price"
                // value={""}
                value={isJobWork.priceDecided}
                onChange={(e) => handleInputChange(e, "priceDecided")}
              />
              {validationErrors.priceDecided && (
                <p className="text-danger">{validationErrors.priceDecided}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="givenPurity"
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Given Purity:
              </label>
              <ReactSelect
                options={selectOptionsPurity}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "givenPurity")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.givenPurity && (
                <p className="text-danger">{validationErrors.givenPurity}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="givenDate"
              >
                Given Date:
              </label>
              <input
                id="givenDate"
                className="form-control py-4 px-2"
                type="date"
                // value={""}
                value={isJobWork.givenDate}
                onChange={(e) => handleInputChange(e, "givenDate")}
              />
              {validationErrors.givenDate && (
                <p className="text-danger">{validationErrors.givenDate}</p>
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
                htmlFor="givenWeight"
              >
                Given Weight (in grams)*:
              </label>
              <input
                id="givenWeight"
                className="form-control py-4 px-2"
                type="text"
                placeholder="Enter weight"
                // value={""}
                value={isJobWork.givenWeight}
                onChange={(e) => handleInputChange(e, "givenWeight")}
              />
              {validationErrors.givenWeight && (
                <p className="text-danger">{validationErrors.givenWeight}</p>
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
                Job Work Image:
              </label>
              <input
                id="imageURL"
                className="form-control"
                type="file"
                // value={isProduct.imageURL}
                onChange={handleImageChange}
              />
              {validationErrors.imageURL && (
                <p className="text-danger">{validationErrors.imageURL}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
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
                // value={""}
                value={isJobWork.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
              {validationErrors.description && (
                <p className="text-danger">{validationErrors.description}</p>
              )}
            </FormGroup>
          </Col>
          <Col xl={6}>
            <p
              className={`${
                darkTheme ? " text-white" : " text-dark"
              } form-control-label`}
            >
              Cash Payment
            </p>
            <input
              type="radio"
              id="paymentCash"
              name="radioYes"
              value="Yes"
              onChange={(e) => handleInputChange(e, "paymentCash")}
              checked={isJobWork?.paymentCash === "Yes"}
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
              checked={isJobWork?.paymentCash === "No"}
            />{" "}
            <label htmlFor="no">No</label>
            <br />
            {validationErrors.paymentCash && (
              <p className="text-danger">{validationErrors.paymentCash}</p>
            )}
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertJobWork;
