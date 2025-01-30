import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import React from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import JewelHeader from "components/Headers/jewelHeader";
import { StyledHeader } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import { darkThemeStyles } from "components/common/DatatableView/themeMode";
import { lightThemeStyles } from "components/common/DatatableView/themeMode";
import NoDataComponent from "components/common/DatatableView/noDataComponent";
import CustomProgressComponenet from "components/common/DatatableView/customProgressComponenet";
import { useNavigate } from "react-router-dom";

function AllPurchaseOrder() {
  const [pending, setPending] = useState(true);
  //eslint-disable-next-line
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { darkTheme } = useContext(ThemeContext);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  const handleActionButtonClick = (row) => {
    setSelectedRow(row);
    toggleModal();
  };

  const getImageUrlForSelectedRow = () => {
    if (!selectedRow) return null;
    const imageObject = imageUrls.find((imgObj) => imgObj.name === selectedRow);
    return imageObject ? imageObject.url : null;
  };
  const columns = [
    {
      name: <StyledHeader>Order Image</StyledHeader>,
      cell: (row) => {
        // console.log("imageUrls", imageUrls);
        let imageElement = <div>No Image</div>; // Default to "No Image"
        for (const imageObject of imageUrls) {
          if (imageObject.name === row) {
            // console.log("url of image", imageObject.url);
            imageElement = (
              <img src={imageObject.url} alt={row.productName} width="100" />
            );
            break; // Exit the loop once a match is found
          }
        }

        return imageElement; // Return the JSX for the image
      },
    },
    {
      name: <StyledHeader>Supplier</StyledHeader>,
      selector: (row) => {
        const parts = row.split("~");
        const supplier = parts[1];
        return supplier
      }
    },
    {
      name: <StyledHeader>Date</StyledHeader>,
      selector: (row) => {
        const datePattern = /\d{4}-\d{2}-\d{2}/;

        // Use the RegExp.exec() method to find the date in the string
        const match = datePattern.exec(row);
        let extractedDate;
        if (match) {
          extractedDate = match[0]; // The matched date
          // console.log("Extracted Date:", extractedDate);
        } else {
          // console.log("Date not found in the string.");
        }
        return extractedDate;
      },
      sortable: true,
    },
    {
      name: <StyledHeader>Action</StyledHeader>,
      selector: (row) => (
        <>
          <button
            onClick={() => handleActionButtonClick(row)}
            className="btn btn-warning "
          >
            <AiOutlineInfoCircle />
          </button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyAacefHpzyWL1GwQ71kECB6bl1cG3DugSs",
        authDomain: "aestra-jewellers-files.firebaseapp.com",
        projectId: "aestra-jewellers-files",
        storageBucket: "aestra-jewellers-files.appspot.com",
        messagingSenderId: "176790703198",
        appId: "1:176790703198:web:b0bbded8b36b2136c1f8cf",
        measurementId: "G-W6PHRDWFJY",
      };

      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app);

      const storageRef = ref(storage);
      // List all objects (components) in the bucket
      const response = await listAll(storageRef);

      // result.items is an array of references to all objects in the bucket
      const allObjectReferences = response.items;
      // console.log("allobjectreferences", allObjectReferences)

      // Create an array to store the object names
      const objectNames = allObjectReferences
        .map((objectRef) => objectRef.name)
        .filter((object) => object.includes("PO"));
      // console.log("objectnames", objectNames)
      setTableData(objectNames);

      for (const object of objectNames) {
        const fileRef = ref(storage, object);
        getDownloadURL(fileRef)
          .then((url) => {
            // Use the URL to display or download the file
            // console.log("File URL:", url);
            let object1 = {};
            object1.name = object;
            object1.url = url;
            // console.log("logging object before pushing", object1);
            setImageUrls((prevImageUrls) => [...prevImageUrls, object1]);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
      setPending(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handlePurchaseRedirect = () => {
    navigate("/admin/purchaseOrder");
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const dateFetchingForSelectedRow = () => {
    const datePattern = /\d{4}-\d{2}-\d{2}/;

    // Use the RegExp.exec() method to find the date in the string
    const match = datePattern.exec(selectedRow);
    let extractedDate;
    if (match) {
      extractedDate = match[0]; // The matched date
      // console.log("Extracted Date:", extractedDate);
    } else {
      // console.log("Date not found in the string.");
    }
    return extractedDate;
  };
  const supplierFetchingForSelectedRow = () => {
    // console.log("logginselectedRow in supplier fetching", selectedRow)
    const parts = selectedRow.split("~");
    const supplier = parts[1];

    // console.log("extractedSupplier", supplier);
    return supplier
  }

  return (
    <>
      <JewelHeader />
      <Container className="mt-3" fluid>
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card
              className={`${darkTheme ? "bg-dark-gray" : " bg-white "} shadow`}
            >
              <CardHeader
                className={`${darkTheme ? "bg-dark-gray" : " bg-erp "
                  } border-0 d-flex justify-content-between align-items-center p-3`}
              >
                <h3 className="text-white mb-0">All Purchase Order</h3>
                <button
                  onClick={handlePurchaseRedirect}
                  className="btn btn-warning "
                >
                  Add Purchase Order
                </button>
              </CardHeader>
              <DataTable
                customStyles={darkTheme ? darkThemeStyles : lightThemeStyles}
                columns={columns}
                data={tableData}
                defaultSortFieldId={5}
                defaultSortAsc={false}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
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
          </div>
        </Row>
        <Modal
          isOpen={modal}
          toggle={toggleModal}
          className={`${darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
            }`}
        >
          <ModalHeader toggle={toggleModal}>
            <p className={`${darkTheme ? " text-white" : " text-dark"} m-0`}>
              Bill Details
            </p>
          </ModalHeader>
          <ModalBody>
            <Form>
              <Container>
                <Row className="mb-3">
                  <Col lg={12} className="d-flex justify-content-center">
                    {getImageUrlForSelectedRow() && (
                      <img
                        src={getImageUrlForSelectedRow()}
                        alt={
                          selectedRow
                            ? selectedRow.productName
                            : "Product Image"
                        }
                        width="100%"
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <label
                        htmlFor="billName"
                        className={`${darkTheme ? " text-white" : " text-dark"
                          } form-control-label`}
                      >
                        Supplier
                      </label>
                      <input
                        id="billName"
                        className="form-control py-4 px-2"
                        type="text"
                        value={
                          selectedRow ? supplierFetchingForSelectedRow() : ""
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <label
                        htmlFor="billDate"
                        className={`${darkTheme ? " text-white" : " text-dark"
                          } form-control-label`}
                      >
                        Date:
                      </label>
                      <input
                        id="billDate"
                        type="text"
                        className="form-control py-4 px-2"
                        value={selectedRow ? dateFetchingForSelectedRow() : ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}
export default AllPurchaseOrder;
