// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";

const MarketingHeader = () => {
  const [marketingReport, setMarketingReport] = useState([]);
  const [realTimeData, setRealTimeData] = useState([]);
  const { pathname } = useLocation();


  function mostFrequentCity(rows, isRealTimeData) {
    let cityCounts = {};
    let countryCounts = {};
    for (let i = 0; i < rows.length; i++) {
      let cityName = isRealTimeData ? rows[i][2] : rows[i][2];
      let countryName = isRealTimeData ? rows[i][0] : rows[i][1];

      if (!cityCounts.hasOwnProperty(cityName)) {
        cityCounts[cityName] = 1;
      } else {
        cityCounts[cityName]++;
      }

      if (!countryCounts.hasOwnProperty(countryName)) {
        countryCounts[countryName] = 1;
      } else {
        countryCounts[countryName]++;
      }
    }

    let maxCount = 0;
    let maxCity = "";
    let maxCountryCount = 0;
    let maxCountry = "";

    for (let city in cityCounts) {
      if (cityCounts[city] > maxCount) {
        maxCount = cityCounts[city];
        maxCity = city;
      }
    }
    for (let country in countryCounts) {
      if (countryCounts[country] > maxCountryCount) {
        maxCountryCount = countryCounts[country];
        maxCountry = country;
      }
    }

    return {
      city: maxCity,
      cityCount: maxCount,
      country: maxCountry,
      countryCount: maxCountryCount,
    };
  }

  let mostFrequent =
    pathname === "/admin/realTimeData"
      ? mostFrequentCity(realTimeData, true)
      : pathname === "/admin/marketingReport"
      ? mostFrequentCity(marketingReport, false)
      : "";

  // // console.log(mostFrequent);

  async function getRealTimeData() {
    try {
      const response = await fetch("https://chat1.ocpl.tech:12003/realtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dimensions: ["country", "deviceCategory", "city"],
          metrics: ["activeUsers"],
          row_limit: 10,
          quota_usage: true,
        }),
      });
      const data = await response.json();
      setRealTimeData(data.rows);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getMarketingReport() {
    try {
      const response = await fetch("https://chat1.ocpl.tech:12003/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dimension_list: ["date", "country", "city"],
          metric_list: ["totalUsers", "activeUsers"],
          date_range1: ["2023-07-01", "2023-07-25"],
          date_range2: ["2023-06-01", "2023-07-30"],
        }),
      });
      const data = await response.json();
      setMarketingReport(data.rows);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    getRealTimeData();
    getMarketingReport();
  }, [pathname]);

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
                          Total Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {pathname === "/admin/realTimeData"
                            ? realTimeData.length
                            : pathname === "/admin/marketingReport"
                            ? marketingReport.length
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
                          Country
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {marketingReport
                            ? `${mostFrequent.country} (${mostFrequent.countryCount})`
                            : "0"}
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
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          City
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {marketingReport
                            ? `${mostFrequent.city} (${mostFrequent.cityCount})`
                            : "0"}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
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

export default MarketingHeader;
