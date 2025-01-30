// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

// import useEmpDetails from "common/customHooks/useEmpDeatils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toastify } from "common/helpers/toast";
import jwtDecode from "jwt-decode";

const Profile = () => {
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const userId = user.sessionId;
  const [placeholder, setPlaceholder] = useState("Loading...");
  // // console.log(user);
  const defaultValues = {
    mobile: user?.mobile || "",
    email: user?.email || "",
    name: user?.name || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    postalCode: user?.postalCode || "",
    aboutMe: user?.aboutMe || "",
  };

  const { handleSubmit, control } = useForm({ defaultValues });
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // const saveProfile = async (data) => {
  //   // // console.log(data);
  //   try {
  //     const response = await fetch(
  //       `https://jewellers-erp.onrender.com/users/${userId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );

  //     if (response.ok) {
  //       // const updatedUser = await response.json();
  //       // localStorage.setItem("userDetail", JSON.stringify(updatedUser));
  //       toastify({ msg: "Your Profile is Updated! Please Login Again to view updated details", type: "success" });
  //       setIsEditing(false);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);

  //   }
  // };
  // useEffect(() => {
  //   async function fetchPlaceholder() {
  //     try {
  //       const response = await fetch("https://jewellers-erp.onrender.com/brief", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ designation: user.designation }),
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.text();
  //       setPlaceholder(
  //         `Hello ${user.name} you are ${user.designation} you can write something like this in about me. \n ${data}`
  //       );
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  //   fetchPlaceholder();
  // }, [user.designation, user.name]);
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div className="d-flex justify-content-center">
          <div className="col-4">
            <Card className="card-profile shadow">
              <CardBody className="pt-0   ">
                <div className="text-center">
                  <h3>
                    {user.email}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                  {/* <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div> */}
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user.designation}
                  </div>
                  {/* <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div> */}
                  <hr className="my-4" />
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
          <div className="mt-4 col-8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(true);
                      }}
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit(saveProfile)}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}>Mobile</label>
                          <Controller
                            name="mobile"
                            control={control}
                            // defaultValue={user?.mobile || ""}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Controller
                            name="email"
                            control={control}
                            // defaultValue={user?.email}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
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
                            className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}
                            htmlFor="input-first-name"
                          >
                            Name
                          </label>
                          <Controller
                            name="name"
                            control={control}
                            // defaultValue={user?.name}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Controller
                            name="address"
                            control={control}
                            // defaultValue={user?.address}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Controller
                            name="city"
                            control={control}
                            // defaultValue={user?.city}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Controller
                            name="country"
                            control={control}
                            // defaultValue={user?.country}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className={`${darkTheme ? " text-white" : " text-dark"} form-control-label`}
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Controller
                            name="postalCode"
                            control={control}
                            // defaultValue={user?.postalCode}
                            render={({ field }) => (
                              <Input
                                {...field}
                                readOnly={!isEditing}
                                className="form-control-alternative"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Controller
                        name="aboutMe"
                        control={control}
                        // defaultValue={user?.aboutMe}
                        render={({ field }) => (
                          <Input
                            {...field}
                            readOnly={!isEditing}
                            rows="12"
                            type="textarea"
                            className="form-control-alternative"
                            placeholder={placeholder}
                          />
                        )}
                      />
                    </FormGroup>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="mr-4 "
                      color="info"
                      type="submit"
                      size="md"
                      disabled={!isEditing}
                    >
                      Save your Profile
                    </Button>
                  </div>
                </Form>

                {error && <p>{error}</p>}
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
