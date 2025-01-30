import axios from "axios";
import { ThemeContext } from "common/context/themeContext";
import { toastify } from "common/helpers/toast";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertPlant = ({
  isPlant,
  setIsPlant,
  validationErrors,
  validateField,
  setValidationErrors,
  setImages,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const [type, setType] = useState();
  const [isOwn, setIsOwn] = useState(false);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    console.log(value);
    if (fieldName === "receivedOrSent" && value !== "Select") {
      fetchType(value);
      setIsOwn(value === "Own");
    }

    setIsPlant((prevPlant) => ({
      ...prevPlant,
      [fieldName]: value,
    }));
    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files);
  };
  async function fetchType(value) {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/utils/partyName"
      );
      if (response.status !== 200) {
        const message = await response.text();
        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;
        console.log(data);
        const typeList = data.filter((res) => res.type === value);
        setType(typeList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Form>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="date">
                Date:
              </label>
              <input
                id="date"
                className="form-control px-2"
                type="date"
                value={isPlant.date}
                onChange={(e) => handleInputChange(e, "date")}
              />
              {validationErrors.date && (
                <p className="text-danger">{validationErrors.date}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="type" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                Type:
              </label>
              <select
                onChange={(e) => handleInputChange(e, "type")}
                id="type"
                className="form-control"
              >
                <option>Select </option>
                <option>Credit</option>
                <option>Debit</option>
              </select>
              {validationErrors.type && (
                <p className="text-danger">{validationErrors.type}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="amount">
                Amount:
              </label>
              <input
                id="amount"
                className="form-control py-4 px-2"
                placeholder="Enter amount"
                type="text"
                value={isPlant.amount}
                onChange={(e) => handleInputChange(e, "amount")}
              />
              {validationErrors.amount && (
                <p className="text-danger">{validationErrors.amount}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="receivedOrSent" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                Received or Sent:
              </label>
              <select
                onChange={(e) => handleInputChange(e, "receivedOrSent")}
                id="receivedOrSent"
                className="form-control"
              >
                <option>Select </option>
                <option>Vendor</option>
                <option>Supplier</option>
                <option>Customer</option>
                <option>Own</option>
              </select>
              {validationErrors.receivedOrSent && (
                <p className="text-danger">{validationErrors.receivedOrSent}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="partyName" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                Name:
              </label>
              <select
                onChange={(e) => handleInputChange(e, "partyName")}
                id="partyName"
                className="form-control"
                disabled={isOwn}
              >
                <option>Select </option>
                {type &&
                  type.map((current, index) => {
                    return <option key={index}>{current.name}</option>;
                  })}
              </select>
              {validationErrors.partyName && (
                <p className="text-danger">{validationErrors.partyName}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="reference" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                Reference:
              </label>
              <select
                onChange={(e) => handleInputChange(e, "reference")}
                id="reference"
                className="form-control"
              >
                <option>Select </option>
                <option>Job Work</option>
                <option>Pusrchase Order</option>
                <option>Invoice</option>
                <option>Others</option>
              </select>
              {validationErrors.reference && (
                <p className="text-danger">{validationErrors.reference}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="referenceImage" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                Image:
              </label>
              <input
                id="referenceImage"
                className="form-control"
                type="file"
                onChange={handleImageChange}
              />
              {/* {validationErrors.referenceImage && (
                <p className="text-danger">{validationErrors.referenceImage}</p>
              )} */}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="form-control py-4 px-2"
                placeholder="Enter description"
                type="text"
                value={isPlant.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertPlant;
