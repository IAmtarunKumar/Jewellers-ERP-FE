// reactstrap components
import useEmpDetails from "common/customHooks/useEmpDeatils";

import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const EmpHeader = () => {
  // const user = JSON.parse(Cookies.get("userDetail"));
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  // // console.log("user", user);
  const [completedTask, setCompletedTask] = useState(0);
  const [inProgressTask, setInProgressTask] = useState(0);

  const [empData] = useEmpDetails(
    `https://jewellers-erp.onrender.com/users/${user.sessionId}`
  );

  useEffect(() => {
    let completed = 0;
    let inProgress = 0;
    if (empData.assignedToYou) {
      empData.assignedToYou.forEach((task) => {
        if (task.status === "Completed") {
          completed += 1;
        } else if (task.status === "In Progress") {
          inProgress += 1;
        }
      });
    }

    setCompletedTask(completed);
    setInProgressTask(inProgress);
  }, [empData.assignedToYou]);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Task
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {empData.assignedToYou
                            ? empData.assignedToYou.length
                            : "0"}
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
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Task Completed
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {completedTask}
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
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Task In Progess
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {inProgressTask}
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
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EmpHeader;
