import { useState } from "react";
import React from "react";
import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import Columns from "./columns";
import { validateCustomer, validateField } from "./validation";
import UpsertCustomer from "./upsertCustomer";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllCustomers() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);

  const [isCustomer, setIsCustomer] = useState({
    name: "",
    contact: "",
    address: "",
    pincode: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/customer/fetch",
    setPending,
    false
  );

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const saveData = async (newData) => {
    const errors = validateCustomer(isCustomer);
    setValidationErrors(errors);
    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      // console.log(newData);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/customer/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );
        const responseData = await response.text();
        // console.log(response.status);
        if (response.status === 200) {
          toastify({ msg: responseData, type: "success" });
          refreshData();
          setIsCustomer({
            name: "",
            contact: "",
            address: "",
            pincode: "",
          });
          toggleModal();
        } else {
          toastify({
            msg: responseData,
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
          columns: Columns(),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertCustomer
            isCustomer={isCustomer}
            setIsCustomer={setIsCustomer}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="Customer"
        isNewData={isCustomer}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllCustomers;
