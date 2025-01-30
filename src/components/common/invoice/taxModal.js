import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { validateTaxModalField, validateTaxModalForm } from "./validation";
import { toastify } from "common/helpers/toast";
import axios from "axios";

const TaxModal = ({
  taxModal,
  toggleTaxModal,
  validationErrors,
  setValidationErrors,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const [tax, setTax] = useState({ taxBracket: "" });

  const handleTaxModalInputChange = (e, fieldName) => {
    const value = e.target.value;

    setTax((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));

    const error = validateTaxModalField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleTaxModalSave = async () => {
    const errors = validateTaxModalForm(tax);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(tax);
      try {
        const response = await axios.post(
          "https://jewellers-erp.onrender.com/taxes",
          { tax }
          // "https://jewellers-erp.onrender.com/taxes", { tax }
        );
        if (response.status !== 200) {
          const message = await response.text();

          toastify({ msg: message, type: "error" });
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          const data = await response.data;
          toastify({ msg: data, type: "success" });
          // window.location = '/admin/invoice'
          toggleTaxModal();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={taxModal}
      toggle={toggleTaxModal}
      className={`${
        darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
      }`}
    >
      <ModalHeader toggle={toggleTaxModal}>
        {" "}
        <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
          Add a new tax
        </p>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Container>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                    htmlFor="taxBracket"
                  >
                    Tax:
                  </label>
                  <input
                    id="taxBracket"
                    className="form-control py-4 px-2"
                    placeholder="Enter Tax Bracket"
                    type="text"
                    value={tax.taxBracket}
                    onChange={(e) => handleTaxModalInputChange(e, "taxBracket")}
                  />
                  {validationErrors.taxBracket && (
                    <p className="text-danger">{validationErrors.taxBracket}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            handleTaxModalSave();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaxModal;
