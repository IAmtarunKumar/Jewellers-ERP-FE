import { useState} from "react";
import React from "react";
import { toastify } from "common/helpers/toast";
import DatatableView from "components/common/DatatableView";
import Columns from "./columns";
import UpsertHallMarkCenter from "./upsertHallmarkCenter";
import { validateField, validateHallMarkCenter } from "./validation";
import JewelHeader from "components/Headers/jewelHeader";
import useFetchData from "common/customHooks/useFetchData";

function AllHallmarkCenter() {

  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [isHallMarkCenter, setIsHallMarkCenter] = useState({
    centerName: "",
    contact: "",
    address: "",
    authorizedBy: "",
    email: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/hallmarkCenter/fetch",
    setPending,
    false
  );
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  const saveData = async (newData) => {
    const errors = validateHallMarkCenter(isHallMarkCenter);
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log(newData);
      try {
        const response = await fetch(
          "https://jewellers-erp.onrender.com/hallmarkCenter/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        if (!response.ok) {
          toastify({
            msg: "Something went wrong! Please try again",
            type: "error",
          });
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          toastify({ msg: "Hallmark Center added successfully", type: "success" });
          refreshData();
          setIsHallMarkCenter({
            centerName: "",
            contact: "",
            address: "",
            authorizedBy: "",
            email: "",
          });
          toggleModal();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <>
     <JewelHeader/>
      <DatatableView
        tableProps={{
          data: tableData,
          columns: Columns(),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertHallMarkCenter
            isHallMarkCenter={isHallMarkCenter}
            setIsHallMarkCenter={setIsHallMarkCenter}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="HallMark Center"
        isNewData={isHallMarkCenter}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllHallmarkCenter;
