import { useState} from "react";
import React from "react";

import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import UpsertSupplier from "./upsert-supplier";
import columns from "./deco-columns";
import { validateField, validateSupplier } from "./validation";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllSuppliers() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [isSupplier, setIsSupplier] = useState({
    name: "",
    contact: "",
    address: "",
    pincode:"",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/supplier/fetch",
    setPending,
    false
  );

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
 

  const saveData = async (newData) => {
    const errors = validateSupplier(isSupplier);
    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      // console.log(newData);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/supplier/update",
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
          setIsSupplier({ name: "", contact: "", address: "" });
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
          columns: columns(),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertSupplier
            isSupplier={isSupplier}
            setIsSupplier={setIsSupplier}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="Supplier"
        isNewData={isSupplier}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllSuppliers;
