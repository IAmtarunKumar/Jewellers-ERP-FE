import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import { Col, FormGroup, Row } from "reactstrap";
import { validateEditCustomOrder, validateEditField } from "./validation";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EditCustomOrders = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const { customerId, orderDate, completionDate } =
    location.state?.customOrderData;
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [updatedCustomOrder, setUpdatedCustomOrder] = useState({
    customerId,
    orderDate,
    completionDate,
  });
  // // console.log(customOrderData);
  if (!customerId) {
    return <div>Order not found!</div>;
  }
  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setUpdatedCustomOrder((prev) => ({ ...prev, [fieldName]: value }));

    const error = validateEditField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    const errors = validateEditCustomOrder(updatedCustomOrder);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log(updatedCustomOrder);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/customOrder/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCustomOrder),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          toastify({ msg: "Order edited successfully", type: "success" });
          navigate("/admin/customOrders");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <>
      {/* <JewelHeader /> */}
      <section className="container d-flex flex-column mt-5 add-product">
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
                        Customer Id
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Cus Id"
                        className="form-control px-2 py-4"
                        name="productId"
                        value={updatedCustomOrder?.customerId}
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
                        Order Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Date"
                        name="orderDate"
                        className="form-control px-2 py-4"
                        value={updatedCustomOrder?.orderDate}
                        onChange={(e) => handleInputChange(e, "orderDate")}
                      />
                      {validationErrors.orderDate && (
                        <p className="text-danger">
                          {validationErrors.orderDate}
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
                        Completion Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Date"
                        name="completionDate"
                        className="form-control px-2 py-4"
                        value={updatedCustomOrder?.completionDate}
                        onChange={(e) => handleInputChange(e, "completionDate")}
                      />
                      {validationErrors.completionDate && (
                        <p className="text-danger">
                          {validationErrors.completionDate}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Preview
            title="Preview of Order"
            entityType="customOrder"
            data={updatedCustomOrder}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditCustomOrders;
