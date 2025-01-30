import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import { validateEditField, validateEditJobWork } from "./validation";
import { toastify } from "common/helpers/toast";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import axios from "axios";

const EditJobWork = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const jobWorkData = location.state?.jobWorkData;
  const [updatedJobWork, setUpdatedJobWork] = useState(jobWorkData);
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);

  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  if (!jobWorkData) {
    return <div>Job not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedJobWork((prev) => ({ ...prev, [fieldName]: value }));
    const error = validateEditField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const handleImage1Change = (e) => {
    // console.log("e", e.target.files);
    const files = Array.from(e.target.files);
    setImages1((prevImages) => [...prevImages, ...files]);
    const error = validateEditField("imageURL", e);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      //eslint-disable-next-line
      ["imageURL"]: error,
    }));
  };
  const handleImage2Change = (e) => {
    // console.log("e", e.target.files);
    const files = Array.from(e.target.files);
    setImages2((prevImages) => [...prevImages, ...files]);
    const error = validateEditField("imageURL", e);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      //eslint-disable-next-line
      ["imageURL"]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateEditJobWork(updatedJobWork);
    setValidationErrors(errors);
    console.log(updatedJobWork);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();

      for (const key in updatedJobWork) {
        const value = updatedJobWork[key];
        if (Array.isArray(value)) {
          // Serialize array values as JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      images1.forEach((imageData) => {
        formData.append("jobWorkImage", imageData);
      });
      images2.forEach((imageData) => {
        formData.append("jobWorkImage", imageData);
      });
      try {
        await axios
          .post(`https://aestraswift.ocpl.tech/jewellers/editJobWorks`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // const message = response.text();
            if (response.status === 200) {
              toastify({ msg: response.data, type: "success" });
              setUpdatedJobWork(jobWorkData);
              navigate("/admin/jobWork");
            } else {
              toastify({
                msg: response.data,
                type: "error",
              });
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          })
          .catch((error) => {
            toastify({ msg: error.response.data, type: "error" });
          });
      } catch (error) {
        if (error.response?.data) {
          console.log("Error fetching data:", error.response.data);
          toastify({ msg: error.response.data, type: "error" });
        } else {
          console.log("Error fetching data:", error.message);
          toastify({ msg: error.message, type: "error" });
        }
      }
    }
  };
  return (
    <>
      {/* <JewelHeader /> */}
      <section className="d-flex flex-column add-product">
        <div className="d-flex justify-content-between p-4 add-header gap-3 flex-wrap">
          <button
            type="button"
            className="btn text-white bg-erp"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </button>
          <p
            className={`${
              darkTheme ? " text-white" : " text-dark"
            } form-control-label`}
          >
            Edit the details
          </p>
          <div className="d-flex gap-4 align-items-center ">
            <button
              type="button"
              className="btn text-white bg-erp"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
        <Row className="m-0">
          <Col lg="8">
            <div className="details-section d-flex flex-column p-1">
              {/* <h2>Details</h2> */}
              <div
                className={`${
                  darkTheme
                    ? "bg-dark-gray border-dark"
                    : "bg-white border-white"
                } border p-5 detail-product d-flex flex-column gap-4 rounded`}
              >
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Raw Material Name
                      </label>
                      <input
                        type="text"
                        className="form-control px-2 py-4"
                        placeholder="Enter Raw Material Name"
                        name="rawMaterialName"
                        value={updatedJobWork?.rawMaterialName}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Raw Material Type
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Raw Material Type"
                        name="rawMaterialType"
                        className="form-control px-2 py-4"
                        value={updatedJobWork?.rawMaterialType}
                        onChange={(e) =>
                          handleInputChange(e, "rawMaterialType")
                        }
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
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Vendor Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Vendor Name"
                        name="vendorName"
                        className="form-control px-2 py-4"
                        value={updatedJobWork?.vendorName}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Price Decided
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Price Decided"
                        name="priceDecided"
                        className="form-control px-2 py-4"
                        value={updatedJobWork?.priceDecided}
                        onChange={(e) => handleInputChange(e, "priceDecided")}
                      />
                      {validationErrors.priceDecided && (
                        <p className="text-danger">
                          {validationErrors.priceDecided}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Given Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Given Date"
                        className="form-control px-2 py-4"
                        name="givenDate"
                        value={updatedJobWork?.givenDate}
                        onChange={(e) => handleInputChange(e, "givenDate")}
                      />
                      {validationErrors.givenDate && (
                        <p className="text-danger">
                          {validationErrors.givenDate}
                        </p>
                      )}
                    </FormGroup>
                  </Col>

                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Return Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Return Date"
                        className="form-control px-2 py-4"
                        name="returnDate"
                        value={updatedJobWork?.returnDate}
                        onChange={(e) => handleInputChange(e, "returnDate")}
                      />
                      {validationErrors.returnDate && (
                        <p className="text-danger">
                          {validationErrors.returnDate}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Given Weight
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Given Weight"
                        name="givenWeight"
                        className="form-control px-2 py-4"
                        value={updatedJobWork?.givenWeight}
                        onChange={(e) => handleInputChange(e, "givenWeight")}
                      />
                      {validationErrors.givenWeight && (
                        <p className="text-danger">
                          {validationErrors.givenWeight}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Return Weight
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Return Weight"
                        className="form-control px-2 py-4"
                        name="returnWeight"
                        value={updatedJobWork?.returnWeight}
                        onChange={(e) => handleInputChange(e, "returnWeight")}
                      />
                      {validationErrors.returnWeight && (
                        <p className="text-danger">
                          {validationErrors.returnWeight}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Given Purity
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Given Purity"
                        className="form-control px-2 py-4"
                        name="givenPurity"
                        value={updatedJobWork?.givenPurity}
                        onChange={(e) => handleInputChange(e, "givenPurity")}
                      />
                      {validationErrors.givenPurity && (
                        <p className="text-danger">
                          {validationErrors.givenPurity}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Return Purity
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Return Purity"
                        name="returnPurity"
                        className="form-control px-2 py-4"
                        value={updatedJobWork?.returnPurity}
                        onChange={(e) => handleInputChange(e, "returnPurity")}
                      />
                      {validationErrors.returnPurity && (
                        <p className="text-danger">
                          {validationErrors.returnPurity}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
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
                      onChange={handleImage1Change}
                    />
                    {validationErrors.imageURL && (
                      <p className="text-danger">{validationErrors.imageURL}</p>
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
                      Purchase Invoice Image:
                    </label>
                    <input
                      id="imageURL"
                      className="form-control"
                      type="file"
                      // value={isProduct.imageURL}
                      onChange={handleImage2Change}
                    />
                    {validationErrors.imageURL && (
                      <p className="text-danger">{validationErrors.imageURL}</p>
                    )}
                  </FormGroup>
                </Col>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        placeholder="Enter description"
                        name="description"
                        className="form-control px-2 py-4"
                        value={updatedJobWork?.description}
                        onChange={(e) => handleInputChange(e, "description")}
                      />
                      {validationErrors.description && (
                        <p className="text-danger">
                          {validationErrors.description}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Preview
            title="Preview of Job Work"
            entityType="jobWork"
            data={updatedJobWork}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditJobWork;
