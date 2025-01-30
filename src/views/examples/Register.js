// reactstrap components
import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "common/validation_schema";
import InputField from "common/fields/input-field";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import Swal from "sweetalert2";
import SelectField from "common/fields/select-field";
import Loader from "common/loader/loader";
import axios from "axios";
import { ThemeContext } from "common/context/themeContext";

const Register = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [loading, setLoading] = useState(true);
  const { darkTheme } = useContext(ThemeContext);

  // const isAdmin = true;
  // const isAdmin = false;
  const fetchAdmin = async () => {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/utils/signupFlag",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      setIsAdmin(data);
      setLoading(false);
    } catch (error) {
      if (error.response?.data) {
        console.error("Error fetching data:", error.response.data);
      } else {
        console.error("Error fetching data:", error.message);
      }
      setIsAdmin(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line
  }, []);

  async function verifyEmail() {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/sendOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      // // console.log(response.status);
      if (response.status === 400) {
        const responseData = await response.json();
        toastify({ msg: responseData.message, type: "error" });
        return;
      }
      // // console.log(responseData);
      Swal.fire({
        title: "Enter OTP from your Email",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Verify OTP",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(
            "https://jewellers-erp.onrender.com/verifyotp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email, otp: login }), // Send email and OTP as JSON data
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.text();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          setVerified(!verified);
          Swal.fire({
            title: "Your Email Id has been verified",
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isDisabled = Object.keys(errors).length > 0 || !verified;
  const onSubmit = async (data) => {
    const body = {
      ...data,
      email: email,
      designation: data.designation.value,
    };
    console.log(body);
    try {
      const response = await axios.post(
        "https://jewellers-erp.onrender.com/signup",
        // "https://jewellers-erp.onrender.com/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // const responseData = await response;
      if (response.status === 400) {
        const error = await response.text(); // initially it was response.json() but we are just sending a string not a json
        toastify({ msg: error.error, type: "error" });
      } else if (response.status === 200) {
        toastify({ msg: "Sign Up Successful", type: "success" });
        navigate("/auth/login");
      }
    } catch (error) {
      toastify({ msg: error, type: "error" });
      console.error("Error:", error);
    }
    reset();
  };
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : isAdmin ? (
        <>
          <h2
            className={`${darkTheme ? "text-white" : " text-dark"
              } p-5 text-center`}
          >
            Your account is already in our system. Please log in using the
            correct credentials. If you're an employee, kindly reach out to your
            administrator for assistance with your login details.
          </h2>
          <h3
            className={`${darkTheme ? "text-white" : " text-dark"
              } p-5 text-center`}
          >
            Thank you for choosing our services. We appreciate your trust in us
            and look forward to delivering outstanding results. Your
            satisfaction is our top priority, and we're committed to exceeding
            your expectations.
          </h3>
        </>
      ) : (
        <Col lg="6" md="8">
          <Card
            className={`${darkTheme ? "bg-dark-gray" : " bg-white "} border-0`}
          >
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h3 className={`${darkTheme ? "text-white" : " text-dark"} `}>
                  Sign up with credentials
                </h3>
              </div>
              {verified ? (
                <small className="text-success">
                  *Your Email Id is verified
                </small>
              ) : (
                ""
              )}
              <div className="row">
                <div className="col col-8">
                  <InputGroup className="mb-4 shadow">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      placeholder="Email"
                      errors={errors}
                      readOnly={verified}
                      onChange={handleChange}
                      value={email}
                    />
                  </InputGroup>
                </div>
                <div className="col col-4">
                  <button
                    className="btn btn-success"
                    disabled={verified}
                    onClick={() => verifyEmail()}
                  >
                    Verify Email
                  </button>
                </div>
              </div>

              <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  control={control}
                  name="organisationName"
                  placeholder="Organisation Name"
                  iconClassName="ni ni-building"
                  errors={errors}
                />
                <InputField
                  control={control}
                  name="address"
                  placeholder="Address"
                  iconClassName="ni ni-building"
                  errors={errors}
                />
                <InputField
                  control={control}
                  name="pincode"
                  placeholder="Pincode"
                  iconClassName="ni ni-building"
                  errors={errors}
                />
                <InputField
                  control={control}
                  name="name"
                  placeholder="Name"
                  iconClassName="ni ni-hat-3"
                  errors={errors}
                />
                <InputField
                  control={control}
                  name="mobile"
                  placeholder="Phone Number"
                  iconClassName="fa-solid fa-phone"
                  errors={errors}
                />
                <InputField
                  control={control}
                  name="gst"
                  placeholder="GST number"
                  iconClassName="ni ni-paper-diploma"
                  errors={errors}
                />
                <SelectField
                  control={control}
                  name="designation"
                  errors={errors}
                  placeholder="Designation"
                  iconClassName="fa-solid fa-user"
                />
                <InputField
                  control={control}
                  name="password"
                  placeholder="Password"
                  iconClassName="ni ni-lock-circle-open"
                  errors={errors}
                  isPassword={true}
                  type="password"
                />
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        {...register("customCheckRegister")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span
                          className={`${darkTheme ? "text-white" : " text-dark"
                            } text-muted`}
                        >
                          I agree with the Privacy Policy
                        </span>
                      </label>
                    </div>
                    {errors.customCheckRegister && (
                      <p className="error-message">
                        {errors.customCheckRegister.message}
                      </p>
                    )}
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    className="mt-4 bg-erp"
                    color="primary"
                    type="submit"
                    disabled={isDisabled}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      )}
    </>
  );
};

export default Register;
