import { useState} from "react";
import React from "react";
import { toastify } from "common/helpers/toast";
import UpsertVendor from "./upsertVendor";
import Columns from "./columns";
import { validateField, validateVendor } from "./validation";
import DatatableView from "components/common/DatatableView";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllVendor() {
  const [modal, setModal] = useState(false);
  const [pending, setPending] = useState(true);
  const [isVendor, setIsVendor] = useState({
    name: "",
    contact: "",
    address: "",
    pincode:"",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/vendor/fetch",
    setPending,
    false
  );
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const saveData = async (newData) => {
    const errors = validateVendor(isVendor);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      console.log(newData); 
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/vendor/update",
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
          setIsVendor({
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
          columns: Columns(),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertVendor
            isVendor={isVendor}
            setIsVendor={setIsVendor}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="Vendor"
        isNewData={isVendor}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllVendor;
