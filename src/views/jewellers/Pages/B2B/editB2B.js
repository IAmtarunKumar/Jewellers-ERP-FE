import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import { validateB2B, validateField } from "./validation";
import { toastify } from "common/helpers/toast";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditB2B = () => {
  const location = useLocation();
  const B2BData = location.state?.B2BData;
  const [validationErrors, setValidationErrors] = useState({});
  const [updatedB2B, setUpdatedB2B] = useState(B2BData);
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  // console.log(updatedB2B);

  if (!B2BData) {
    return <div>B2Bs not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedB2B((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const handleSave = async () => {
    const errors = validateB2B(updatedB2B);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      // console.log(updatedB2B);

      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/businessHolder/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedB2B),
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
            msg: "B2B edited successfully",
            type: "success",
          });
          navigate("/admin/b2b");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <>
      {/* <JewelHeader /> */}
      <section className=" d-flex flex-column mt-5 add-product">
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
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>B2B Id</label>
                      <input
                        type="text"
                        placeholder="Enter B2B Id"
                        name="B2BId"
                        value={updatedB2B?.businessHolderId}
                        className="form-control px-2 py-4"
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>B2B Name</label>
                      <input
                        type="text"
                        placeholder="Enter B2B Name"
                        name="name"
                        value={updatedB2B?.name}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                      {validationErrors.name && (
                        <p className="text-danger">{validationErrors.name}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Contact</label>
                      <input
                        type="text"
                        placeholder="Enter Contact details"
                        value={updatedB2B?.contact}
                        className="form-control px-2 py-4"
                        name="contact"
                        onChange={(e) => handleInputChange(e, "contact")}
                      />
                      {validationErrors.contact && (
                        <p className="text-danger">
                          {validationErrors.contact}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Address</label>
                      <input
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={updatedB2B?.address}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "address")}
                      />
                      {validationErrors.address && (
                        <p className="text-danger">
                          {validationErrors.address}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Preview
            title="Preview of B2B"
            entityType="b2b"
            data={updatedB2B}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditB2B;
