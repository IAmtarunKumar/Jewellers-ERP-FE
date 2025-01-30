import React, { useEffect, useRef } from "react";
import { CardHeader, Col, FormGroup, Row } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./repairInvoice.css";
import jwtDecode from "jwt-decode";
import DataTable from "react-data-table-component";
import { useState } from "react";
import useFetchData from "common/customHooks/useFetchData";
import axios from "axios";
import { toastify } from "common/helpers/toast";

import {
  validateField,
  validateFormData,
  validateModalField,
  validateModalForm,
} from "./validation";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import ReactSelect from "react-select";
import { customSelectStyles } from "common/constant/constant";
import RepairTaxModal from "./repairTaxModal";
import RepairItemsModal from "./repairItemModal";
import { lightThemeStyles } from "components/common/DatatableView/themeMode";
import { darkThemeStyles } from "components/common/DatatableView/themeMode";
import PrintRepairInvoice from "./printRepairInvoice";
import RepairInvoiceColumns from "./invoiceColumn";
import { useUser } from "common/context/userContext";
import OnlineDetail from "components/common/invoice/OnlineDetail/onlineDetail";
import Cashdetail from "components/common/invoice/CashDetail/cashdetail";

const RepairInvoice = () => {
  const { isAdmin, print } = useUser();
  const componentRef = useRef();
  const { darkTheme } = useContext(ThemeContext);
  const [isData, setIsData] = useState({
    productName: "",
    rate: 0,
    weight: 0,
    imageURL: "",
  });
  const [formData, setFormData] = useState({
    date: "",
    invoiceNumber: "",
    orgName: "",
    customerName: "",
    returnDate: "",
    taxCategory: "",
    grandTotal: "",
    roundedTotal: "",
    totalAdvance: "",
    outstandingAmount: "",
    totalAmount: "",
    totalQuantity: "",
    paymentCash: "",
    tableData: [],
    address: "",
    pincode: "",
  });
  const [modal, setModal] = useState(false);
  const [taxModal, setTaxModal] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  // eslint-disable-next-line
  const [pending, setPending] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [tableData, setTableData] = useState([]);
  const [cashPaymentTableData, setCashPaymentTableData] = useState([]);
  const [onlinePaymentTableData, setOnlinePaymentTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isTaxes, setIsTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState("");
  const [totalTax, setTotalTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [roundedTotal, setRoundedTotal] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const navigate = useNavigate();
  const [isCapturing, setIsCapturing] = useState(false);
  const [tax, setTax] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState();
  const [onlinePaymentDetails, setOnlinePaymentDetails] = useState({
    amount: 0,
    date: "",
    accountNo: "",
    via: "",
    tranId: "",
  });
  const [cashPaymentDetails, setCashPaymentDetails] = useState({
    amount: 0,
    date: "",
    givenTo: "",
  });


  const updateData = (rowProductName, columnId, newValue) => {
    const newData = tableData.map((row) => {
      if (row.productName === rowProductName) {
        console.log(rowProductName);
        const updatedRow = { ...row, [columnId]: newValue };
        const { rate } = updatedRow;
        if (
          columnId === "rate" ||
          columnId === "weight" ||
          columnId === "productName"
        ) {
          updatedRow.rate = rate;
        }

        return updatedRow;
      }
      return row;
    });
    // console.log(newData);
    setTableData(newData);
  };
  const deleteData = (name) => {
    const newData = tableData.filter((item) => item.productName !== name);
    setTableData(newData);
  };

  let orgName;
  if (localStorage.getItem("userDetail")) {
    orgName = jwtDecode(localStorage.getItem("userDetail")).foundUser
      .organisationName;
  }
  var pincode;
  if (localStorage.getItem("userDetail")) {
    pincode = jwtDecode(localStorage.getItem("userDetail")).foundUser.pincode;
  }

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const toggleTaxModal = () => {
    setTaxModal((prevModal) => !prevModal);
    fetchTaxes();
  };

  const [productData] = useFetchData(
    "https://jewellers-erp.onrender.com/products/fetch",
    setPending
  );

  const [customerData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/customer/fetch",
    setPending
  );
  const selectOptionsCustomer = customerData.map((customer) => ({
    value: customer.name,
    label: customer.name,
  }));
  selectOptionsCustomer.push({
    value: "create_new_customer",
    label: "Create a new customer",
  });

  const selectOptionsTaxes = isTaxes.map((tax) => ({
    value: tax.percentage,
    label: tax.name,
  }));
  selectOptionsTaxes.push({
    value: "create_new_tax",
    label: "Create a new tax",
  });
  const determineTaxValues = (selectedOption) => {
    let dividedTax = selectedOption.value / 2;
    console.log(dividedTax);
    return {
      sgst: `${dividedTax}%`,
      cgst: `${dividedTax}%`,
      igst: `${selectedOption.value}%`,
    };
  };

  const calculateTax = (amount, tax) => {
    if (tax && amount) {
      let taxValue = parseFloat(tax.igst.replace("%", "")) / 100;
      return amount * taxValue;
    }
    return 0;
  };
  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new_customer") {
      navigate("/admin/customers");
      return;
    }
    let tempCustomer;
    const filteredResults = customerData.filter(
      (item) => item.name === selectedOption.value
    );
    if (filteredResults.length > 0) {
      setCurrentCustomer(filteredResults[0]);
      tempCustomer = filteredResults[0];
    }
    if (selectedOption.value === "create_new_tax") {
      toggleTaxModal(!taxModal);
      return;
    }
    if (fieldName === "taxCategory") {
      handleTax(tempCustomer?.pincode);
      setSelectedTax(determineTaxValues(selectedOption));
    }
    if (fieldName === "customerName") {
      handleTax(tempCustomer.pincode);
    }

    const value = selectedOption.value;

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
    if (fieldName === "totalAdvance") {
      let amount = roundedTotal - value;
      setOutstandingAmount(amount);
    }
    if (fieldName === "date") {
      const numberPortion = invoiceNumber
        .replace(/\d{4}-\d{2}-\d{2}-/g, "")
        .trim();
      let newInvoiceNumber = `${value}-${numberPortion}`;
      setInvoiceNumber(newInvoiceNumber);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setIsData((prevState) => ({
        ...prevState,
        imageURL: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    console.log("handlesave hit");
    const errors = validateFormData(formData);
    setValidationErrors(errors);
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      const updatedForm = {
        ...formData,
        orgName: orgName,
        tableData: tableData,
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        grandTotal: grandTotal,
        roundedTotal: roundedTotal,
        outstandingAmount: outstandingAmount,
        totalTax: totalTax,
        address: currentCustomer?.address,
        pincode: currentCustomer?.pincode,
        cashPaymentTableData: cashPaymentTableData,
        onlinePaymentTableData: onlinePaymentTableData,
      };
      setIsSaved(true);
      setIsCapturing(true);
      console.log(updatedForm);
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
                  const storageRef = await ref(storage, invoiceNumber);
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
      // toastify({msg:"Successfully created"})
      const formData1 = new FormData();

      for (const key in updatedForm) {
        const value = updatedForm[key];
        if (Array.isArray(value)) {
          // Serialize array values as JSON strings
          formData1.append(key, JSON.stringify(value));
        } else {
          formData1.append(key, value);
        }
      }
      console.log(formData1);
      try {
        const response = await axios.post(
          "https://jewellers-erp.onrender.com/repairInvoiceUpload",
          formData1,
          // "https://jewellers-erp.onrender.com/invoiceUpload", formData1,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.data;
        console.log(data);
        toastify({ msg: data, type: "success" });
      } catch (error) {
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
  const handleModalSave = () => {
    const errors = validateModalForm(isData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      toggleModal();
      setTableData((prevTableData) => [...prevTableData, isData]);
      setIsData({
        productName: "",
        rate: 0,
        weight: 0,
      });
    }
  };

  const fetchTaxes = async () => {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/taxes"
      );
      if (response.status !== 200) {
        const message = await response.text();

        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;
        setIsTaxes(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchInvoiceNumber = async () => {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/utils/invoiceNumber"
      );
      if (response.status !== 200) {
        const message = await response.text();

        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;
        // console.log(data);
        setInvoiceNumber(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let totalA = 0;

    tableData.forEach((item) => {
      totalA += Number(item.rate);
    });
    const taxAmount = calculateTax(totalA, selectedTax);
    setTotalTax(taxAmount);
    setTotalAmount(totalA);
    setGrandTotal(taxAmount + totalA);
    let roundedNumber = Math.round(grandTotal);
    setRoundedTotal(roundedNumber);
  }, [tableData, selectedTax, grandTotal]);

  useEffect(() => {
    fetchTaxes();
    fetchInvoiceNumber();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleTax = async (tempPincode) => {
    try {
      const payload = {
        organisationPincode: pincode,
        customerPincode: tempPincode,
      };
      console.log(payload);
      const response = await axios.post(
        "https://jewellers-erp.onrender.com/utils/gstChooser",
        payload
      );
      if (response.status !== 200) {
        const message = await response.text();

        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;

        // console.log(data, "tax");
        setTax(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          <PrintRepairInvoice
            ref={componentRef}
            formData={formData}
            orgName={orgName}
            invoiceNumber={invoiceNumber}
            totalAmount={totalAmount}
            tableData={tableData}
            grandTotal={grandTotal}
            roundedTotal={roundedTotal}
            outstandingAmount={outstandingAmount}
            totalTax={totalTax}
            address={currentCustomer?.address}
            pincode={currentCustomer?.pincode}
            tax={tax}
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
            New Repair Invoice
          </h2>
          <Row>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                >
                  Invoice Number
                </label>
                {isCapturing ? (
                  <div className="form-control">{invoiceNumber || 0}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter invoice number"
                    id="invoiceNumber"
                    value={invoiceNumber || 0}
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
                  htmlFor="customerName"
                >
                  Customer Name
                </label>
                <ReactSelect
                  options={selectOptionsCustomer}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "customerName")
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                  styles={customSelectStyles}
                />
                {validationErrors.customerName && (
                  <p className="text-danger">{validationErrors.customerName}</p>
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
                  htmlFor="returnDate"
                >
                  Expected Return Date:
                </label>
                {isCapturing ? (
                  <div className="form-control">{formData?.returnDate}</div>
                ) : (
                  <input
                    type="date"
                    value={formData?.returnDate}
                    className="form-control px-2 py-4"
                    id="returnDate"
                    onChange={(e) => handleInputChange(e, "returnDate")}
                  />
                )}
                {validationErrors.returnDate && (
                  <p className="text-danger">{validationErrors.returnDate}</p>
                )}
              </FormGroup>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="address"
                >
                  Customer Address
                </label>
                {isCapturing ? (
                  <div className="form-control">{currentCustomer.address}</div>
                ) : (
                  <input
                    type="text"
                    value={currentCustomer ? currentCustomer.address : ""}
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
                  Customer Pincode
                </label>
                {isCapturing ? (
                  <div className="form-control">{currentCustomer.pincode}</div>
                ) : (
                  <input
                    type="text"
                    value={currentCustomer ? currentCustomer.pincode : ""}
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
                columns={RepairInvoiceColumns(updateData, deleteData)}
                data={tableData}
                fixedHeader
                customStyles={darkTheme ? darkThemeStyles : lightThemeStyles}
              />
            </Col>
          </Row>
        </div>
        <div
          className={`${
            darkTheme ? "bg-dark-gray border-dark" : "bg-white border-white"
          } border p-5 detail-product d-flex flex-column gap-4 rounded mt-3`}
        >
          <h2 className={`${darkTheme ? " text-white" : " text-dark"} mb-3`}>
            Taxes and Charges
          </h2>
          <Row>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="taxCategory"
                >
                  Tax Category
                </label>
                <ReactSelect
                  options={selectOptionsTaxes}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "taxCategory")
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                  styles={customSelectStyles}
                />
                {validationErrors.taxCategory && (
                  <p className="text-danger">{validationErrors.taxCategory}</p>
                )}
              </FormGroup>
            </Col>
            <Col xl={6}>
              <div className="radio-buttons">
                {tax === "sgst/cgst" && (
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="radio"
                      id="taxType"
                      value="SGST_CGST"
                    />
                    <span
                      className={`${
                        darkTheme ? " box-white" : " box-dark"
                      } radio-btn ${tax === "sgst/cgst" ? "active-tax" : ""}`}
                    >
                      <i className="las la-check" />
                      <div className="taxes">
                        <h3
                          className={`${
                            darkTheme ? " text-white" : " text-dark"
                          } form-control-label`}
                        >{`SGST: ${
                          selectedTax?.sgst ? selectedTax?.sgst : ""
                        }`}</h3>
                        <h3
                          className={`${
                            darkTheme ? " text-white" : " text-dark"
                          } form-control-label`}
                        >{`CGST: ${
                          selectedTax?.cgst ? selectedTax?.cgst : ""
                        }`}</h3>
                      </div>
                    </span>
                  </label>
                )}
                {tax === "igst" && (
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="radio"
                      id="taxType"
                      value="IGST"
                    />
                    <span
                      className={`${
                        darkTheme ? " box-white" : " box-dark"
                      } radio-btn ${tax === "igst" ? "active-tax" : ""}`}
                    >
                      <i className="las la-check" />
                      <div className="taxes">
                        <h3
                          className={`${
                            darkTheme ? " text-white" : " text-dark"
                          } form-control-label`}
                        >{`IGST: ${
                          selectedTax?.igst ? selectedTax?.igst : ""
                        }`}</h3>
                      </div>
                    </span>
                  </label>
                )}
              </div>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                >
                  Total Tax
                </label>
                {isCapturing ? (
                  <div className="form-control">{totalTax}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter tax"
                    name="total"
                    value={`₹${totalTax}` ? totalTax : "0"}
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
                  htmlFor="roundedTotal"
                >
                  Rounded Total
                </label>
                {isCapturing ? (
                  <div className="form-control">{roundedTotal}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter rounded total"
                    value={roundedTotal || 0}
                    className="form-control px-2 py-4"
                    id="roundedTotal"
                    onChange={(e) => handleInputChange(e, "roundedTotal")}
                    readOnly
                  />
                )}
                {/* {validationErrors.roundedTotal && (
                  <p className="text-danger">{validationErrors.roundedTotal}</p>
                )} */}
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
          <Row className="d-flex align-items-right justify-content-end">
            <Col xl={6} className="">
              <FormGroup>
                <label
                  className={`${
                    darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                  htmlFor="outstandingAmount"
                >
                  Outstanding Amount
                </label>
                {isCapturing ? (
                  <div className="form-control">{outstandingAmount}</div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter outstanding amount"
                    value={outstandingAmount || 0}
                    className="form-control px-2 py-4"
                    id="outstandingAmount"
                    onChange={(e) => handleInputChange(e, "outstandingAmount")}
                    readOnly
                  />
                )}
                {/* {validationErrors.outstandingAmount && (
                  <p className="text-danger">
                    {validationErrors.outstandingAmount}
                  </p>
                )} */}
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex align-items-right justify-content-end">
            <Col xl={6}>
              <p
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                Cash Payment
              </p>
              <input
                type="radio"
                id="paymentCash"
                name="radioYes"
                value="Yes"
                onChange={(e) => handleInputChange(e, "paymentCash")}
                checked={formData?.paymentCash === "Yes"}
              />{" "}
              <label htmlFor="yes" id="paymentCash">
                Yes
              </label>
              <br />
              <input
                type="radio"
                id="paymentCash"
                name="radioNo"
                value="No"
                onChange={(e) => handleInputChange(e, "paymentCash")}
                checked={formData?.paymentCash === "No"}
              />{" "}
              <label htmlFor="no">No</label>
              <br />
              <input
                type="radio"
                id="paymentCashBoth"
                name="radioBoth"
                value="Both"
                onChange={(e) => handleInputChange(e, "paymentCash")}
                checked={formData?.paymentCash === "Both"}
              />{" "}
              <label htmlFor="paymentCashBoth">Both</label>
              <br />
              {validationErrors.paymentCash && (
                <p className="text-danger">{validationErrors.paymentCash}</p>
              )}
            </Col>
          </Row>
        </div>
        {formData?.paymentCash && (
          <div
            className={`${
              darkTheme ? "bg-dark-gray border-dark" : "bg-white border-white"
            } border p-5 detail-product d-flex flex-column gap-4 rounded mt-3`}
          >
            <h2 className={`${darkTheme ? " text-white" : " text-dark"} mb-3`}>
              Payment
            </h2>
            <Cashdetail
              show={
                formData?.paymentCash === "Yes" ||
                formData?.paymentCash === "Both"
              }
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
              darkThemeStyles={darkThemeStyles}
              lightThemeStyles={lightThemeStyles}
              darkTheme={darkTheme}
              cashPaymentDetails={cashPaymentDetails}
              setCashPaymentDetails={setCashPaymentDetails}
              cashPaymentTableData={cashPaymentTableData}
              setCashPaymentTableData={setCashPaymentTableData}
            />
            <OnlineDetail
              show={
                formData?.paymentCash === "No" ||
                formData?.paymentCash === "Both"
              }
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
              darkThemeStyles={darkThemeStyles}
              lightThemeStyles={lightThemeStyles}
              darkTheme={darkTheme}
              onlinePaymentDetails={onlinePaymentDetails}
              setOnlinePaymentDetails={setOnlinePaymentDetails}
              onlinePaymentTableData={onlinePaymentTableData}
              setOnlinePaymentTableData={setOnlinePaymentTableData}
            />
          </div>
        )}
      </div>
      <RepairItemsModal
        modal={modal}
        toggleModal={toggleModal}
        handleModalInputChange={handleModalInputChange}
        productData={productData}
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
        handleImageChange={handleImageChange}
      />
      <RepairTaxModal
        taxModal={taxModal}
        toggleTaxModal={toggleTaxModal}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
      />
    </section>
  );
};

export default RepairInvoice;
