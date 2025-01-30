import { useEffect, useState } from "react";

import { Bar, Line } from "react-chartjs-2";
import React from "react";
// reactstrap components
import {

  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";


import Header from "components/Headers/Header.js";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { allEmpColumns } from "common/constant/constant";
import DataTable from "react-data-table-component";

const CeoDashboard = (props) => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  // const [activeNav, setActiveNav] = useState(1);
  // const [chartExample1Data, setChartExample1Data] = useState([]);
  const { data } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",
    pending,
    setPending
  );
  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  // const toggleNavs = (e, index) => {
  //   e.preventDefault();
  //   setActiveNav(index);
  //   setChartExample1Data("data" + index);
  // };
  async function calculateTotalExpensesByMonth(data) {
    // // console.log("data",data)
    const monthlyExpenses = {};
    const filteredData = data.filter(item => item.ability !== "HR_ABILITY");
    for (const user of filteredData) {
      for (const expense of user.expenses) {
        if (!expense.date || isNaN(new Date(expense.date).getTime())) {
          // console.warn(`Invalid date format for expense: ${expense.date}`);
          continue;
        }
        const expenseDate = new Date(expense.date);
        const yearMonth = expenseDate.toISOString().slice(0, 7); // Get year and month in 'YYYY-MM' format
        if (!monthlyExpenses[yearMonth]) {
          monthlyExpenses[yearMonth] = 0;
        }
        monthlyExpenses[yearMonth] += expense.amount;
      }
    }
    return monthlyExpenses;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const totalExpensesByMonth = await calculateTotalExpensesByMonth(data);
        const chartData = {
          labels: Object.keys(totalExpensesByMonth).map((label) =>
            getMonthName(label)
          ),
          datasets: [
            {
              label: "First dataset",
              data: Object.values(totalExpensesByMonth),
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        };
        const chartData2 = {
          labels: Object.keys(totalExpensesByMonth).map((label) =>
            getMonthName(label)
          ),
          datasets: [
            {
              label: "First dataset",
              data: Object.values(totalExpensesByMonth),
              fill: true,
              backgroundColor: "cyan",
              borderColor: "cyan",
            },
          ],
        };
        setChartData(chartData);
        setChartData2(chartData2);
        setPending(false); // Mark data fetching as completed
      } catch (error) {
        console.error("Error occurred:", error);
        setPending(false); // Mark data fetching as completed even if there's an error
      }
    }

    fetchData();
    // console.log(chartData);
  }, [data]);

  const getMonthName = (label) => {
    const date = new Date(label);

    return date.toLocaleString("default", { month: "long" });
  };
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Expense value</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                {chartData && <Line data={chartData} />}

                {/* <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => // console.log(e)}
                  />
                </div> */}
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow bg-gradient-success">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total Expense</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {/* <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  /> */}
                  {chartData && <Bar data={chartData2} />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Employee Info</h3>
                  </div>
                </Row>
              </CardHeader>

              <DataTable
                columns={allEmpColumns}
                data={data}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CeoDashboard;
