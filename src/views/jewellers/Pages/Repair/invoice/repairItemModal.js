import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import ReactSelect from "react-select";
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

const RepairItemsModal = ({
  modal,
  toggleModal,
  handleModalInputChange,
  handleModalSave,
  validationErrors,
  isData,
  setIsData,
  handleImageChange,
  validateField,
  setValidationErrors,
}) => {
  const { darkTheme } = useContext(ThemeContext);

  const selectOptionsPurity = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption.value;

    setIsData((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggleModal}
      className={`${
        darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
      }`}
    >
      <ModalHeader toggle={toggleModal}>
        <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
          Add a new item
        </p>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Container>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="productName"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Product Name:
                  </label>
                  <input
                    id="productName"
                    className="form-control py-4 px-2"
                    placeholder="Enter name"
                    type="text"
                    value={isData.name}
                    onChange={(e) => handleModalInputChange(e, "productName")}
                  />

                  {validationErrors.productName && (
                    <p className="text-danger">
                      {validationErrors.productName}
                    </p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="purity"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Purity:
                  </label>
                  <ReactSelect
                    options={selectOptionsPurity}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "purity")
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                  />
                  {validationErrors.purity && (
                    <p className="text-danger">{validationErrors.purity}</p>
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                    htmlFor="rate"
                  >
                    Repair Cost:
                  </label>
                  <input
                    id="rate"
                    className="form-control py-4 px-2"
                    placeholder="Enter rate"
                    type="number"
                    value={isData.rate}
                    onChange={(e) => handleModalInputChange(e, "rate")}
                  />
                  {validationErrors.rate && (
                    <p className="text-danger">{validationErrors.rate}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="weight"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Weight (in grams)*:
                  </label>
                  <input
                    id="weight"
                    className="form-control  px-2 py-4"
                    type="number"
                    placeholder="Enter weight"
                    value={isData.weight}
                    onChange={(e) => handleModalInputChange(e, "weight")}
                  />
                  {validationErrors.weight && (
                    <p className="text-danger">{validationErrors.weight}</p>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label
                    htmlFor="imageURL"
                    className={`${
                      darkTheme ? " text-white" : " text-dark"
                    } form-control-label`}
                  >
                    Image:
                  </label>
                  <input
                    id="imageURL"
                    className="form-control"
                    type="file"
                    onChange={handleImageChange}
                  />
                  {validationErrors.imageURL && (
                    <p className="text-danger">{validationErrors.imageURL}</p>
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
            handleModalSave();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RepairItemsModal;
