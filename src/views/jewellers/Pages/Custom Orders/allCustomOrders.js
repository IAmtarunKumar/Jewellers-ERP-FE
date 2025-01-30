import { useState } from "react";
import React from "react";
import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import Columns from "./columns";
import UpsertCustomOrder from "./upsertCustomOrder";
import { validateCustomOrder, validateField } from "./validation";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllCustomOrder() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const initialValues = {
    customerId: "",
    productName: "",
    orderDate: "",
    completionDate: "",
    productDescription: "",
  };
  const [customOrder, setcustomOrder] = useState(initialValues);

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/customOrder/fetch",
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

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const saveData = async (newData) => {
    const errors = validateCustomOrder(customOrder);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log(newData);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/customOrder/update",
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
          setcustomOrder({
            customerId: "",
            productName: "",
            orderDate: "",
            completionDate: "",
            productDescription: "",
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
          <UpsertCustomOrder
            customOrder={customOrder}
            setcustomOrder={setcustomOrder}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
            productData={productData}
            customerData={customerData}
          />
        }
        componentName="Custom Order"
        isNewData={customOrder}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllCustomOrder;
