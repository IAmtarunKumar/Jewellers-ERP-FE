import React, { useEffect, useRef } from "react";
import { CardHeader, Col, FormGroup, Row } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./purchaseOrder.css";
import jwtDecode from "jwt-decode";
import DataTable from "react-data-table-component";
import { useState } from "react";
import useFetchData from "common/customHooks/useFetchData";
import axios from "axios";
import { toastify } from "common/helpers/toast";
import Columns from "./columns";
import {
  validateField,
  validateFormData,
  validateModalField,
  validateModalForm,
} from "./validation";
import PrintPurchaseOrder from "./printPurchaseOrder";
import PurchaseItem from "./purchaseItem";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import ReactSelect from "react-select";
import { customSelectStyles } from "common/constant/constant";
import { darkThemeStyles } from "components/common/DatatableView/themeMode";
import { lightThemeStyles } from "components/common/DatatableView/themeMode";
import { useUser } from "common/context/userContext";

const PurchaseOrder = () => {
  const componentRef = useRef();
  const { isAdmin, print } = useUser();
  const { darkTheme } = useContext(ThemeContext);
  const [isData, setIsData] = useState({
    name: "",
    rate: 0,
    amount: 0,
    quantity: 0,
    weight: 0,
    finalAmount: 0,
  });
  const [formData, setFormData] = useState({
    date: "",
    purchaseNumber: "",
    orgName: "",
    supplierName: "",
    address: "",
    pincode: "",
    grandTotal: "",
    totalAdvance: "",
    totalAmount: "",
    totalQuantity: "",
    tableData: [],
  });
  const [modal, setModal] = useState(false);
  // eslint-disable-next-line
  const [pending, setPending] = useState(true);
  const [purchaseNumber, setPurchaseNumber] = useState();
  const [tableData, setTableData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const navigate = useNavigate();
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState();

  const updateData = (rowName, columnId, newValue) => {
    console.log(rowName, columnId, newValue);
    const newData = tableData.map((row) => {
      if (row.name === rowName) {
        console.log(rowName);
        const updatedRow = { ...row, [columnId]: newValue };
        if (
          columnId === "rate" ||
          columnId === "weight" ||
          columnId === "quantity"
        ) {
          updatedRow.amount = (updatedRow.rate / 10) * updatedRow.weight;
          updatedRow.finalAmount =
            (updatedRow.rate / 10) * updatedRow.weight * updatedRow.quantity;
        }

        return updatedRow;
      }
      return row;
    });
    setTableData(newData);
  };
  const deleteData = (name) => {
    const newData = tableData.filter((item) => item.name !== name);
    setTableData(newData);
  };

  let orgName;
  if (localStorage.getItem("userDetail")) {
    orgName = jwtDecode(localStorage.getItem("userDetail")).foundUser
      .organisationName;
  }
  var pincode;
  //   console.log(jwtDecode(localStorage.getItem("userDetail")).foundUser.pincode);
  if (localStorage.getItem("userDetail")) {
    pincode = jwtDecode(localStorage.getItem("userDetail")).foundUser.pincode;
  }

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const [supplierData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/supplier/fetch",
    setPending
  );
  const selectOptionsSupplier = supplierData.map((supplier) => ({
    value: supplier.name,
    label: supplier.name,
  }));
  selectOptionsSupplier.push({
    value: "create_new_supplier",
    label: "Create a new supplier",
  });

  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new_supplier") {
      navigate("/admin/suppliers");
      return;
    }
    const value = selectedOption.value;
    const filteredResults = supplierData.filter(
      (item) => item.name === selectedOption.value
    );
    if (filteredResults.length > 0) {
      setCurrentSupplier(filteredResults[0]);
    }
    setFormData((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleModalInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsData((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));

    const error = validateModalField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    if (fieldName === "date") {
      if (typeof purchaseNumber === "string") {
        const numberPortion = purchaseNumber
          .replace(/\d{4}-\d{2}-\d{2}-/g, "")
          .trim();
        let newPurchaseNumber = `${value}-${numberPortion}`;
        setPurchaseNumber(newPurchaseNumber);
      } else {
        console.error("Purchase Number is not a valid string:", purchaseNumber);
        toastify({ msg: "Please wait for purchase number", type: "warning" });
      }
    }

    setFormData((prevItem) => ({
      ...prevItem,
      [fieldName]: value,
    }));
    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSave = async () => {
    console.log("handlesave hit purchaseorder");
    const errors = validateFormData(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const updatedForm = {
        ...formData,
        orgName: orgName,
        tableData: tableData,
        purchaseNumber: purchaseNumber,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        grandTotal: grandTotal,
        address: currentSupplier?.address,
        pincode: currentSupplier?.pincode,
      };
      setIsSaved(true);
      setIsCapturing(true);
      console.log(updatedForm);
      //we are just implementing the logic to call the apifor purchase number thats all
      try {
        const updatePurchaseNumber = await axios.post(
          "https://jewellers-erp.onrender.com/utils/purchaseNumber",
          // "https://jewellers-erp.onrender.com/utils/purchaseNumber",
          updatedForm,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("updatepurchasenumber", updatePurchaseNumber.data);
        setTimeout(() => {
          html2canvas(document.getElementById("sectionToPrint")).then(
            async () => {
              const input = document.getElementById("sectionToPrint");
              await html2canvas(input).then((canvas) => {
                const firebaseConfig = {
                  apiKey: "AIzaSyAacefHpzyWL1GwQ71kECB6bl1cG3DugSs",
                  authDomain: "aestra-jewellers-files.firebaseapp.com",
                  projectId: "aestra-jewellers-files",
                  storageBucket: "aestra-jewellers-files.appspot.com",
                  messagingSenderId: "176790703198",
                  appId: "1:176790703198:web:b0bbded8b36b2136c1f8cf",
                  measurementId: "G-W6PHRDWFJY",
                };

                const app = initializeApp(firebaseConfig);
                const storage = getStorage(app);
                canvas.toBlob(async (blob) => {
                  if (storage) {
                    const storageRef = await ref(
                      storage,
                      `PO${purchaseNumber}~${currentSupplier.name}`
                    );
                    uploadBytes(storageRef, blob)
                      .then((snapshot) => {
                        console.log("Image uploaded to Firebase successfully");
                      })
                      .catch((error) => {
                        console.error("Error uploading to Firebase:", error);
                      });
                  }
                });
              });
              setIsCapturing(false);
            }
          );
        }, 0);
        toastify({ msg: "Successfully created" });
      } catch (error) {
        if (error.response?.data) {
          console.log("Error fetching data:", error.response.data);
          toastify({ msg: error.response.data, type: "error" });
        } else {
          console.log("Error fetching data:", error.message);
          toastify({ msg: error.message, type: "error" });
        }
      }
      // const formData1 = new FormData();

      // for (const key in updatedForm) {
      //   const value = updatedForm[key];
      //   if (Array.isArray(value)) {
      //     // Serialize array values as JSON strings
      //     formData1.append(key, JSON.stringify(value));
      //   } else {
      //     formData1.append(key, value);
      //   }
      // }
      //   console.log(formData1);
      //   try {
      //     const response = await axios.post(
      //       "https://jewellers-erp.onrender.com/invoiceUpload",
      //       formData1,
      //       // "https://jewellers-erp.onrender.com/invoiceUpload", formData1,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     const data = await response.data;
      //     console.log(data);
      //     toastify({ msg: data, type: "success" });
      //   } catch (error) {
      //     if (error.response?.data) {
      //       console.log("Error fetching data:", error.response.data);
      //       toastify({ msg: error.response.data, type: "error" });
      //     } else {
      //       console.log("Error fetching data:", error.message);
      //       toastify({ msg: error.message, type: "error" });
      //     }
      //   }
    }
  };
  const handleModalSave = () => {
    const errors = validateModalForm(isData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      toggleModal();
      setTableData((prevTableData) => [...prevTableData, isData]);
      setIsData({
        name: "",
        rate: 0,
        amount: 0,
        quantity: 0,
        weight: 0,
        finalAmount: 0,
        makingChargesGram: 0,
        makingChargesPercentage: 0,
      });
    }
  };

  const fetchPurchaseNumber = async () => {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/utils/purchaseNumber"
        // "https://jewellers-erp.onrender.com/utils/purchaseNumber"
      );
      if (response.status !== 200) {
        const message = await response.text();

        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;
        // console.log(data);
        setPurchaseNumber(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let totalQ = 0;
    let totalA = 0;

    tableData.forEach((item) => {
      totalQ += Number(item.quantity);
      totalA += Number(item.finalAmount);
    });

    setTotalQuantity(totalQ);
    setTotalAmount(totalA);
    setGrandTotal(totalA);
  }, [tableData, grandTotal]);

  useEffect(() => {
    fetchPurchaseNumber();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <section className="d-flex flex-column mt-2 add-product">
      <div className="d-flex justify-content-between p-4 align-items-center gap-3 flex-wrap">
        <button
          type="button"
          className="btn text-white bg-erp"
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </button>

        <div className="d-flex gap-4 align-items-center ">
          {(isAdmin || print) && isSaved && (
            <button
              onClick={handlePrint}
              type="button"
              className="btn text-white bg-erp"
            >
              Print
            </button>
          )}
          <PrintPurchaseOrder
            ref={componentRef}
            formData={formData}
            orgName={orgName}
            purchaseNumber={purchaseNumber}
            totalAmount={totalAmount}
            totalQuantity={totalQuantity}
            tableData={tableData}
            grandTotal={grandTotal}
            address={currentSupplier?.address}
            pincode={currentSupplier?.pincode}
          />
          <button
            type="button"
            className="btn text-white bg-erp"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div
        className="details-section d-flex flex-column p-2"
        id="sectionToPrint"
      >
        <div
          className={`${
            darkTheme ? "bg-dark-gray border-dark" : "bg-white border-white"
          } border p-5 detail-product d-flex flex-column gap-4 rounded`}
        >
          <h2
            className={`${
              darkTheme ? " text-white" : " text-dark"
            } mb-5 text-center`}
          >
            New Purchase Order
          </h2>
          <Row>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                >
                  Purchase Number
                </label>
                {isCapturing ? (
                  <div className="form-control">{purchaseNumber || 0}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter purchase number"
                    id="purchaseNumber"
                    value={purchaseNumber || 0}
                    className="form-control px-2 py-4"
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="date"
                >
                  Date
                </label>
                {isCapturing ? (
                  <div className="form-control">{formData?.date}</div>
                ) : (
                  <input
                    type="date"
                    placeholder="Enter date"
                    id="date"
                    className="form-control px-2 py-4"
                    onChange={(e) => handleInputChange(e, "date")}
                  />
                )}
                {validationErrors.date && (
                  <p className="text-danger">{validationErrors.date}</p>
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
                  Company
                </label>
                {isCapturing ? (
                  <div className="form-control">{orgName}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={orgName ? orgName : ""}
                    className="form-control px-2 py-4"
                    name="company name"
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="supplierName"
                >
                  Supplier Name
                </label>
                <ReactSelect
                  options={selectOptionsSupplier}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "supplierName")
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                  styles={customSelectStyles}
                />
                {validationErrors.supplierName && (
                  <p className="text-danger">{validationErrors.supplierName}</p>
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
                  htmlFor="address"
                >
                  Supplier Address
                </label>
                {isCapturing ? (
                  <div className="form-control">{currentSupplier?.address}</div>
                ) : (
                  <input
                    type="text"
                    value={
                      currentSupplier?.address ? currentSupplier?.address : ""
                    }
                    className="form-control px-2 py-4"
                    id="address"
                    readOnly
                    placeholder="address"
                  />
                )}
              </FormGroup>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="pincode"
                >
                  Supplier Pincode
                </label>
                {isCapturing ? (
                  <div className="form-control">
                    {currentSupplier?.pincode ? currentSupplier?.pincode : ""}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={currentSupplier?.pincode}
                    className="form-control px-2 py-4"
                    id="pincode"
                    placeholder="pincode"
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div
          className={`${
            darkTheme ? "bg-dark-gray border-dark" : "bg-white border-white"
          } border p-5 detail-product d-flex flex-column gap-4 rounded mt-3`}
        >
          <h2 className={`${darkTheme ? " text-white" : " text-dark"} mb-3`}>
            Items
          </h2>
          <Row>
            <Col className="mt-4">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3
                  className={`${darkTheme ? " text-white" : " text-dark"} mb-0`}
                >
                  Items
                </h3>
                <button className="add-btn" onClick={toggleModal}>
                  +
                </button>
              </CardHeader>
              <DataTable
                columns={Columns(updateData, deleteData)}
                data={tableData}
                fixedHeader
                customStyles={darkTheme ? darkThemeStyles : lightThemeStyles}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                >
                  Total Quantity
                </label>
                {isCapturing ? (
                  <div className="form-control">{totalQuantity}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter total quantity"
                    value={totalQuantity ? totalQuantity : "0"}
                    className="form-control px-2 py-4"
                    name="totalQuantity"
                    readOnly
                  />
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
                  Total Amount
                </label>
                {isCapturing ? (
                  <div className="form-control">{totalAmount}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter total amount"
                    name="total"
                    value={`₹${totalAmount}` ? totalAmount : "0"}
                    className="form-control px-2 py-4"
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div
          className={`${
            darkTheme ? "bg-dark-gray border-dark" : "bg-white border-white"
          } border p-5 detail-product d-flex flex-column gap-4 rounded mt-3`}
        >
          <h2 className={`${darkTheme ? " text-white" : " text-dark"} mb-3`}>
            Totals
          </h2>
          <Row className="d-flex align-items-right justify-content-end">
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="grandTotal"
                >
                  Grand Total
                </label>
                {isCapturing ? (
                  <div className="form-control">{grandTotal}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter grand total"
                    id="grandTotal"
                    value={grandTotal ? grandTotal : 0}
                    className="form-control px-2 py-4"
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex align-items-right justify-content-end">
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="totalAdvance"
                >
                  Total Advance
                </label>
                {isCapturing ? (
                  <div className="form-control">{formData.totalAdvance}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter total advance"
                    id="totalAdvance"
                    value={formData.totalAdvance}
                    className="form-control px-2 py-4"
                    onChange={(e) => handleInputChange(e, "totalAdvance")}
                  />
                )}
                {validationErrors.totalAdvance && (
                  <p className="text-danger">{validationErrors.totalAdvance}</p>
                )}
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
      <PurchaseItem
        modal={modal}
        toggleModal={toggleModal}
        handleModalInputChange={handleModalInputChange}
        isData={isData}
        validationErrors={validationErrors}
        handleModalSave={handleModalSave}
        setIsData={setIsData}
        validateField={validateField}
        setValidationErrors={setValidationErrors}
        baseAmount={baseAmount}
        setBaseAmount={setBaseAmount}
        finalAmount={finalAmount}
        setFinalAmount={setFinalAmount}
      />
    </section>
  );
};

export default PurchaseOrder;
