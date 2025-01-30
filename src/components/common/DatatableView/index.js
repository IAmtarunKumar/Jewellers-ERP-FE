import DataTable from "react-data-table-component";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import { darkThemeStyles, lightThemeStyles } from "./themeMode";
import NoDataComponent from "./noDataComponent";
import CustomProgressComponenet from "./customProgressComponenet";
import { useUser } from "common/context/userContext";
import { useRef } from "react";
import { toastify } from "common/helpers/toast";
import axios from "axios";

const DatatableView = (props) => {
  const {
    modalBody = null,
    handleSubmit,
    tableProps,
    componentName,
    isNewData,
    expandableComponent,
    modal,
    toggleModal,
    below = false,
  } = props;
  const { pathname } = useLocation();
  const { data, columns, loading } = tableProps;
  const { darkTheme } = useContext(ThemeContext);
  const { isAdmin, create } = useUser();
  const hiddenFileInput = useRef(null);

  const onFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      console.log(selectedFiles);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("bulkImageUpload", selectedFiles[i]);
      }
      try {
        await axios
          .post(
            `https://aestraswift.ocpl.tech/jewellers/bulkImageUpload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            if (response.status !== 200) return;
            toastify({ msg: response.data, type: "success" });
          })
          .catch((error) => {
            toastify({ msg: error.response.data, type: "error" });
          });
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

  const handleBulkUploadClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Container className={`${below ? "mt-3" : "mt-3"}`} fluid>
        {/* Table */}
        <Card className={`${darkTheme ? "bg-dark-gray" : " bg-white "} shadow`}>
          <CardHeader
            className={`${
              darkTheme ? "bg-dark-gray" : " bg-erp "
            } border-0 d-flex justify-content-between align-items-center p-3 flex-wrap`}
          >
            <h3 className="text-white mb-0">All {componentName}s</h3>
            {(isAdmin || create) && (
              <div className="d-flex justify-content-between align-items-center flex-wrap mt-sm-0 mt-3">
                {pathname === "/admin/allProducts" && (
                  <>
                    <button
                      onClick={handleBulkUploadClick}
                      className="btn btn-warning "
                    >
                      Bulk Image
                    </button>
                    <input
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      ref={hiddenFileInput}
                      onChange={onFileChange}
                    />
                  </>
                )}
                <button onClick={toggleModal} className="btn btn-warning ">
                  Add {componentName}
                </button>
              </div>
            )}
          </CardHeader>
          <DataTable
            customStyles={darkTheme ? darkThemeStyles : lightThemeStyles}
            columns={columns}
            data={data}
            // defaultSortAsc={false}
            pagination
            // paginationResetDefaultPage={resetPaginationToggle}
            progressPending={loading}
            expandableRows={!!expandableComponent}
            expandableRowsComponent={expandableComponent}
            noDataComponent={
              <NoDataComponent
                darkTheme={darkTheme}
                customMessage="There are no records to display"
              />
            }
            progressComponent={
              <CustomProgressComponenet darkTheme={darkTheme} />
            }
          />
        </Card>
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          className={`${
            darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
          }`}
        >
          <ModalHeader toggle={toggleModal}>
            <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
              Add a new {componentName}
            </p>
          </ModalHeader>
          <ModalBody>{modalBody}</ModalBody>
          {pathname !== "/admin/employees" && (
            <ModalFooter>
              <Button
                color="primary"
                className="bg-erp"
                onClick={() => {
                  handleSubmit(isNewData);
                }}
              >
                Save
              </Button>
            </ModalFooter>
          )}
        </Modal>
      </Container>
    </>
  );
};
export default DatatableView;
