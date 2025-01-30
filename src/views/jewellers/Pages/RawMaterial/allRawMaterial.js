import { useState, useEffect } from "react";
import React from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import Columns from "./columns";
import UpsertRawMaterial from "./upsertRawMaterial";
import { validateField, validateRawMaterial } from "./validation";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PreviewModal from "components/common/previewModal";

function AllRawMaterial() {
  const { darkTheme } = useContext(ThemeContext);
  const [modal, setModal] = useState(false);
  const [pending, setPending] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [images, setImages] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [isRawMaterial, setIsRawMaterial] = useState({
    name: "",
    supplierId: "",
    type: "",
    weight: "",
    date: "",
    description: "",
    price: "",
    paymentCash: "",
  });

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/rawmaterial/fetch",
    setPending,
    false
  );
  console.log("tableData", tableData);

  const [supplierData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/supplier/fetch",
    setPending
  );

  const togglePreviewModal = () => {
    setPreviewModal(!previewModal);
  };

  const handlePreviewButton = (row) => {
    setSelectedRow(row);
    togglePreviewModal();
  };

  // useEffect(() => {
  //   // Initialize Firebase (you should have already initialized it in your project)
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyAacefHpzyWL1GwQ71kECB6bl1cG3DugSs",
  //     authDomain: "aestra-jewellers-files.firebaseapp.com",
  //     projectId: "aestra-jewellers-files",
  //     storageBucket: "aestra-jewellers-files.appspot.com",
  //     messagingSenderId: "176790703198",
  //     appId: "1:176790703198:web:b0bbded8b36b2136c1f8cf",
  //     measurementId: "G-W6PHRDWFJY",
  //   };

  //   const app = initializeApp(firebaseConfig);
  //   const storage = getStorage(app);

  //   //we are now using forloop to store every product image in our array
  //   for (let i = 0; i < tableData.length; i++) {
  //     console.log("setimageurl loop is running");
  //     // console.log("we are in the forloop");
  //     // Create a reference to the image file you want to fetch by filename
  //     const fileRef = ref(storage, tableData[i].imageUrl); // Replace with the actual path

  //     // Get the download URL

  //     getDownloadURL(fileRef)
  //       .then((url) => {
  //         // Use the URL to display or download the file
  //         //   // console.log("File URL:", url);
  //         let object = {};
  //         object.name = tableData[i].imageUrl;
  //         object.url = url;
  //         //   // console.log("logging object before pushing", object);
  //         setImageUrls((prevImageUrls) => [...prevImageUrls, object]);
  //       })
  //       .catch((error) => {
  //         console.error("Error getting download URL:", error);
  //       });
  //   }
  // }, [tableData]);

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
        <Table
          className={`${
            darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
          }`}
          bordered
          responsive
        >
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Supplier Id</th>
              <th>Date</th>
              <th>Bill</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data.rawMaterialEntryArray) &&
              data.rawMaterialEntryArray.map((entry, index) => (
                <tr key={index}>
                  <td>{entry?.description}</td>
                  <td>{entry?.price}</td>
                  <td>{entry?.weight}</td>
                  <td>{entry?.supplierId}</td>
                  <td>{entry?.date}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => handlePreviewButton(entry)}
                      className="btn btn-warning "
                    >
                      <AiOutlineInfoCircle />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const saveData = async (newData) => {
    const errors = validateRawMaterial(isRawMaterial);
    setValidationErrors(errors);
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
        formData.append("rawMaterialImage", imageData);
      });

      try {
        await axios
          .post(
            `https://aestraswift.ocpl.tech/jewellers/uploadRawMaterials`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            if (response.status !== 200) return;
            toastify({ msg: response.data, type: "success" });
            refreshData();
            setIsRawMaterial({
              name: "",
              supplierId: "",
              type: "",
              initialWeight: "",
              initialStockDate: "",
              description: "",
              price: "",
            });
            toggleModal();
          })
          .catch((error) => {
            toastify({ msg: error.response.data, type: "error" });
          });
      } catch (error) {
        if (error.response?.data) {
          console.log("Error fetching data:", error.response.data);
          toastify({ msg: error.response.data, type: "error" });
        } else {
          console.log("Error fetching data:", error.message);
          toastify({ msg: error.message, type: "error" });
        }
      }

      // try {
      //   const response = await fetch(
      //     "https://jewellers-erp.onrender.com/rawmaterial/update",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(newData),
      //     }
      //   );
      //   const responseData = await response.text();
      //   if (response.status === 200) {
      //     toastify({ msg: responseData, type: "success" });
      //     refreshData();
      //     setIsRawMaterial({
      //       name: "",
      //       supplierId: "",
      //       type: "",
      //       initialWeight: "",
      //       initialStockDate: "",
      //       description: "",
      //       price: "",
      //     });
      //     toggleModal();
      //   } else {
      //     toastify({
      //       msg: responseData,
      //       type: "error",
      //     });
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
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
          <UpsertRawMaterial
            isRawMaterial={isRawMaterial}
            setIsRawMaterial={setIsRawMaterial}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
            supplierData={supplierData}
            setImages={setImages}
          />
        }
        componentName="Raw Material"
        isNewData={isRawMaterial}
        expandableComponent={ExpandedComponent}
        modal={modal}
        toggleModal={toggleModal}
      />
      <PreviewModal
        previewModal={previewModal}
        setPreviewModal={setPreviewModal}
        selectedRow={selectedRow}
        togglePreviewModal={togglePreviewModal}
      />
    </>
  );
}
export default AllRawMaterial;
