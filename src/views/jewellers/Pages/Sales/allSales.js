import { React, useState } from "react";
// import { toastify } from "common/helpers/toast";
// import { validateField, validateSales } from "./validation";
// import UpsertSales from "./upsertSales";
import Columns from "./columns";
import DatatableView from "components/common/DatatableView";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";
import { useNavigate } from "react-router-dom";

function AllSales() {
  const [pending, setPending] = useState(true);
  // const [modal, setModal] = useState(false);
  // const [validationErrors, setValidationErrors] = useState({});
  // const [isSales, setIsSales] = useState({
  //   customerId: "",
  //   productId: "",
  //   quantity: "",
  //   weight:"",
  // });
  const navigate = useNavigate();
  const [tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/sales/fetch",
    setPending,
    false
  );

  // const [productData = tableData] = useFetchData(
  //   "https://jewellers-erp.onrender.com/products/fetch",
  //   setPending
  // );
  
  // const [customerData = tableData] = useFetchData(
  //   "https://jewellers-erp.onrender.com/customer/fetch",
  //   setPending
  // );

  const toggleModal = () => {
    navigate('/admin/invoice')
  };
  // const handleInvoice = () => {
  //   const errors = validateSales(isSales);
  //   setValidationErrors(errors);

  //   if (Object.keys(errors).length === 0) {
  //     console.log(isSales);
  //     navigate("/admin/invoice", {
  //       state: { InvoiceData: isSales },
  //     });
  //   }
  // };

  // const saveData = async (newData) => {
  //   const errors = validateSales(isSales);
  //   setValidationErrors(errors);

  //   // Check if there are no errors before proceeding
  //   if (Object.keys(errors).length === 0) {
    
  //     try {
  //       const response = await fetch(
  //         "https://jewellers-erp.onrender.com/sales/add",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(newData),
  //         }
  //       );
  //       const message = await response.text();
  //       if (response.status === 200) {
  //         toastify({ msg: message, type: "success" });
  //         refreshData();
  //         setIsSales({
  //           customerId: "",
  //           productId: "",
  //           quantity: "",
  //         });
  //         toggleModal();
  //       } else {
  //         toastify({
  //           msg: message,
  //           type: "error",
  //         });
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // };
  return (
    <>
      <JewelHeader />
      <DatatableView
        tableProps={{
          data: tableData,
          columns: Columns(),
          loading: pending,
        }}
        // handleSubmit={saveData}
        // modalBody={
        //   <UpsertSales
        //     isSales={isSales}
        //     setIsSales={setIsSales}
        //     validationErrors={validationErrors}
        //     validateField={validateField}
        //     setValidationErrors={setValidationErrors}
        //     productData={productData}
        //     customerData={customerData}
        //   />
        // }
        componentName="Invoice"
        toggleModal={toggleModal}
        // isNewData={isSales}
        // modal={modal}
      />
    </>
  );
}
export default AllSales;
