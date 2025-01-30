import { useState } from "react";
import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import Columns from "./columns";
import { validateField, validateJobWork } from "./validation";
import UpsertJobWork from "./upsertJobWork";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import axios from "axios";

function AllJobWork() {
  const [modal, setModal] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const [pending, setPending] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isJobWork, setIsJobWork] = useState({
    rawMaterialName: "",
    rawMaterialType: "",
    vendorName: "",
    priceDecided: "",
    givenPurity: "",
    givenWeight: "",
    givenDate: "",
    description: "",
    paymentCash: "",
  });

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/jobwork/fetch",
    setPending,
    false
  );

  const [vendorData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/vendor/fetch",
    setPending
  );

  const [rawMaterialData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/rawmaterial/fetch",
    setPending
  );
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const ExpandedComponent = ({ data }) => (
    <Card
      className={`${
        darkTheme ? "bg-dark-gray" : " bg-white "
      } shadow expanded-card`}
    >
      <CardBody>
        <CardTitle
          className={`${darkTheme ? "text-white" : " text-dark "} card-title`}
        >
          More Details
        </CardTitle>
        <Row className={`${darkTheme ? "text-white" : " text-dark "} data-row`}>
          <Col xs="3">
            <div className="label">Given Purity:</div>
            <div className="value">{data.givenPurity}</div>
          </Col>
          <Col xs="3">
            <div className="label">Return Purity:</div>
            <div className="value">{data.returnPurity}</div>
          </Col>
          <Col xs="3">
            <div className="label">Given Weight (in grams):</div>
            <div className="value">{`${data.givenWeight} grams`}</div>
          </Col>
          <Col xs="3">
            <div className="label">Return Weight (in grams):</div>
            <div className="value">
              {data.returnWeight ? `${data.returnWeight} grams` : 0}
            </div>
          </Col>
          <Col xs="3">
            <div className="label">Description:</div>
            <div className="value">{data.description}</div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );

  const saveData = async (newData) => {
    const errors = validateJobWork(isJobWork);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      console.log(newData);

      const formData = new FormData();

      for (const key in newData) {
        const value = newData[key];
        if (Array.isArray(value)) {
          // Serialize array values as JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      images.forEach((imageData) => {
        formData.append("jobWorkImage", imageData);
      });

      try {
        await axios
          .post(
            `https://aestraswift.ocpl.tech/jewellers/uploadJobWorks`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            // const message = response.text();
            if (response.status === 200) {
              toastify({ msg: response.data, type: "success" });
              refreshData();
              setIsJobWork({
                rawMaterialName: "",
                rawMaterialType: "",
                vendorName: "",
                priceDecided: "",
                givenPurity: "",
                givenDate: "",
                description: "",
              });
              toggleModal();
            } else {
              toastify({
                msg: response.data,
                type: "error",
              });
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          })
          .catch((error) => {
            toastify({ msg: error.response.data, type: "error" });
          });
      } catch (error) {
        if (error.response?.data) {
          console.log("Error fetching data1:", error.response.data);
          toastify({ msg: error.response.data, type: "error" });
        } else {
          console.log("error", error);
          console.log("Error fetching data2:", error.message);
          toastify({ msg: error.message, type: "error" });
        }
      }
    }
  };
  return (
    <>
      <JewelHeader />
      <DatatableView
        tableProps={{
          data: tableData,
          columns: Columns(),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertJobWork
            isJobWork={isJobWork}
            setIsJobWork={setIsJobWork}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
            vendorData={vendorData}
            rawMaterialData={rawMaterialData}
            setImages={setImages}
          />
        }
        componentName="Job Work"
        isNewData={isJobWork}
        expandableComponent={ExpandedComponent}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllJobWork;
