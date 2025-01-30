import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import { validateField, validateVendor } from "./validation";
import { toastify } from "common/helpers/toast";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditVendor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const vendorData = location.state?.vendorData;
  const [validationErrors, setValidationErrors] = useState({});
  const [updatedVendor, setUpdatedVendor] = useState(vendorData);
console.log(updatedVendor);
  if (!vendorData) {
    return <div>Vendors not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedVendor((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateVendor(updatedVendor);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log(updatedVendor);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/vendor/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedVendor),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          toastify({ msg: "Vendor edited successfully", type: "success" });
          navigate("/admin/vendor");
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
              class="btn text-white bg-erp"
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
                        Vendor Id
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Vendor Id"
                        name="vendorId"
                        value={updatedVendor?.vendorId}
                        className="form-control px-2 py-4"
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
                        Vendor Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Vendor Name"
                        name="name"
                        value={updatedVendor?.name}
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
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Contact
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Contact details"
                        value={updatedVendor?.contact}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "contact")}
                        name="contact"
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
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={updatedVendor?.address}
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
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        name="pincode"
                        value={updatedVendor?.pincode}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "pincode")}
                      />
                      {validationErrors.pincode && (
                        <p className="text-danger">
                          {validationErrors.pincode}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Preview
            title="Preview of Vendor"
            entityType="vendor"
            data={updatedVendor}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditVendor;
