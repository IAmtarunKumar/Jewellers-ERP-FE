import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import { validateField, validateRepair } from "./validation";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditRepair = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const repairData = location.state?.repairData;
  const [updatedRepair, setUpdatedRepair] = useState(repairData);
  const [validationErrors, setValidationErrors] = useState({});

  if (!repairData) {
    return <div>Repair not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedRepair((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateRepair(updatedRepair);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      // console.log(updatedRepair);
      // try {
      //   const response = await axios.post(
      //     `${process.env.REACT_APP_API_URL}/editProduct`,
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   if (response.status === 200) {
      //     navigate("/inventory");
      //   } else {
      //     console.error("Failed to update product.");
      //   }
      // } catch (error) {
      //   console.error("Error updating product:", error);
      // }
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
          <p className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Edit the details</p>
          <div className="d-flex gap-4 align-items-center ">
            <button type="button" className="btn text-white bg-erp" onClick={handleSave}>
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
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Repair cost</label>
                  <input
                    type="text"
                    placeholder="Enter Repair cost"
                    name="repairCost"
                    id="repairCost"
                    className="form-control px-2 py-4"
                    value={updatedRepair?.repairCost}
                    onChange={(e) => handleInputChange(e, "repairCost")}
                  />
                  {validationErrors.repairCost && (
                    <p className="text-danger">{validationErrors.repairCost}</p>
                  )}
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                    Expected Return Date
                  </label>
                  <input
                    type="date"
                    id="expectedReturnDate"
                    placeholder="Enter Expected Return Date"
                    name="expectedReturnDate"
                    className="form-control px-2 py-4"
                    value={updatedRepair?.expectedReturnDate}
                    onChange={(e) => handleInputChange(e, "expectedReturnDate")}
                  />
                  {validationErrors.expectedReturnDate && (
                    <p className="text-danger">
                      {validationErrors.expectedReturnDate}
                    </p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Repair Date</label>
                  <input
                    type="date"
                    id="repairDate"
                    placeholder="Enter Repair Date"
                    className="form-control px-2 py-4"
                    onChange={(e) => handleInputChange(e, "repairDate")}
                  />
                  {validationErrors.repairDate && (
                    <p className="text-danger">{validationErrors.repairDate}</p>
                  )}
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Repair Id</label>
                  <input
                    type="text"
                    placeholder="Enter Repair Id"
                    name="repairId"
                    className="form-control px-2 py-4"
                    value={updatedRepair?.repairId}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Product Id</label>
                  <input
                    type="text"
                    placeholder="Enter Product Id"
                    name="Product Id"
                    className="form-control px-2 py-4"
                    value={updatedRepair?.productId}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Customer Id</label>
                  <input
                    type="text"
                    placeholder="Enter Customer Id"
                    name="customerId"
                    className="form-control px-2 py-4"
                    value={updatedRepair?.customerId}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                    Issue Description
                  </label>
                  <textarea
                    type="text"
                    placeholder="Enter Issue Description"
                    name="issueDescription"
                    className="form-control px-2 py-4"
                    value={updatedRepair?.issueDescription}
                    onChange={(e) => handleInputChange(e, "issueDescription")}
                  />
                  {validationErrors.issueDescription && (
                    <p className="text-danger">
                      {validationErrors.issueDescription}
                    </p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
        </Col>
          <Preview
            title="Preview of Reapair"
            entityType="repair"
            data={updatedRepair}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditRepair;
