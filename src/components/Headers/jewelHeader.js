// import { helpersDesc } from "common/constant/constant";
// import { helpersLabel } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import { toastify } from "common/helpers/toast";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardHeader,
} from "reactstrap";

const JewelHeader = ({ label, desc }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedItem, setSelectedItem] = useState(label ? label[0] : null);
  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/revenue/totalRevenue",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const message = await response.text();
        if (message.includes("Failed to parse number 'Define In CRM'")) {
          return toastify({
            msg: "Something went wrong! Please define the values properly in CRM",
            type: "error",
          });
        }
        // toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        // // console.log(data);
        setTotalRevenue(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const fetchTotalExpense = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/revenue/totalExpense",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        const message = await response.text();
        if (message.includes("Failed to parse number 'Define In CRM'")) {
          return toastify({
            msg: "Something went wrong! Please define the values properly in CRM",
            type: "error",
          });
        }
        // toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        // // console.log(data);
        setTotalExpense(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    fetchTotalRevenue();
    fetchTotalExpense();
  }, []);
  return (
    <>
      <div
        className={`${darkTheme ? "bg-darker" : "bg-gray"
          } header pb-3 pt-2 pt-md-3`}
      >
        <Container fluid>
          {pathname === "/admin/jewelDashboard" && (
            <div className="mb-5">
              <Row>
                <Col xl="12">
                  <Card
                    className={`${darkTheme ? "bg-dark-gray" : "bg-white"}`}
                  >
                    <CardHeader
                      className={`${darkTheme ? "text-white" : "text-dark"
                        } bg-transparent`}
                    >
                      <h2
                        className={`${darkTheme ? "text-white" : "text-dark"}`}
                      >
                        Let's begin your journey with AESTRA
                      </h2>
                      Item, Customer, Supplier and Quotation
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col lg="4">
                          <ul className="list-unstyled">
                            {label.map((cur, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`p-2 cursor ${cur === selectedItem
                                    ? "bg-secondary rounded"
                                    : ""
                                    } ${darkTheme
                                      ? cur === selectedItem
                                        ? "text-dark"
                                        : "text-white"
                                      : "text-dark"
                                    }`}
                                  onClick={() => setSelectedItem(cur)}
                                >{`${cur.sno}. ${cur.label}`}</li>
                              );
                            })}
                          </ul>
                        </Col>
                        <Col lg="8">
                          {desc.map((cur) => {
                            return (
                              <div
                                key={cur.sno}
                                style={{
                                  display:
                                    cur.sno === selectedItem.sno
                                      ? "block"
                                      : "none",
                                }}
                              >
                                <h2
                                  className={`${darkTheme ? " text-white" : " text-dark"
                                    }`}
                                >
                                  {cur.title}
                                </h2>
                                <p>{cur.desc}</p>
                                <Link
                                  to={cur.href}
                                  className="btn btn-primary bg-erp"
                                >
                                  {cur.button}
                                </Link>
                              </div>
                            );
                          })}
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card
                  className={`${darkTheme ? "bg-dark-gray" : "bg-white"
                    } card-stats mb-4 mb-xl-0`}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className={`${darkTheme ? "text-white" : "text-dark"
                            } text-uppercase text-muted mb-0`}
                        >
                          Revenue
                        </CardTitle>
                        <span
                          className={`${darkTheme ? "text-white" : "text-dark"
                            } h2 font-weight-extra-bold mb-0`}
                        >
                          {totalRevenue}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card
                  className={`${darkTheme ? "bg-dark-gray" : "bg-white"
                    } card-stats mb-4 mb-xl-0`}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className={`${darkTheme ? "text-white" : "text-dark"
                            } text-uppercase text-muted mb-0`}
                        >
                          Profit
                        </CardTitle>
                        <span
                          className={`${darkTheme ? "text-white" : "text-dark"
                            } h2 font-weight-extra-bold mb-0`}
                        >
                          {totalRevenue - totalExpense}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card
                  className={`${darkTheme ? "bg-dark-gray" : "bg-white"
                    } card-stats mb-4 mb-xl-0`}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className={`${darkTheme ? "text-white" : "text-dark"
                            } text-uppercase text-muted mb-0`}
                        >
                          Expenses
                        </CardTitle>
                        <span
                          className={`${darkTheme ? "text-white" : "text-dark"
                            } h2 font-weight-extra-bold mb-0`}
                        >
                          {totalExpense}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="6" xl="3">
                <Card  className={`${darkTheme ? "bg-dark-gray" : "bg-white"} card-stats mb-4 mb-xl-0`}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className={`${darkTheme ? "text-white" : "text-dark"} text-uppercase text-muted mb-0`}
                        >
                          Performance
                        </CardTitle>
                        <span  className={`${darkTheme ? "text-white" : "text-dark"} h2 font-weight-extra-bold mb-0`}>
                          49,65%
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-red text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 11%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default JewelHeader;
