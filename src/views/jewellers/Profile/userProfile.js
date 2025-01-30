// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import Avatar from "../../../assets/img/male-avatar.png";
import UserHeader from "components/Headers/UserHeader.js";
import { Controller, useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toastify } from "common/helpers/toast";
import axios from "axios";
import InputField from "common/fields/input-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "common/validation_schema";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import Loader from "common/loader/loader";
import useProfileImage from "common/customHooks/useProfileImage";
const UserProfile = () => {
  const { imageUrl, error } = useProfileImage();
  if (error) {
    toastify({ msg: error, type: "danger" });
  }
  let sessionId;
  let tokenData;
  if (localStorage.getItem("userDetail")) {
    sessionId = jwtDecode(localStorage.getItem("userDetail")).foundUser
      .sessionId;
    tokenData = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const { darkTheme } = useContext(ThemeContext);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const defaultValues = {
    mobile: tokenData?.mobile || "",
    email: tokenData?.email || "",
    name: tokenData?.name || "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await axios.post(
          `https://jewellers-erp.onrender.com/users/fetchOne`,
          { sessionId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUser(fetchedUser.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call fetchData function immediately
    // eslint-disable-next-line
  }, []);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(changePassword),
    defaultValues,
  });
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    setImages(files);
  };
  const isDisabled = Object.keys(errors).length > 0;

  const onSubmit = async (body) => {
    console.log("password changedata", body);
    try {
      const response = await axios.post(
        "https://jewellers-erp.onrender.com/users/resetPassword",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 400) {
        const error = await response.text();
        toastify({ msg: error, type: "error" });
      } else if (response.status === 200) {
        const message = await response.data;
        console.log("message200", message);
        toastify({ msg: "Password Reset Successful", type: "success" });
      }
    } catch (error) {
      console.log("error11", error.message);
      toastify({ msg: error.response.data, type: "error" }); //you have to check here
      console.log("Error:", error.response.data);
      window.location = "/admin/userProfile";
    }
    reset();
  };

  const editProfile = async () => {
    const formData = new FormData();

    formData.append("profileImage", images);
    formData.append("sessionId", user.sessionId);

    console.log(formData);
    try {
      await axios
        .post(
          `https://aestraswift.ocpl.tech/jewellers/uploadProfilePicture`,
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
          window.location = "/admin/userprofile";
        })
        .catch((error) => {
          toastify({ msg: error.response.data, type: "error" });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <UserHeader />
      {/* Page content */}
      {imageUrl || user ? (
        <Container className="mt-4" fluid>
          <div className="d-flex justify-content-center">
            <div className="col-lg-6 col-sm-10 col-12">
              <Card
                className={`${
                  darkTheme ? "bg-dark-gray " : " shadow  bg-white"
                } card-profile `}
              >
                <CardBody className="pt-0   ">
                  <div className="align-items-center d-flex justify-content-center">
                    <img
                      src={imageUrl ? imageUrl : Avatar}
                      style={{
                        borderRadius: "50%",
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      className="mb-3"
                      alt="profile"
                    ></img>
                  </div>
                  <div className="text-center">
                    <h3
                      className={`${
                        darkTheme ? "text-white " : "   text-dark"
                      }`}
                    >
                      {user.email}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    {/* <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div> */}
                    <div
                      className={`${
                        darkTheme ? "text-white " : "   text-dark"
                      } h5 mt-4`}
                    >
                      <i className="ni business_briefcase-24 mr-2" />
                      {user.designation ? user.designation : "Admin"}
                    </div>
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <Button
                      color="primary"
                      className="bg-erp px-4"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                      size="sm"
                    >
                      Edit
                    </Button>
                    {/* <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="mt-4 col-lg-6 col-sm-10 col-12">
              <Card
                className={`${
                  darkTheme ? "bg-dark-gray " : " shadow  bg-white"
                } card-profile `}
              >
                <CardHeader className="bg-transparent border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3
                        className={`${
                          darkTheme ? "text-white " : "   text-dark"
                        } mb-0`}
                      >
                        My account
                      </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6
                    className={`${
                      darkTheme ? "text-white " : "   text-dark"
                    } heading-small text-muted mb-4`}
                  >
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className={`${
                              darkTheme ? " text-white" : " text-dark"
                            } form-control-label`}
                          >
                            Mobile
                          </label>
                          <Controller
                            name="mobile"
                            control={control}
                            defaultValue={user?.mobile || ""}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className={`${
                              darkTheme ? " text-white" : " text-dark"
                            } form-control-label`}
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Controller
                            name="email"
                            control={control}
                            defaultValue={user?.email}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className={`${
                              darkTheme ? " text-white" : " text-dark"
                            } form-control-label`}
                            htmlFor="input-first-name"
                          >
                            Name
                          </label>
                          <Controller
                            name="name"
                            control={control}
                            defaultValue={user?.name}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6
                    className={`${
                      darkTheme ? "text-white " : "   text-dark"
                    } heading-small text-muted mb-4`}
                  >
                    Admin Privelege
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        {/* {user?.admin === true ? ( */}
                        {user?.privileges?.[0] ? (
                          <>
                            {" "}
                            <AiFillCheckCircle color="green" size="30px" /> Yes
                          </>
                        ) : (
                          <>
                            <AiFillCloseCircle color="red" size="30px" /> No{" "}
                          </>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6
                    className={`${
                      darkTheme ? "text-white " : "   text-dark"
                    } heading-small text-muted mb-4`}
                  >
                    Change Password
                  </h6>
                  <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <label
                            className={`${
                              darkTheme ? " text-white" : " text-dark"
                            } form-control-label`}
                          >
                            Current password
                          </label>
                          <InputField
                            control={control}
                            name="currentPassword"
                            placeholder="Enter current password"
                            iconClassName="ni ni-key-25"
                            errors={errors}
                            isPassword={true}
                            type="password"
                          />
                        </Col>
                        <Col md="6">
                          <label
                            className={`${
                              darkTheme ? " text-white" : " text-dark"
                            } form-control-label`}
                          >
                            New password
                          </label>
                          <InputField
                            control={control}
                            name="newPassword"
                            placeholder="Enter new password"
                            iconClassName="ni ni-key-25"
                            errors={errors}
                            isPassword={true}
                            type="password"
                          />
                        </Col>
                      </Row>
                      <label
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Confirm password
                      </label>
                      <InputField
                        control={control}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        iconClassName="ni ni-key-25"
                        errors={errors}
                        isPassword={true}
                        type="password"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="mr-4 bg-erp"
                        color="primary"
                        type="submit"
                        size="md"
                        disabled={isDisabled}
                      >
                        Change Password
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </div>

          <Modal isOpen={modal} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Select an Image</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <label
                        htmlFor="imageURL"
                        className={`${
                          darkTheme ? " text-white" : " text-dark"
                        } form-control-label`}
                      >
                        Image:
                      </label>
                      <input
                        id="imageURL"
                        className="form-control"
                        type="file"
                        // value={isProduct.imageURL}
                        onChange={handleImageChange}
                      />
                      {/* {validationErrors.imageURL && (
                      <p className="text-danger">{validationErrors.imageURL}</p>
                    )} */}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  editProfile();
                  closeModal();
                }}
              >
                Save
              </Button>
              <Button color="secondary" onClick={closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserProfile;
