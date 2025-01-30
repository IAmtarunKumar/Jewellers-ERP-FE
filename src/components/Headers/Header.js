// reactstrap components
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const revenue = 200000;
  const [pending, setPending] = useState(true);

  const { data } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",
    pending,
    setPending
  );
  const [expenseData, setExpenseData] = useState(0);
  let totalAmount = 0;
  async function calculateTotalExpenses(data) {
    const filteredData = data.filter((item) => item.ability !== "HR_ABILITY");

    for (const user of filteredData) {
      for (const expense of user.expenses) {
        if (!expense.date || isNaN(new Date(expense.date).getTime())) {
          // console.warn(`Invalid date format for expense: ${expense.date}`);
          continue;
        }
        totalAmount += expense.amount;
      }
    }
    return setExpenseData(totalAmount);
  }
  useEffect(() => {
    async function fetchData() {
      calculateTotalExpenses(data);
    }
    fetchData();
    // eslint-disable-next-line
  }, [data]);
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
                          Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {revenue}
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
                          Profit
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {revenue - expenseData}
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
                          Expenses
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {expenseData}
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
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    // <p className="mt-3 mb-0 text-muted text-sm">
                    //   <span className="text-success mr-2">
                    //     <i className="fas fa-arrow-up" /> 12%
                    //   </span>{" "}
                    //   <span className="text-nowrap">Since last month</span>
                    // </p>
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

export default Header;
