import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import { Col, FormGroup, Row } from "reactstrap";
import axios from "axios";
import { validateEditField, validateEditProduct } from "./validation";
import Preview from "components/common/preview/preview";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import ReactSelect from "react-select";
import { customSelectStyles } from "common/constant/constant";

const EditProduct = () => {
  const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const {
    productId,
    productName,
    price,
    sku,
    weight,
    purity,
    material,
    type,
    design,
    size,
    currentStock,
    description,
    imageUrl,
    gemStones,
  } = location.state?.productData;
  console.log(location.state?.productData);
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState({
    productId,
    productName,
    price,
    sku,
    weight,
    purity,
    material,
    type,
    design,
    size,
    currentStock,
    description,
    imageUrl,
    gemStones,
  });
  const fileInputRef = useRef(null);
  console.log(updatedProduct);
  const [localImage, setLocalImage] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  if (!productId) {
    return <div>Product not found!</div>;
  }
  const selectOptionsPurity = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];
  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption.value;
    {
      setUpdatedProduct((prevItem) => ({
        ...prevItem,
        [fieldName]: value,
      }));
    }

    const error = validateEditField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const handleInputChange = (event, fieldName) => {
    let { name, value } = event.target;
    if (fieldName === "gemStones") {
      value = value.split(",").map((item) => item.trim());
    }
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
    const error = validateEditField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setLocalImage((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    const newLocalImages = [...localImage];
    newLocalImages.splice(index, 1);
    setLocalImage(newLocalImages);

    const newNewImages = [...newImages];
    newNewImages.splice(index, 1);
    setNewImages(newNewImages);
  };

  const handleSave = async () => {
    const errors = validateEditProduct(updatedProduct);
    setValidationErrors(errors);
    console.log("er", errors);
    if (Object.keys(errors).length === 0) {
      console.log(updatedProduct);
      try {
        const formData = new FormData();
        newImages.forEach((image) => {
          formData.append("editImage", image);
        });

        // Add other product details
        for (const key in updatedProduct) {
          if (updatedProduct.hasOwnProperty(key)) {
            formData.append(key, updatedProduct[key]);
          }
        }
        // console.log(newProduct);
        await axios
          .post(`https://aestraswift.ocpl.tech/jewellers/editProduct`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status !== 200) return;
            toastify({ msg: response.data, type: "success" });
            navigate("/admin/allProducts");
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
      <section className=" d-flex flex-column  add-product">
        <div className="d-flex justify-content-between p-4 add-header gap-3 flex-wrap">
          <button
            type="button"
            className="btn text-white bg-erp"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </button>
          <p
            className={`${
              darkTheme ? " text-white" : " text-dark"
            } form-control-label`}
          >
            Edit the details of {updatedProduct?.productId}
          </p>
          <div className="d-flex gap-4 align-items-center ">
            <button
              type="button"
              className="btn text-white bg-erp "
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
        <Row className="m-0">
          <Col lg="8">
            <div className="details-section d-flex flex-column p-1  ">
              {/* <h2>Details</h2> */}
              <div
                className={`${
                  darkTheme
                    ? "bg-dark-gray border-dark"
                    : "bg-white border-white"
                } border p-5 detail-product d-flex flex-column gap-4 rounded`}
              >
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control px-2 py-4"
                        placeholder="Enter Product Name"
                        name="productName"
                        value={updatedProduct?.productName}
                        onChange={(e) => handleInputChange(e, "productName")}
                      />
                      {validationErrors.productName && (
                        <p className="text-danger">
                          {validationErrors.productName}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control px-2 py-4"
                        placeholder="Enter Price"
                        name="price"
                        value={updatedProduct?.price}
                        onChange={(e) => handleInputChange(e, "price")}
                      />
                      {validationErrors.price && (
                        <p className="text-danger">{validationErrors.price}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        className="form-control px-2 py-4"
                        placeholder="Enter SKU"
                        value={updatedProduct?.sku}
                        onChange={(e) => handleInputChange(e, "sku")}
                      />
                      {validationErrors.sku && (
                        <p className="text-danger">{validationErrors.sku}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Weight
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Weight"
                        name="weight"
                        className="form-control px-2 py-4"
                        value={updatedProduct?.weight}
                        onChange={(e) => handleInputChange(e, "weight")}
                      />
                      {validationErrors.weight && (
                        <p className="text-danger">{validationErrors.weight}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <label
                        htmlFor="purity"
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Purity:
                      </label>
                      <ReactSelect
                        options={selectOptionsPurity}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, "purity")
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={customSelectStyles}
                        value={selectOptionsPurity.find(option => option.value === updatedProduct?.purity)}
                      />
                      {validationErrors.purity && (
                        <p className="text-danger">{validationErrors.purity}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Material
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Material"
                        name="material"
                        className="form-control px-2"
                        value={updatedProduct?.material}
                        onChange={(e) => handleInputChange(e, "material")}
                      />
                      {validationErrors.material && (
                        <p className="text-danger">
                          {validationErrors.material}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Type"
                        name="type"
                        className="form-control px-2 py-4"
                        value={updatedProduct?.type}
                        onChange={(e) => handleInputChange(e, "type")}
                      />
                      {validationErrors.type && (
                        <p className="text-danger">{validationErrors.type}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Design
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Design"
                        name="design"
                        className="form-control px-2 py-4"
                        value={updatedProduct?.design}
                        onChange={(e) => handleInputChange(e, "design")}
                      />
                      {validationErrors.design && (
                        <p className="text-danger">{validationErrors.design}</p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Size
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Size"
                        name="size"
                        className="form-control px-2 py-4"
                        value={updatedProduct?.size}
                        onChange={(e) => handleInputChange(e, "size")}
                      />
                      {validationErrors.size && (
                        <p className="text-danger">{validationErrors.size}</p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Gem Stone
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Gem Stone"
                        name="gemStones"
                        className="form-control px-2 py-4"
                        value={updatedProduct?.gemStones}
                        onChange={(e) => handleInputChange(e, "gemStones")}
                      />
                      {validationErrors.gemStones && (
                        <p className="text-danger">
                          {validationErrors.gemStones}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Current Stocks
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Stock"
                        name="currentStock"
                        className="form-control px-2 py-4 "
                        value={updatedProduct?.currentStock}
                        onChange={(e) => handleInputChange(e, "currentStock")}
                      />
                      {validationErrors.currentStock && (
                        <p className="text-danger">
                          {validationErrors.currentStock}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Image Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Stock"
                        name="image"
                        className="form-control px-2 py-4 "
                        value={updatedProduct?.imageUrl}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <label className="">Description</label>
                      <textarea
                        placeholder="Enter Description"
                        name="description"
                        className="form-control px-2 py-4"
                        rows={4}
                        value={updatedProduct?.description}
                        onChange={(e) => handleInputChange(e, "description")}
                      ></textarea>
                      {validationErrors.description && (
                        <p className="text-danger">
                          {validationErrors.description}
                        </p>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Images
                      </label>
                      <div className=" mx-3">
                        {localImage.map((imgUrl, index) => (
                          <div
                            key={index}
                            style={{ display: "inline-block", margin: "10px" }}
                          >
                            <img
                              src={imgUrl}
                              alt="uploaded preview"
                              style={{
                                width: "100px",
                                height: "100%",
                              }}
                            />
                            <br />
                            <button
                              className="mt-2 btn btn-dark p-1"
                              onClick={() => handleRemoveImage(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <div
                        className="py-4 border bg-white d-flex rounded flex-column w-full justify-content-center align-items-center"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <p>+</p>
                        <p>Add images</p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        multiple
                        name="design"
                        onChange={handleImageChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Preview
            title="Preview of Product"
            entityType="product"
            data={updatedProduct}
            darkTheme={darkTheme}
          />
        </Row>
      </section>
    </>
  );
};

export default EditProduct;
