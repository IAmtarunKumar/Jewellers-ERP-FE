import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import { Col, FormGroup, Row } from "reactstrap";
import { validateCustomer, validateField } from "./validation";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditCustomers = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const customerData = location.state?.customerData;
  const navigate = useNavigate();
  const [updatedCustomer, setUpdatedCustomer] = useState(customerData);
  const [validationErrors, setValidationErrors] = useState({});

  if (!customerData) {
    return <div>Customer not found!</div>;
  }
  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setUpdatedCustomer((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateCustomer(updatedCustomer);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      // console.log(updatedCustomer);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/customer/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCustomer),
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
            msg: "Customer edited successfully",
            type: "success",
          });
          navigate("/admin/customers");
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
                        Customer Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Customer Name"
                        name="name"
                        className="form-control px-2 py-4"
                        value={updatedCustomer?.name}
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
                        Customer Id
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Customer Id"
                        name="customerId"
                        className="form-control px-2 py-4"
                        value={updatedCustomer?.customerId}
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
                        className="form-control px-2 py-4"
                        name="address"
                        value={updatedCustomer?.address}
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
                        className="form-control px-2 py-4"
                        value={updatedCustomer?.contact}
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
                        placeholder="Enter Pincode"
                        name="pincode"
                        className="form-control px-2 py-4"
                        value={updatedCustomer?.pincode || ""}
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
            entityType="customer"
            data={updatedCustomer}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditCustomers;
