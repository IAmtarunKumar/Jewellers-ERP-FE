import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Col, FormGroup, Row } from "reactstrap";
import { validateEditField, validateEditRawMaterial } from "./validation";
import { toastify } from "common/helpers/toast";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditRawMaterial = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const {
    supplierId,
    name,
    type,
    initialStockDate,
    initialWeight,
    currentWeight,
    lastStockDate,
    description,
    price,
  } = location.state?.rawMaterialData;
  const [updatedRawMaterial, setUpdatedRawMaterial] = useState({
    supplierId,
    name,
    type,
    initialStockDate,
    initialWeight,
    currentWeight,
    lastStockDate,
    description,
    price,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  if (!supplierId) {
    return <div>Raw Material not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedRawMaterial((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateEditField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateEditRawMaterial(updatedRawMaterial);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      // console.log(updatedRawMaterial);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/rawmaterial/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRawMaterial),
          }
        );

        if (!response.ok) {
          toastify({
            msg: "Something went wrong! Please try again",
            type: "error",
          });
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          toastify({
            msg: "Raw Material edited successfully",
            type: "success",
          });
          navigate("/admin/rawMaterial");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <section className=" d-flex flex-column add-product">
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
          <p className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
            Edit the details of {updatedRawMaterial?.supplierId}
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
              <div className={`${darkTheme?"bg-dark-gray border-dark":"bg-white border-white"} border p-5 detail-product d-flex flex-column gap-4 rounded`}>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Name</label>
                      <input
                        placeholder="Enter Name"
                        name="name"
                        className="form-control px-2 py-4"
                        rows={4}
                        value={updatedRawMaterial?.name}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Type</label>
                      <input
                        type="text"
                        placeholder="Enter Type"
                        name="type"
                        className="form-control px-2 py-4"
                        value={updatedRawMaterial?.type}
                        onChange={(e) => handleInputChange(e, "type")}
                      />
                      {validationErrors.type && (
                        <p className="text-danger">{validationErrors.type}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                        Current Weight
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Current Weight"
                        className="form-control px-2 py-4"
                        name="currentWeight"
                        value={updatedRawMaterial?.currentWeight || ""}
                        onChange={(e) => handleInputChange(e, "currentWeight")}
                      />
                      {validationErrors.currentWeight && (
                        <p className="text-danger">
                          {validationErrors.currentWeight}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Price</label>
                      <input
                        type="text"
                        placeholder="Enter Price"
                        className="form-control px-2 py-4"
                        name="price"
                        value={updatedRawMaterial?.price}
                        onChange={(e) => handleInputChange(e, "price")}
                      />
                      {validationErrors.price && (
                        <p className="text-danger">{validationErrors.price}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                        Last Stock Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Last Stock Date"
                        className="form-control px-2 py-4"
                        name="lastStockDate"
                        value={updatedRawMaterial?.lastStockDate}
                        onChange={(e) => handleInputChange(e, "lastStockDate")}
                      />
                      {validationErrors.lastStockDate && (
                        <p className="text-danger">
                          {validationErrors.lastStockDate}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Description</label>
                      <textarea
                        placeholder="Enter description"
                        className="form-control px-2 py-4"
                        name="description"
                        rows={4}
                        value={updatedRawMaterial?.description}
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
            title="Preview of Raw Material"
            entityType="rawMaterial"
            data={updatedRawMaterial}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditRawMaterial;
