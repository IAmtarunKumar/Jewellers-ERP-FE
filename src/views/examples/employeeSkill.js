import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import { toastify } from "common/helpers/toast";
import { ReviewContext } from "common/context/reviewContext";
import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";

import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const EmployeeSkill = () => {
  const [pending, setPending] = useState();
  const [userInput, setUserInput] = useState("");
  const [selectedEmp, setSelectedEmp] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const [error, setError] = useState(null);
  const { fetchReview, review } = useContext(ReviewContext);
  const { data } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",
    pending,
    setPending
  );
  const emp = data.filter(
    (curEmp) =>
      curEmp.ability === "EMP_ABILITY" ||
      curEmp.ability === "HR_ABILITY" ||
      curEmp.ability === "TL_ABILITY" ||
      curEmp.ability === "MKT_ABILITY"
  );
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const onInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendReviewHandler();
    }
  };

  const getReviewHandler = async () => {
    setReviewModal(true);
    fetchReview(user.email);
  };
  const closeReviewModal = () => {
    setReviewModal(false);
  };
  const sendReviewHandler = async () => {
    if (!selectedEmp.email || userInput === "") {
      setError("Please select an employee or enter your review");
      return;
    }
    setError(null);
    const update = {
      feedbackTo: selectedEmp.email,
      review: userInput,
      feedbackFrom: user.email,
    };
    // console.log(update);
    const response = await fetch(`https://jewellers-erp.onrender.com/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.text();

    toastify({ msg: responseData, type: "success" });
    if (responseData === "Review sent") {
      window.location.reload(true);
    }
  };
  const points = review ? review.split(/\d+\./).slice(1) : [];
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                Welcome To Employee Skill Development
              </h1>
              <p className="text-white mt-0 mb-5">
                This is your Employee Skills Development Page. You can give the
                reviews to your Team Members and also can view what your team
                members think about you.
              </p>
              <p className="text-white h2">To check your review Click below:</p>
              <button
                className="btn btn-info"
                onClick={() => getReviewHandler()}
              >
                CLICK HERE
              </button>
              <Modal isOpen={reviewModal} toggle={closeReviewModal}>
                <ModalHeader toggle={closeReviewModal}>
                  Here is your review
                </ModalHeader>
                <ModalBody>
                  {points.length ? (
                    <div>
                      {points.slice(0, 5).map((point, index) => {
                        const [title, ...content] = point.split(":");
                        return (
                          <div key={index} className="mb-3">
                            <div className="text-black h4 fw-bold">
                              {index + 1}. {title.trim()}:
                            </div>
                            <div className="text-black ">
                              {content.join(":").trim()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    "We are fetching your review"
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={closeReviewModal}>
                    Ok
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
            <Col lg="8" className="mx-auto">
              <div className="mt-5">
                <h1 className="text-center text-white">
                  Give review to your peer employee
                </h1>
                <select
                  name="employee"
                  id="employee"
                  className="form-control mt-4 "
                  onChange={(e) => {
                    const [, email] = e.target.value.split("|");
                    setSelectedEmp({ email });
                  }}
                >
                  <option value="">Select One of the employees</option>
                  {emp &&
                    emp.map((curEmp) => {
                      return (
                        <option
                          value={`${curEmp.name}|${curEmp.email}`}
                          key={curEmp.email}
                        >
                          {curEmp.name}
                        </option>
                      );
                    })}
                </select>
                <textarea
                  className="form-control mt-3"
                  value={userInput}
                  rows="4"
                  cols="2"
                  onChange={onInputChange}
                  onKeyDown={onEnterPress}
                  required
                />
                {error && <div className="mt-3 text-red">{error}</div>}
                <button
                  className="btn btn-info mt-3 align-items-center"
                  onClick={() => sendReviewHandler()}
                >
                  Send Review
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EmployeeSkill;
