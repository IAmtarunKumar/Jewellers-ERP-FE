import { useState } from "react";
import React from "react";
import { toastify } from "common/helpers/toast";
import Columns from "./columns";
import {
  validateB2B,
  validateField,
  validateModalData,
  validateModalField,
} from "./validation";
import DatatableView from "components/common/DatatableView";
import UpsertB2B from "./upsertB2B";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";
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
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

function AllB2B() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isB2B, setIsB2B] = useState({ name: "", contact: "", address: "" });
  const [meetModal, setMeetModal] = useState(false);
  const [currentB2B, setCurrentB2B] = useState();
  const { darkTheme } = useContext(ThemeContext);
  const [meetDetails, setMeetDetails] = useState({
    date: "",
    time: "",
    meetingTopic: "",
  });

  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser.name;
  }

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/businessHolder/fetch",
    setPending,
    false
  );
  const handleInputChange = (e, fieldName) => {
    console.log("value", value, "fieldname", fieldName)
    const value = e.target.value;

    setMeetDetails((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));
    const error = validateModalField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const handleModalSave = async () => {
    const errors = validateModalData(meetDetails);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const newMeet = {
        ...meetDetails,
        name: currentB2B.name,
        user: user,
      };
      console.log(newMeet);
      try {
        const responseMeetingCreation = await axios.post(
          "https://jewellers-erp.onrender.com/crmBusinessMeeting",
          // "https://jewellers-erp.onrender.com/crmBusinessMeeting",
          newMeet,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("responsemeetingcreation", responseMeetingCreation.data)
        toastify({ msg: responseMeetingCreation.data, type: "success" });

      }
      catch (error) {
        if (error.response?.data) {
          console.log("Error fetching data:", error.response.data);
          toastify({ msg: error.response.data, type: "error" });
        } else {
          console.log("Error fetching data:", error.message);
          toastify({ msg: error.message, type: "error" });
        }
      }
    }
  };
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const toggleMeetModal = () => {
    setMeetModal(!meetModal);
  };
  const saveData = async (newData) => {
    const errors = validateB2B(isB2B);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log(newData);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/businessHolder/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        const message = await response.text();
        if (response.status === 200) {
          toastify({ msg: message, type: "success" });
          refreshData();
          setIsB2B({
            name: "",
            contact: "",
            address: "",
          });
          toggleModal();
        } else {
          toastify({
            msg: message,
            type: "error",
          });
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <>
      <JewelHeader />
      <DatatableView
        tableProps={{
          data: tableData,
          columns: Columns(toggleMeetModal, setCurrentB2B),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertB2B
            isB2B={isB2B}
            setIsB2B={setIsB2B}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="Business Holder"
        isNewData={isB2B}
        modal={modal}
        toggleModal={toggleModal}
      />
      <Modal
        isOpen={meetModal}
        toggle={toggleMeetModal}
        className={`${darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
          }`}
      >
        <ModalHeader toggle={toggleMeetModal}>
          <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
            Meeting Details
          </p>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Container>
              <Row>
                <Col xl={6}>
                  <FormGroup>
                    <label
                      className={`${darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      id="name"
                      value={currentB2B ? currentB2B.name : ""}
                      className="form-control px-2 py-4"
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col xl={6}>
                  <FormGroup>
                    <label
                      className={`${darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      placeholder="Enter date"
                      id="date"
                      className="form-control px-2 py-4"
                      onChange={(e) => handleInputChange(e, "date")}
                    />
                    {validationErrors.date && (
                      <p className="text-danger">{validationErrors.date}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xl={6}>
                  <FormGroup>
                    <label
                      className={`${darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      htmlFor="time"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      placeholder="Enter time"
                      id="time"
                      className="form-control px-2 py-4"
                      onChange={(e) => handleInputChange(e, "time")}
                    />
                    {validationErrors.time && (
                      <p className="text-danger">{validationErrors.time}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col xl={6}>
                  <FormGroup>
                    <label
                      className={`${darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      htmlFor="meetingTopic"
                    >
                      Meeting Topic
                    </label>
                    <textarea
                      type="text"
                      placeholder="Enter Meeting Topic"
                      id="meetingTopic"
                      className="form-control px-2 py-4"
                      onChange={(e) => handleInputChange(e, "meetingTopic")}
                    />
                    {validationErrors.meetingTopic && (
                      <p className="text-danger">
                        {validationErrors.meetingTopic}
                      </p>
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
    </>
  );
}
export default AllB2B;
