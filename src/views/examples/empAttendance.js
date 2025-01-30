// import { abilities } from "common/constant/constant";
// import jwtDecode from "jwt-decode";
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
import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { toastify } from "common/helpers/toast";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const EmpAttendance = () => {
  const [pending, setPending] = useState(true);
  const [meeting, setMeeting] = useState([]);
  const [empHours, setEmpHours] = useState([]);
  const [resetPaginationToggle] = useState(false);
  const [totalHours, setTotalHours] = useState();
  const [selectedEmp, setSelectedEmp] = useState();
  const { darkTheme } = useContext(ThemeContext);

  const { data } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",
    pending,
    setPending
  );
  const emp = data;
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
  ];

  const formattedData = meeting
    ?.map((entry, index) => ({
      index: meeting.length - index,
      signInTime: `${entry.signIn?.year}-${entry.signIn?.month}-${entry.signIn?.day} ${entry.signIn?.time}`,
      signOutTime: entry.signOut
        ? `${entry.signOut.year}-${entry.signOut.month}-${entry.signOut.day} ${entry.signOut.time}`
        : "N/A", // You can change 'N/A' to any other fallback message you prefer.
    }))
    .reverse();

  const [selectedDate, setSelectedDate] = useState("");
  const [allSelectedDate, setAllSelectedDate] = useState("");

  const hourColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Total Hours",
      selector: (row) => row.totalHours,
      sortable: true,
    },
  ];
  const handleSubmitMonth = async (e) => {
    e.preventDefault();
    const [year, month] = allSelectedDate.split("-");
    try {
      const logs = await fetch(
        "https://jewellers-erp.onrender.com/employeeHours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month: month, year: year }),
        }
      );
      const meetingsData = await logs.json();
      //   // console.log(meetingsData);
      setEmpHours(meetingsData);
      if (!logs.ok) {
        return toastify({ msg: meetingsData.message, type: "error" });
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Split the selectedDate into year and month parts
    const [year, month] = selectedDate.split("-");
    try {
      const logs = await fetch(
        "https://jewellers-erp.onrender.com/getAttendenceData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: month,
            year: year,
            email: selectedEmp,
          }),
        }
      );
      const meetingsData = await logs.json();
      if (logs.status === 404) {
        return toastify({ msg: meetingsData.message, type: "error" });
      }
      setTotalHours(meetingsData.data.totalHours);
      setMeeting(meetingsData.data.signInOutTimes);
      setPending(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <div
        className="header pb-3 pt-5 pt-lg-3 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask " />
        {/* Header container */}
        <Container className="d-flex flex-column" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1
                className={`${
                  darkTheme ? "text-white " : "   text-dark"
                } display-2`}
              >
                Attendance
              </h1>
              <p
                className={`${
                  darkTheme ? "text-white " : "   text-dark"
                } mt-0 mb-5`}
              >
                You can see the timings of any employee clocked In and clocked
                Out
              </p>
              <h2
                className={`${
                  darkTheme ? "text-white " : "   text-dark"
                } display-4`}
              >
                Individual Attendance
              </h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="exampleSelect">Select an employee</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) => {
                      const [, email] = e.target.value.split("|");
                      setSelectedEmp(email);
                      // selectToUserId(id);
                    }}
                  >
                    <option value="">Select One of the employees</option>
                    {emp?.map((curEmp, index) => {
                      return (
                        <option
                          value={`${curEmp.name}|${curEmp.email}`}
                          key={index}
                        >
                          {curEmp.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
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
              <DataTable
                columns={columns}
                data={formattedData}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="7" md="10" className="mt-5">
              <h2
                className={`${
                  darkTheme ? "text-white " : "   text-dark"
                } display-4`}
              >
                {" "}
                Total Hours
              </h2>
              <Form onSubmit={handleSubmitMonth}>
                <FormGroup>
                  <Label for="datePicker">Select a Month</Label>
                  <div className="custom-month-input">
                    <Input
                      type="month"
                      id="datePicker"
                      value={allSelectedDate}
                      onChange={(e) => {
                        setAllSelectedDate(e.target.value);
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
              <DataTable
                columns={hourColumns}
                data={empHours}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EmpAttendance;
