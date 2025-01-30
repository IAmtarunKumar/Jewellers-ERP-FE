import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,

  // UncontrolledTooltip,
} from "reactstrap";
import DataTable from "react-data-table-component";
// core components
import MarketingHeader from "components/Headers/marketingHeader";

const MarketingReport = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [marketingReport, setMarketingReport] = useState([]);

  const marketingTableColumns = () => [
    {
      name: "Date",
      selector: (row) => formatDate(row[0]),
    },
    {
      name: "Country",
      selector: (row) => row[1],
    },
    {
      name: "City",
      selector: (row) => row[2],
    },
  ];

  function formatDate(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${day}-${month}-${year}`;
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
          date_range1: ["2023-07-01", "2023-07-26"],
          date_range2: ["2023-06-01", "2023-07-30"],
        }),
      });
      const data = await response.json();
      // console.log(data);
      setMarketingReport(data.rows);
      setPending(false);
      // // console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPending(false);
    }
  }
  useEffect(() => {
    getMarketingReport();
  }, []);
  return (
    <>
      <MarketingHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Marketing Report</h3>
              </CardHeader>
              <DataTable
                columns={marketingTableColumns()}
                data={marketingReport}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MarketingReport;
