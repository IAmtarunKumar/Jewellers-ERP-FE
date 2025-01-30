import { useContext, useEffect, useState } from "react";

import { Bar, Line, Pie } from "react-chartjs-2";
import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import Header from "components/Headers/jewelHeader";
import DataTable from "react-data-table-component";
import { StyledHeader } from "common/constant/constant";
import { toastify } from "common/helpers/toast";
import { helpersLabel } from "common/constant/constant";
import { helpersDesc } from "common/constant/constant";
import { ThemeContext } from "common/context/themeContext";
import { darkThemeStyles } from "components/common/DatatableView/themeMode";
import { lightThemeStyles } from "components/common/DatatableView/themeMode";

const JewelDashboard = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [chartData3, setChartData3] = useState(null);
  const [dayWiseSales, setDayWiseSales] = useState(null);
  const [bestSellers, setBestSellers] = useState(null);
  const [isFinancial, setIsFinancial] = useState(null);
  const [timeFrame, setTimeFrame] = useState("Monthly");
  const [chartDataQuarterly, setChartDataQuarterly] = useState(null);
  const [chartDataYearly, setChartDataYearly] = useState(null);
  const { darkTheme } = useContext(ThemeContext);

  const columns = [
    {
      name: <StyledHeader>Id</StyledHeader>,
      selector: (row) => row.sessionId,
      sortable: true,
    },
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Email</StyledHeader>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <StyledHeader>Mobile</StyledHeader>,
      selector: (row) => row.mobile,
      sortable: true,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/users/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const message = await response.text();
        // toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        setTableData(data);
        setPending(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/chart/monthlySales",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const message = await response.text();
        // toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        // console.log("monthly", data);
        setDayWiseSales(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchQuaterlySales = async () => {
    // console.log("clicked");
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/chart/quarterlySales",
        {
          method: "GET",
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
        const data = await response.json();
        const chartDataQuarterlyProcessed = await processDataForQuarterly(data);
        setChartDataQuarterly(chartDataQuarterlyProcessed);
        // console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchYearlySales = async () => {
    // console.log("clicked");
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/chart/yearlySales",
        {
          method: "GET",
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
        const data = await response.json();
        const chartDataYearlyProcessed = await processDataForYearly(data);
        setChartDataYearly(chartDataYearlyProcessed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchChartData2 = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/chart/monthlyProductSales",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        const message = await response.text();
        // toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        // console.log(data, "piehcart");
        setBestSellers(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchChartData3 = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/revenue/allyearly",
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
        setIsFinancial(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processDataForQuarterly = (data) => {
    const processed = {
      labels: data?.map((entry) => entry.weekStartDate.split("T")[0]),
      datasets: [
        {
          label: "Quarterly Sales",
          data: data.map((entry) => entry.totalItemsSold),
          backgroundColor: "#acebfd",
          borderColor: "#17a5ce",
          fill: true,
        },
      ],
    };
    return processed;
  };

  const processDataForYearly = (data) => {
    const processed = {
      labels: data?.map((entry) => entry.month),
      datasets: [
        {
          label: "Total Items Sold",
          data: data.map((entry) => entry.totalItemsSold),
          backgroundColor: "#acebfd",
          borderColor: "#17a5ce",
          fill: true,
        },
      ],
    };
    return processed;
  };

  useEffect(() => {
    fetchData();
    fetchChartData();
    fetchChartData2();
    fetchChartData3();
  }, []);

  useEffect(() => {
    try {
      const chartDates = dayWiseSales?.map((entry) => entry.saleDate);
      const chartSales = dayWiseSales?.map((entry) => entry.totalItemsSold);
      const soldProducts = bestSellers?.map((entry) => entry.productName);
      const soldQuantity = bestSellers?.map((entry) => entry.totalItemsSold);
      const profit = isFinancial?.map((entry) => entry.totalProfit ?? 0) ?? [];
      const expense =
        isFinancial?.map((entry) => entry.totalExpense ?? 0) ?? [];
      const revenue = isFinancial?.map((entry) => entry.totalSale ?? 0) ?? [];

      const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const chartData = {
        labels: chartDates,
        datasets: [
          {
            label: "Daily Sales",
            data: chartSales,
            fill: true,
            backgroundColor: "#acebfd",
            borderColor: "#17a5ce",
          },
        ],
      };
      const chartData2 = {
        labels,
        datasets: [
          {
            type: "line",
            label: "Profit",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            fill: false,
            data: profit,
          },
          {
            type: "bar",
            label: "Expense",
            backgroundColor: "red",
            data: expense,
            // borderColor: "white",
            // borderWidth: 2,
          },
          {
            type: "bar",
            label: "Revenue",
            backgroundColor: "rgb(53, 162, 235)",
            data: revenue,
          },
        ],
      };
      const chartData3 = {
        labels: soldProducts,
        datasets: [
          {
            label: "Bestsellers",
            data: soldQuantity,
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartData);
      setChartData2(chartData2);
      setChartData3(chartData3);
      setPending(false);
    } catch (error) {
      console.error("Error occurred:", error);
      setPending(false);
    }
  }, [dayWiseSales, bestSellers, isFinancial]);

  return (
    <>
      <Header label={helpersLabel} desc={helpersDesc} />
      {/* Page content */}
      <Container className="" fluid>
        <Row className="mt-3">
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card
              className={`${darkTheme ? "bg-dark-gray" : " bg-white "} shadow`}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center justify-content-between d-flex">
                  <div className="col">
                    <h6
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } ls-1 mb-1 text-uppercase `}
                    >
                      Overview
                    </h6>
                    <h2
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } mb-0 `}
                    >
                      Sales
                    </h2>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        fetchChartData();
                        setTimeFrame("Monthly");
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        fetchQuaterlySales();
                        setTimeFrame("Quarterly");
                      }}
                    >
                      Quarterly
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        fetchYearlySales();
                        setTimeFrame("Yearly");
                      }}
                    >
                      Yearly
                    </button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {timeFrame === "Monthly" && chartData && (
                  <Line data={chartData} />
                )}
                {timeFrame === "Quarterly" && chartDataQuarterly && (
                  <Line data={chartDataQuarterly} />
                )}
                {timeFrame === "Yearly" && chartDataYearly && (
                  <Line data={chartDataYearly} />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card
              className={`${darkTheme ? "bg-dark-gray" : " bg-white "} shadow`}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } ls-1 mb-1 text-uppercase `}
                    >
                      Performance
                    </h6>
                    <h2
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } mb-0 `}
                    >
                      Earnings
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                {chartData ? (
                  <Bar data={chartData2} />
                ) : (
                  <p className="text-center">No Data Yet</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl="6">
            <Card
              className={`${darkTheme ? "bg-dark-gray" : " bg-white "} shadow`}
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } ls-1 mb-1 text-uppercase `}
                    >
                      Insights
                    </h6>
                    <h2
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } mb-0 `}
                    >
                      Products
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                {bestSellers?.length < 0 ? (
                  <Pie data={chartData3} />
                ) : (
                  <p className="text-center">No Data Yet</p>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col className="my-5 my-xl-0" xl="6 ">
            <Card
              className={`${darkTheme ? "bg-dark-gray" : " bg-white "} shadow`}
            >
              <CardHeader className="border-0 bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3
                      className={`${
                        darkTheme ? "text-white" : " text-dark "
                      } mb-0 `}
                    >
                      Employee Details
                    </h3>
                  </div>
                </Row>
              </CardHeader>

              <DataTable
                customStyles={darkTheme ? darkThemeStyles : lightThemeStyles}
                columns={columns}
                data={tableData}
                defaultSortFieldId={5}
                defaultSortAsc={false}
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

export default JewelDashboard;
