import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { toastify } from "common/helpers/toast";
import { validateField, validateProduct } from "./validation";
import Columns from "./columns";
import DatatableView from "components/common/DatatableView";
import UpsertProducts from "./upsertProducts";
import axios from "axios";
import JewelHeader from "components/Headers/jewelHeader";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function AllProducts() {
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { darkTheme } = useContext(ThemeContext);
  const initialValues = {
    type: "",
    purity: "",
    weight: "",
    design: "",
    gemStones: "",
    material: "",
    productName: "",
    sku: "",
    price: "",
    size: "",
    initialStock: "",
    description: "",
  };
  const [isProduct, setIsProduct] = useState(initialValues);
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
      console.log("setimageurl loop is running");
      // console.log("we are in the forloop");
      // Create a reference to the image file you want to fetch by filename
      const fileRef = ref(storage, tableData[i].imageUrl); // Replace with the actual path

      // Get the download URL

      getDownloadURL(fileRef)
        .then((url) => {
          // Use the URL to display or download the file
          //   // console.log("File URL:", url);
          let object = {};
          object.name = tableData[i].imageUrl;
          object.url = url;
          //   // console.log("logging object before pushing", object);
          setImageUrls((prevImageUrls) => [...prevImageUrls, object]);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }
  }, [tableData]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/products/fetch"
      );
      // const data = await response.data;
      console.log("response.data", response.data);
      setTableData(response.data);
      setPending(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshTableData = async () => {
    await fetchData();
    // Handle image fetching for the newly added item if necessary
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };
  // const [tableData, refreshData] = useFetchData(
  //   "https://jewellers-erp.onrender.com/products/fetch",
  //   setPending,
  //   false
  // );

  const ExpandedComponent = ({ data }) => (
    <Card
      className={`${
        darkTheme ? "bg-dark-gray" : " bg-white "
      } shadow expanded-card`}
    >
      <CardBody>
        <CardTitle
          className={`${darkTheme ? "text-white" : " text-dark "} card-title`}
        >
          More Details
        </CardTitle>
        <Row className={`${darkTheme ? "text-white" : " text-dark "} data-row`}>
          <Col xs="3">
            <div className="label">Type:</div>
            <div className="value">{data?.type}</div>
          </Col>
          <Col xs="3">
            <div className="label">Product Id:</div>
            <div className="value">{data?.productId}</div>
          </Col>
          <Col xs="3">
            <div className="label">Purity:</div>
            <div className="value">{data?.purity}</div>
          </Col>
          <Col xs="3">
            <div className="label">Weight (in grams):</div>
            <div className="value">{`${data?.weight} grams`}</div>
          </Col>
        </Row>
        <Row className={`${darkTheme ? "text-white" : " text-dark "} data-row`}>
          <Col xs="3">
            <div className="label">Design:</div>
            <div className="value">{data?.design}</div>
          </Col>
          <Col xs="3">
            <div className="label">Gem Stones:</div>
            <div className="value">
              {data?.gemStones?.map((stone, index) => (
                <div key={index}>{stone}</div>
              ))}
            </div>
          </Col>
          <Col xs="3">
            <div className="label">Description:</div>
            <div className="value">{data?.description}</div>
          </Col>
          <Col xs="3">
            <div className="label">Stocks:</div>
            <div className="value">{data?.currentStock}</div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );

  const saveData = async (newData) => {
    const errors = validateProduct(isProduct);

    setValidationErrors(errors);

    // Check if there are no errors before proceeding
    if (Object.keys(errors).length === 0) {
      // console.log(newData);

      const formData = new FormData();

      for (const key in newData) {
        const value = newData[key];
        if (Array.isArray(value)) {
          // Serialize array values as JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      images.forEach((imageData) => {
        formData.append("productImage", imageData);
      });

      try {
        await axios
          .post(`https://aestraswift.ocpl.tech/jewellers/uploadProduct`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status !== 200) return;
            toastify({ msg: response.data, type: "success" });
            setIsProduct(initialValues);
            // refreshData();
            fetchData();
            toggleModal();
          })
          .catch((error) => {
            toastify({ msg: error.response.data, type: "error" });
          });
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
          data: tableData ? tableData : [],
          columns: Columns({ imageUrls, refreshTableData }),
          loading: pending,
        }}
        handleSubmit={saveData}
        modalBody={
          <UpsertProducts
            setImages={setImages}
            isProduct={isProduct ? isProduct : {}}
            setIsProduct={setIsProduct}
            validationErrors={validationErrors}
            validateField={validateField}
            setValidationErrors={setValidationErrors}
          />
        }
        componentName="Product"
        isNewData={isProduct}
        expandableComponent={ExpandedComponent}
        modal={modal}
        toggleModal={toggleModal}
      />
    </>
  );
}
export default AllProducts;
