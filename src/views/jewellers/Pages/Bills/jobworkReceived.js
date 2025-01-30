import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import React from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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

function JobWorkReceived() {
  const [pending, setPending] = useState(true);
  //eslint-disable-next-line
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { darkTheme } = useContext(ThemeContext);
  //
  //code for adding all the image urls to the array so that we can obtain images from then on demand
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Initialize Firebase (you should have already initialized it in your project)
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

    //we are now using forloop to store every product image in our array
    for (let i = 0; i < tableData.length; i++) {
      // console.log("we are in the forloop");
      // Create a reference to the image file you want to fetch by filename
      const fileRef = ref(storage, tableData[i].imageUrl); // Replace with the actual path

      // Get the download URL
      getDownloadURL(fileRef)
        .then((url) => {
          // Use the URL to display or download the file
          // console.log("File URL:", url);
          let object = {};
          object.name = tableData[i].imageUrl;
          object.url = url;
          // console.log("logging object before pushing", object);
          setImageUrls((prevImageUrls) => [...prevImageUrls, object]);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }, [tableData]);
  //
  //
  const handleActionButtonClick = (row) => {
    setSelectedRow(row);
    toggleModal();
  };

  const getImageUrlForSelectedRow = () => {
    if (!selectedRow) return null;
    const imageObject = imageUrls.find(
      (imgObj) => imgObj.name === selectedRow.imageUrl
    );
    return imageObject ? imageObject.url : null;
  };

  const columns = [
    {
      name: <StyledHeader>Bill Image</StyledHeader>,
      cell: (row) => {
        // console.log("imageUrls", imageUrls);
        let imageElement = <div>No Image</div>; // Default to "No Image"

        for (const imageObject of imageUrls) {
          if (imageObject.name === row.imageUrl) {
            // console.log("url of image", imageObject.name);
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
      name: <StyledHeader>Bill Name</StyledHeader>,
      selector: (row) => row.productName,
    },
    {
      name: <StyledHeader>Date</StyledHeader>,
      selector: (row) => row.sku,
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
      sortable: true,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/products/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data, "image respomse");
      setTableData(data);
      setPending(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
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
                <h3 className="text-white mb-0">All Job Received Bill</h3>
              </CardHeader>
              <DataTable
                columns={columns}
                data={tableData}
                defaultSortFieldId={5}
                defaultSortAsc={false}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </div>
        </Row>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Bill Details</ModalHeader>
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
                      <label htmlFor="billName" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                        Bill Name
                      </label>
                      <input
                        id="billName"
                        className="form-control py-4 px-2"
                        type="text"
                        value={selectedRow ? selectedRow.imageUrl : ""}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <label htmlFor="billDate" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                        Date:
                      </label>
                      <input
                        id="billDate"
                        type="date"
                        className="form-control py-4 px-2"
                        value={selectedRow ? selectedRow.sku : ""}
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
export default JobWorkReceived;
