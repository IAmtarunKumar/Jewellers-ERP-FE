import { useEffect, useState } from "react";
import { ReviewContext } from "common/context/reviewContext";
import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import "./empDashboard.scss";
import jwtDecode from "jwt-decode";
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { allEmpColumns } from "common/constant/constant";
import DataTable from "react-data-table-component";
import EmpHeader from "components/Headers/empHeader";
import { Ability } from "@casl/ability";
import { abilities } from "common/constant/constant";
import LongNameFormatter from "components/common/longName";
const EMPDashboard = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [meeting, setMeeting] = useState([]);
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const roleAbilities = abilities[user.ability] || [];
  const ability = new Ability(roleAbilities);
  const { data } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",
    pending,
    setPending
  );
  const emp = data.filter((curEmp) => curEmp.ability === "EMP_ABILITY");
  const { review, fetchReview } = React.useContext(ReviewContext);
  useEffect(() => {
    fetchReview(user.email);
    // eslint-disable-next-line
  }, [user.email]);
  const points = review ? review.split(/\d+\./).slice(1) : [];
  const meetingsTableColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
      cell: (row) => (
        <LongNameFormatter content={row.title} max={30} id={row._id} />
      ),
    },
    {
      name: "With",
      selector: (row) => row.names,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.start.dateTime).toLocaleDateString(),
    },
    {
      name: "Start Time",
      selector: (row) => new Date(row.start.dateTime).toLocaleTimeString(),
    },
    {
      name: "End Time",
      selector: (row) => new Date(row.end.dateTime).toLocaleTimeString(),
    },
    ability.can("manage", "Meetings") && {
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        return (
          <div>
            <a href={row.link} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-success p-2">Join</button>
            </a>
          </div>
        );
      },
    },
  ];
  const meetingInfo = async () => {
    const meetings = await fetch("https://jewellers-erp.onrender.com/fetchCalendarId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calendarId: user.calendarId }),
    });
    const meetingsData = await meetings.json();
    setMeeting(meetingsData);
    setPending(false);
  };
  useEffect(() => {
    //eslint-disable-next-line
    meetingInfo();
    //eslint-disable-next-line
  }, [user.calendarId]);
  return (
    <>
      <EmpHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0 bg-gradient-default shadow" xl="8" >
            <Card className="bg-gradient-default">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">Your meetings for today</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody >
                <Row >
                  <div className="col">
                    <Card className="bg-default shadow">
                      <DataTable
                        columns={meetingsTableColumns}
                        data={meeting}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle}
                        progressPending={pending}
                      />
                    </Card>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow bg-gradient-success">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0 text-white">
                      What other employee say about you
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="scrollable-container">
                  {points.length ? (
                    <div className="text-white">
                      {points.slice(0, 5).map((point, index) => {
                        const [title, ...content] = point.split(":");
                        return (
                          <div key={index} className="mb-3">
                            <div className="text-white h4 fw-bold">
                              {index + 1}. {title.trim()}:
                            </div>
                            <div className="text-white ">
                              {content.join(":").trim()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-white">Fetching your review...</p>
                  )}
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
                    <h3 className="mb-0">Your Team Members</h3>
                  </div>
                </Row>
              </CardHeader>
              <DataTable
                columns={allEmpColumns}
                data={emp}
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
export default EMPDashboard;