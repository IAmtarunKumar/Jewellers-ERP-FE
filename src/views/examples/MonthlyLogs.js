// import { abilities } from "common/constant/constant";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "./chatbot.scss";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const MonthlyLogs = () => {
  const [pending, setPending] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [resetPaginationToggle] = useState(false);
  const [totalHours, setTotalHours] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  // const roleAbilities = abilities[user.ability] || [];

  const columns = [
    {
      name: "Index",
      selector: (row) => row.index,
      sortable: true,
    },
    {
      name: "Sign In Time",
      selector: (row) => row.signInTime,
      sortable: true,
    },
    {
      name: "Sign Out Time",
      selector: (row) => row.signOutTime,
      sortable: true,
    },
    {
      name: "Hours",
      selector: (row) => row.hours,
      sortable: true,
    },
  ];

  const formattedData = meeting
    ?.map((entry, index) => ({
      index: meeting.length - index,
      signInTime: `${entry.signIn?.year}-${entry.signIn?.month}-${entry.signIn?.day} ${entry.signIn?.time}`,
      signOutTime: entry.signOut
        ? `${entry.signOut.year}-${entry.signOut.month}-${entry.signOut.day} ${entry.signOut.time}`
        : "N/A", // You can change 'N/A' to any other fallback message you prefer.
      hours: entry.hours,
    }))
    .reverse();

  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      setPending(true);
      const [year, month] = selectedDate.split("-");
      const logs = await fetch(
        "https://jewellers-erp.onrender.com/getAttendenceData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month: month, year: year, email: user.email }),
        }
      );
      const meetingsData = await logs.json();
      setTotalHours(meetingsData.data.totalHours);
      setMeeting(meetingsData.data.signInOutTimes);
      setPending(false);
      setIsSubmit(true);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div
        className="header pb-3 pt-5 pt-lg-3 d-flex align-items-center"
        style={{
          minHeight: "200px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask " />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1
                className={`${
                  darkTheme ? "text-white " : "   text-dark"
                } display-2`}
              >
                Monthly Logs
              </h1>
              <p
                className={`${
                  darkTheme ? "text-white " : "   text-dark"
                } mt-0 mb-5`}
              >
                This is your monthly logs Page. You can see the timings you
                clocked In and clocked Out
              </p>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="datePicker">Select a Month</Label>
                  <div className="custom-month-input">
                    <Input
                      type="month"
                      id="datePicker"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        // // console.log(e.target.value);
                      }}
                    />
                    <span className="custom-placeholder">Select Month</span>
                  </div>
                </FormGroup>
                <Button type="submit" color="primary" className="bg-erp">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col lg="12" md="12" className="mt-5">
              {totalHours ? (
                <p className="text-dark">
                  Total Hours Worked for the month: {totalHours} Hours
                </p>
              ) : null}
              {!isSubmit ? (
                <div className="col-lg-6">
                  <p>
                    See what our team did each month, their wins, challenges,
                    and hard work. We use this info to help everyone do better,
                    set goals, and hit our company targets. It's useful for both
                    employees and managers to understand and improve our team's
                    work.
                  </p>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={formattedData}
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle}
                  progressPending={pending}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MonthlyLogs;
