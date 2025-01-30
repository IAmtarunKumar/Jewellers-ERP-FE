import { useState } from "react";
import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import Columns from "./columns";
import UpsertHallMark from "./upsertHallMark";
import { validateField, validateHallMark } from "./validation";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllHallMarks() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [isHallMark, setIsHallMark] = useState({
    productId: "",
    hallmarkCenterId: "",
    hallmarkDate: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/hallmark/fetch",
    setPending,
    false
  );

  const [productData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/products/fetch",
    setPending
  );

  const [hallmarkCenterData = tableData] = useFetchData(
    "https://jewellers-erp.onrender.com/hallmarkCenter/fetch",
    setPending,
    false
  );

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const saveData = async (newData) => {
    const errors = validateHallMark(isHallMark);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log(newData);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/hallmark/update",
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
          setIsHallMark({
            productId: "",
            hallmarkCenterId: "",
            hallmarkDate: "",
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
          <UpsertHallMark
            isHallMark={isHallMark}
            setIsHallMark={setIsHallMark}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
            productData={productData}
            hallmarkCenterData={hallmarkCenterData}
          />
        }
        componentName="HallMark"
        isNewData={isHallMark}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllHallMarks;
