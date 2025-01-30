import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import { Col, FormGroup, Row } from "reactstrap";
import { validateField, validateHallMarkCenter } from "./validation";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditHallmarkCenter = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const centerData = location.state?.centerData;
  const navigate = useNavigate();
  const [UpdatedCenter, setUpdatedCenter] = useState(centerData);
  const [validationErrors, setValidationErrors] = useState({});

  if (!centerData) {
    return <div>Hallmark Center not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedCenter((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateHallMarkCenter(UpdatedCenter);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      // console.log(UpdatedCenter);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/hallmarkCenter/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(UpdatedCenter),
          }
        );

        if (!response.ok) {
          toastify({
            msg: "Something went wrong! Please try again",
            type: "error",
          });
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          toastify({ msg: "Hallmark edited successfully", type: "success" });
          navigate("/admin/hallmarkCenter");
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
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Center Name</label>
                  <input
                    type="text"
                    placeholder="Enter Center Name"
                    name="centerName"
                    className="form-control px-2 py-4"
                    value={UpdatedCenter?.centerName}
                    onChange={(e) => handleInputChange(e, "centerName")}
                  />
                  {validationErrors.centerName && (
                    <p className="text-danger">{validationErrors.centerName}</p>
                  )}
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                    {" "}
                    Hallmark Center Id
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Center Id"
                    className="form-control px-2 py-4"
                    name="weight"
                    value={UpdatedCenter?.hallmarkCenterId}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Contact</label>
                  <input
                    type="text"
                    placeholder="Enter Contact"
                    name="contact"
                    className="form-control px-2 py-4"
                    value={UpdatedCenter?.contact}
                    onChange={(e) => handleInputChange(e, "contact")}
                  />
                  {validationErrors.contact && (
                    <p className="text-danger">{validationErrors.contact}</p>
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
                    className="form-control px-2 py-4"
                    value={UpdatedCenter?.address}
                    onChange={(e) => handleInputChange(e, "address")}
                  />
                  {validationErrors.address && (
                    <p className="text-danger">{validationErrors.address}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Email</label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    className="form-control px-2 py-4"
                    value={UpdatedCenter?.email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                  {validationErrors.email && (
                    <p className="text-danger">{validationErrors.email}</p>
                  )}
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Authorised By</label>
                  <input
                    type="text"
                    className="form-control px-2 py-4"
                    placeholder="Enter Authorised By"
                    name="authorizedBy"
                    value={UpdatedCenter?.authorizedBy}
                    onChange={(e) => handleInputChange(e, "authorizedBy")}
                  />
                  {validationErrors.authorizedBy && (
                    <p className="text-danger">
                      {validationErrors.authorizedBy}
                    </p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
        </Col>
          <Preview
            title="Preview of Hall Mark Center"
            entityType="hallMarkCenter"
            data={UpdatedCenter}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditHallmarkCenter;
