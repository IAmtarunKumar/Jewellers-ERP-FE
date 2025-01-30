import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import { Col, FormGroup, Row } from "reactstrap";
import { validateField, validateSupplier } from "./validation";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditSuppliers = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const suppliersData = location.state?.suppliersData;
  const navigate = useNavigate();
  const [updatedSupplier, setUpdatedSupplier] = useState(suppliersData);
  const [validationErrors, setValidationErrors] = useState({});

  if (!suppliersData) {
    return <div>Supplier not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedSupplier((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateSupplier(updatedSupplier);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      // console.log(updatedSupplier);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/supplier/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSupplier),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          toastify({ msg: "Suppliers edited successfully", type: "success" });
          navigate("/admin/suppliers");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <>
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
                        Supplier Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter supplier Name"
                        name="name"
                        value={updatedSupplier?.name}
                        className="form-control px-2 py-4"
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                      {validationErrors.name && (
                        <p className="text-danger">{validationErrors.name}</p>
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
                        Supplier Id
                      </label>
                      <input
                        type="text"
                        placeholder="Enter supplier Id"
                        name="supplierId"
                        value={updatedSupplier?.supplierId}
                        className="form-control px-2 py-4"
                        readOnly
                      />
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
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        value={updatedSupplier?.address}
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
                        Contact
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Contact"
                        name="contact"
                        value={updatedSupplier?.contact}
                        className="form-control px-2 py-4"
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
                        value={updatedSupplier?.pincode}
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
            title="Preview of Customer"
            entityType="supplier"
            data={updatedSupplier}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditSuppliers;
