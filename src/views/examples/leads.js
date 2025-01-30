import React from "react";
import "./chatbot.scss";
import {
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col,
  Container,
  Input,
} from "reactstrap";
import InputField from "common/fields/input-field";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { leadsSchema } from "common/validation_schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toastify } from "common/helpers/toast";
import TextAreaField from "common/fields/textarea-field";
import SalesHeader from "components/Headers/salesHeader";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
const Leads = () => {
  const [pending, setPending] = useState(true);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(leadsSchema),
  });
  const isDisabled = Object.keys(errors).length > 0;
  // const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileHandler = async () => {
    // // console.log(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://jewellers-erp.onrender.com/saveLeads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error during file upload");
      }

      const responseData = await response.json();
      toastify({ msg: responseData.message, type: "success" });
      // // console.log(responseData);
    } catch (err) {
      console.error(err);
      // toastify({ msg:  responseData , type: "success" });
    }
    reset();
  };

  const uploadSales = async (data) => {
    try {
      const response = await fetch("https://jewellers-erp.onrender.com/saveLeads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      toastify({ msg: responseData, type: "success" });
      //   navigate("/auth/login");
    } catch (error) {
      //   toastify({ msg: error, type: "danger" });
      console.error("Error:", error);
    }
    reset();
  };
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const { data: empData } = useAllEmpDetails(
    `https://jewellers-erp.onrender.com/users/${user.sessionId}`,
    pending,
    setPending
  );
  return (
    <>
      <SalesHeader empData={empData} />
      <Container className="mt-7" fluid>
        <Row>
          <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h3>Upload the Leads here</h3>
                </div>
                <Form role="form" onSubmit={handleSubmit(uploadSales)}>
                  <InputField
                    control={control}
                    name="companyname"
                    placeholder="Company Name"
                    errors={errors}
                  />
                  <InputField
                    control={control}
                    name="email"
                    placeholder="Email"
                    errors={errors}
                  />
                  <InputField
                    control={control}
                    name="mobile"
                    placeholder="Phone Number"
                    errors={errors}
                  />
                  <InputField
                    control={control}
                    name="companytype"
                    placeholder="Company Type"
                    errors={errors}
                  />

                  <InputField
                    control={control}
                    name="keywords"
                    placeholder="Keywords"
                    errors={errors}
                  />
                  <TextAreaField
                    control={control}
                    name="desc"
                    placeholder="Description"
                    errors={errors}
                  />
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="primary"
                      type="submit"
                      disabled={isDisabled}
                    >
                      Upload
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="4">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h3>Upload the Leads in bulk here</h3>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <label htmlFor="myfile">Select a file:</label>
                  <Input
                    type="file"
                    id="myfile"
                    name="myfile"
                    onChange={changeHandler}
                  />
                </div>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    onClick={() => uploadFileHandler()}
                  >
                    Upload
                  </Button>
                </div>
                <h4 className="mt-5">
                  <Link to="https://docs.google.com/spreadsheets/d/11qNZAaZUaMyPW3wiz8MwpQ4vJkjibQHE/edit?usp=drive_link&ouid=116457646771835484685&rtpof=true&sd=true" target="_blank">
                    Click here for a sample file upload
                  </Link>
                </h4>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Leads;
