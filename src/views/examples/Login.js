// reactstrap components
import InputField from "common/fields/input-field";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, Form, Row, Col } from "reactstrap";
import { loginSchema } from "common/validation_schema";
import { toastify } from "common/helpers/toast";
import axios from "axios";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const isDisabled = Object.keys(errors).length > 0;
  const onSubmit = async (data) => {
    // console.log("data", data)
    try {
      // https://jewellers-erp.onrender.com/login 
      const response = await axios.post(
        "https://jewellers-erp.onrender.com/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      // console.log("response", response)


      if (response.data.token) {
        localStorage.setItem("userDetail", response.data.token);
      }

      if (response.data.overdueTasks && response.data.overdueTasks.length > 0) {
        localStorage.setItem("overdueTasks", response.data.overdueTasks);
      }
      toastify({ msg: "Login Successfully !", type: "success" });

      // navigate("/admin/jewelDashboard"); //sidebar is not getting refreshed so we have to window.location here hard refresh
      window.location = "/admin/jewelDashboard"
    } catch (error) {
      console.error("Error:", error);
      toastify({ msg: error.response.data.error, type: "error" });
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className={`${darkTheme ? "bg-dark-gray" : " bg-white "} border-0`}>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3 className={`${darkTheme ? "text-white" : " text-dark"} `}>Sign in with credentials</h3>
            </div>
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="email"
                placeholder="Email"
                iconClassName="ni ni-email-83"
                errors={errors}
              />
              <InputField
                control={control}
                name="password"
                placeholder="Password"
                type="password"
                iconClassName="ni ni-lock-circle-open"
                isPassword={true}
                errors={errors}
              />
              <div className="text-center">
                <Button
                  className="my-4 bg-erp"
                  color="primary"
                  type="submit"
                  disabled={isDisabled}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small className={`${darkTheme ? "text-white" : " text-dark"} `}>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link
              className="text-light"
              to="/auth/register"
            // onClick={(e) => e.preventDefault()}
            >
              <small className={`${darkTheme ? "text-white" : " text-dark"} `}>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
