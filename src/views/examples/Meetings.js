// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

// core components
import Header from "components/Headers/Header.js";
import { Ability } from "@casl/ability";

import { abilities } from "common/constant/constant";
import jwtDecode from "jwt-decode";
import LongNameFormatter from "components/common/longName";
import EmpHeader from "components/Headers/empHeader";

const Meetings = () => {
  const [pending, setPending] = useState(true);
  const [meeting, setMeeting] = useState([]);
  const [resetPaginationToggle] = useState(false);
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const roleAbilities = abilities[user.ability] || [];
  const ability = new Ability(roleAbilities);

  const meetingsTableColumns = [
    {
      name: "Tiltle",
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
      {user.ability === "CEO_ABILITY" && <Header />}
      {user.ability !== "CEO_ABILITY" && <EmpHeader />}

      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Meetings</h3>
              </CardHeader>
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
      </Container>
    </>
  );
};

export default Meetings;
