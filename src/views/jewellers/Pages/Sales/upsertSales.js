import { customSelectStyles } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const UpsertSales = ({
  isSales,
  setIsSales,
  validationErrors,
  validateField,
  setValidationErrors,
  productData,
  customerData,
}) => {
  // const CustomOption = (props) => {   //this is to show the image inthe dropdown
  //   return (
  //     <div>
  //       <img
  //         src="https://firebasestorage.googleapis.com/v0/b/aestra-jewellers-files.appspot.com/o/suppfrom-whatsapp%3A%2B919818525179-Sadh%20Jewellers-2023-09-28.jpeg?alt=media&token=545e5d01-f26f-4557-a794-2f99788a2084"
  //         alt="alt"
  //         style={{ width: "20px", height: "20px", marginRight: "10px" }}
  //       />
  //       hello
  //     </div>
  //   );
  // };
  const { darkTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const selectOptionsPurity = [
    { value: '24k', label: '24k' },
    { value: '22k', label: '22k' },
    { value: '18k', label: '18k' },
    { value: '14k', label: '14k' },
    { value: '10k', label: '10k' },
  ];

  const handleSelectChange = (selectedOption, fieldName) => {
    if (selectedOption.value === "create_new_customer") {
      navigate("/admin/customers"); 
      return;
    }
    if (selectedOption.value === "create_new_product") {
      navigate("/admin/allProducts");
      return;
    }

    const value = selectedOption.value;
    setIsSales((prevSales) => ({
      ...prevSales,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setIsSales((prevSales) => ({
      ...prevSales,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const selectOptionsCustomer = customerData.map((center) => ({
    value: center.customerId,
    label: center.name,
  }));

  selectOptionsCustomer.push({
    value: "create_new_customer",
    label: "Create a new customer",
  });

  const selectOptionsProduct = productData.map((product) => ({
    value: product.productId,
    label: product.productName,
  }));

  selectOptionsProduct.push({
    value: "create_new_product",
    label: "Create a new product",
  });

  return (
    <Form>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="customerId"
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
              >
                Customer Name:
              </label>
              <ReactSelect
                options={selectOptionsCustomer}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "customerId")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              />
              {validationErrors.customerId && (
                <p className="text-danger">{validationErrors.customerId}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                htmlFor="productId"
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
              >
                Product Name:
              </label>
              <ReactSelect
                options={selectOptionsProduct}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "productId")
                }
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customSelectStyles}
              // components={{ Option: CustomOption }}
              />
              {validationErrors.productId && (
                <p className="text-danger">{validationErrors.productId}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${darkTheme ? " text-white" : " text-dark"
                  } form-control-label`}
                htmlFor="quantity"
              >
                Quantity:
              </label>
              <input
                id="quantity"
                className="form-control py-4 px-2"
                placeholder="Enter quantity"
                type="text"
                value={isSales.quantity}
                onChange={(e) => handleInputChange(e, "quantity")}
              />
              {validationErrors.quantity && (
                <p className="text-danger">{validationErrors.quantity}</p>
              )}
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="purity" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
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
              />
              {validationErrors.purity && (
                <p className="text-danger">{validationErrors.purity}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label htmlFor="weight" className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>
                Weight (in grams)*:
              </label>
              <input
                id="weight"
                className="form-control  px-2 py-4"
                type="text"
                placeholder="Enter weight"
                value={isSales.weight}
                onChange={(e) => handleInputChange(e, "weight")}
              />
              {validationErrors.weight && (
                <p className="text-danger">{validationErrors.weight}</p>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpsertSales;
