import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import JewelHeader from "components/Headers/jewelHeader";
import { toastify } from "common/helpers/toast";
import { StyledHeader } from "common/constant/constant";

function AllJobWork() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  const [pending, setPending] = useState(true);
  //eslint-disable-next-line
  const [resetPaginationToggle, setResetPaginationToggle] = useState(true);
  const [modal, setModal] = useState(false);
  const [isJobWork, setIsJobWork] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
  };
  const saveData = async (newData) => {
    // console.log(newData);
    // try {
    //   const response = await fetch(
    //     "https://jewellers-erp.onrender.com/jobWork/update",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newData),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   } else {
    //     toastify({ msg: "Product added successfully", type: "success" });
    //     fetchData();
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };
  return (
    <>
      <JewelHeader />
      <Container className="mt--7" fluid>
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">All Job Work</h3>
                <button onClick={toggleModal} className="add-btn">
                  +
                </button>
              </CardHeader>
              <DataTable
                columns={columns}
                data={tableData}
                defaultSortFieldId={5}
                defaultSortAsc={false}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
              />
            </Card>
          </div>
        </Row>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add a new Job Work</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                saveData(isJobWork);
                toggleModal();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}
export default AllJobWork;
