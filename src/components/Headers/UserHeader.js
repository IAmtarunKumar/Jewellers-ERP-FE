import { Container, Row, Col } from "reactstrap";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toastify } from "common/helpers/toast";
import Loader from "common/loader/loader";
import axios from "axios";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const UserHeader = () => {
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(true);
  const { darkTheme } = useContext(ThemeContext);

  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://aestraswift.ocpl.tech/jewellers/profileSummary",
        { designation: user?.designation }, //it is commented because it will else drive unneccessary openai calls
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const message = await response.text();
        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;
        // console.log(data);
        setSummary(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        className="header pb-3 pt-5 pt-lg-3 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        {/* <span className="mask " />   */}
        {/* Header container */}
        <Container className="d-flex align-items-center mb-5">
          {/* <Row> */}
          <div className="d-flex flex-column">
            <p
              className={`${
                darkTheme ? "text-white " : "   text-dark"
              } display-2`}
            >
              Hello , {user?.name}
            </p>
            {loading ? (
              <Loader />
            ) : (
              <Col md="6" className="p-0">
                <p
                  className={`${
                    darkTheme ? "text-white " : "   text-dark"
                  } mt-0 mb-5`}
                >
                  {summary}
                </p>
              </Col>
            )}
          </div>
          {/* </Row> */}
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
