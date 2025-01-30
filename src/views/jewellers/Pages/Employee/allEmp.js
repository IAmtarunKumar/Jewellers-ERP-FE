import { useState} from "react";
import React from "react";

import DatatableView from "components/common/DatatableView";
import JewelHeader from "components/Headers/jewelHeader";
import Columns from "./columns";
import UpsertEmp from "./upsertEmp";
import useFetchData from "common/customHooks/useFetchData";

function AllEmp() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);

  const [tableData, refreshData] = useFetchData(
    "https://jewellers-erp.onrender.com/users/fetch",
    setPending,
    false
  );
  
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
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
        modalBody={<UpsertEmp refreshData={refreshData} toggleModal={toggleModal}/>}
        componentName="Employee"
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllEmp;
