import { useState } from "react";
import React from "react";
import Columns from "./columns";
import DatatableView from "components/common/DatatableView";
import UpsertAppraisal from "./upsertAppraisals";
import { validateAppraisal, validateField } from "./validation";
import { toastify } from "common/helpers/toast";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllAppraisals() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const initialValues = {
    customerId: "",
    productId: "",
    appraiserEmail: "",
    appraisedValue: "",
    appraisalDate: "",
  };
  const [isAppraisals, setIsAppraisals] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({});
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/appraisals/fetch",
    setPending,
    false
  );

  const [productData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/products/fetch",
    setPending
  );

  const [customerData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/customer/fetch",
    setPending
  );

  const saveData = async (newData) => {
    const errors = validateAppraisal(isAppraisals);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log(newData);

      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/appraisals/update",
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
          setIsAppraisals({
            customerId: "",
            productId: "",
            appraiserEmail: "",
            appraisedValue: "",
            appraisalDate: "",
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
          <UpsertAppraisal
            isAppraisals={isAppraisals}
            setIsAppraisals={setIsAppraisals}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
            productData={productData}
            customerData={customerData}
          />
        }
        componentName="Appraisal"
        isNewData={isAppraisals}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllAppraisals;
