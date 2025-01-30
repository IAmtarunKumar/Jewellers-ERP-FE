import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { header } from "./constData";
import JewelHeader from "components/Headers/jewelHeader";
import { AiOutlineFolderOpen, AiOutlineFolder } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toastify } from "common/helpers/toast";
import axios from "axios";
import { ThemeContext } from "common/context/themeContext";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useUser } from "common/context/userContext";

const ChartAccount = () => {
  const { isAdmin, delete: canDelete } = useUser();
  const [activeParent, setActiveParent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleFileChange = async (e, child) => {
    console.log("e.target", e.target, "child", child);
    const urlLogic = () => {
      if (child.id === "1a") {
        console.log("we are herezzz");
        return "csvCashInHand";
      } else if (child.id === "1b") {
        console.log("we are herezzz");
        return "csvBankAccount";
      } else if (child.id === "1c") {
        console.log("we are herezzz");
        return "csvProperties";
      } else if (child.id === "1d") {
        console.log("we are herezzz");
        return "csvPlantAndMachineries";
      } else if (child.id === "2a") {
        console.log("we are herezzz");
        return "csvDutyAndTaxes";
      } else if (child.id === "2b") {
        console.log("we are herezzz");
        return "csvCreditors";
      } else if (child.id === "2c") {
        console.log("we are herezzz");
        return "csvLoans";
      } else if (child.id === "3a") {
        console.log("we are herezzz");
        return "csvSales";
      } else if (child.id === "3b") {
        console.log("we are herezzz");
        return "csvRepairs";
      } else if (child.id === "4a") {
        console.log("we are herezzz");
        return "csvRawMaterials";
      } else if (child.id === "4b") {
        console.log("we are herezzz");
        return "csvJobWorks";
      }
    };
    const files = e.target.files[0];
    // setFile(files);
    const formData = new FormData();

    formData.append("csvFile", files);
    try {
      await axios
        .post(
          `https://jewellers-erp.onrender.com/chartOfAccount/${urlLogic()}`,
          // `https://jewellers-erp.onrender.com/chartOfAccount/${urlLogic()}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status !== 200) return;
          toastify({ msg: response.data, type: "success" });
          window.location = "/admin/account";
        })
        .catch((error) => {
          toastify({ msg: error.response.data, type: "error" });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/chartOfAccountBalance",
        // "https://jewellers-erp.onrender.com/chartOfAccountBalance",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      setBalances(response.data);
    } catch (error) {
      if (error.response?.data) {
        console.log("Error fetching data:", error.response.data);
      } else {
        console.log("Error fetching data:", error.message);
      }
    }
  };
  useEffect(() => {
    fetchBalance();
  }, []);

  const parentBalanceFetch = (cur) => {
    if (!balances || balances.length === 0) return 0;
    // console.log("we are in a parent balance fetch", cur);
    if (cur.title === "Assets") {
      return (
        parseInt(balances[0] ? balances[0]?.balance : 0) +
        parseInt(balances[1] ? balances[1]?.balance : 0) +
        parseInt(balances[2] ? balances[2]?.balance : 0) +
        parseInt(balances[3] ? balances[3]?.balance : 0)
      );
    }
    if (cur.title === "Liabilities") {
      return (
        parseInt(balances[6] ? balances[6]?.balance : 0) +
        parseInt(balances[7] ? balances[7]?.balance : 0) +
        parseInt(balances[8] ? balances[8]?.balance : 0)
      );
    }
    if (cur.title === "Income") {
      return (
        parseInt(balances[4] ? balances[4]?.balance : 0) +
        parseInt(balances[5] ? balances[5]?.balance : 0)
      );
    }
    if (cur.title === "Expenses") {
      return (
        parseInt(balances[9] ? balances[9]?.balance : 0) +
        parseInt(balances[10] ? balances[10]?.balance : 0)
      );
    }
  };
  const childBalanceFetch = (child) => {
    // console.log("we are in a child balance fetch", child);
    if (!balances || balances.length === 0) return 0;
    if (child.title === "Cash in Hand") {
      return parseInt(balances[0] ? balances[0]?.balance : 0);
    }
    if (child.title === "Bank") {
      return parseInt(balances[1] ? balances[1]?.balance : 0);
    }
    if (child.title === "Properties") {
      return parseInt(balances[2] ? balances[2]?.balance : 0);
    }
    if (child.title === "Plant and Machineries") {
      return parseInt(balances[3] ? balances[3]?.balance : 0);
    }
    if (child.title === "Duty and Taxes") {
      return parseInt(balances[6] ? balances[6]?.balance : 0);
    }
    if (child.title === "Creditors") {
      return parseInt(balances[7] ? balances[7]?.balance : 0);
    }
    if (child.title === "Loans") {
      return parseInt(balances[8] ? balances[8]?.balance : 0);
    }
    if (child.title === "Sales") {
      return parseInt(balances[4] ? balances[4]?.balance : 0);
    }
    if (child.title === "Repairs") {
      return parseInt(balances[5] ? balances[5]?.balance : 0);
    }
    if (child.title === "Raw Material") {
      return parseInt(balances[9] ? balances[9]?.balance : 0);
    }
    if (child.title === "Job Work") {
      return parseInt(balances[10] ? balances[10]?.balance : 0);
    }
  };
  const handleFillDemoData = async () => {
    console.log("we are in handlefilldemodata");
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jewellers-erp.onrender.com/chartOfAccountDemo/add",
        // "https://jewellers-erp.onrender.com/chartOfAccountDemo/add",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      toastify({ msg: response.data, type: "success" });
      setLoading(false);
      fetchBalance();
    } catch (err) {
      if (err.response?.data) {
        console.log("Error fetching data:", err.response.data);
        toastify({ msg: err.response.data, type: "error" });
      } else {
        console.log("Error fetching data:", err.message);
        toastify({ msg: err.message, type: "error" });
      }
    }
  };

  const handleRemoveAllData = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Enter your 128-bit encrpyted key to confirm",
      icon: "warning",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (key) => {
        return fetch(
          `https://jewellers-erp.onrender.com/stringSecurity/${key}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }

            return response.text();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            "https://jewellers-erp.onrender.com/chartOfAccountDemo/remove",
            // "https://jewellers-erp.onrender.com/chartOfAccountDemo/remove",

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("response", response.data);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          toastify({ msg: "Successfully removed the Data!", type: "success" });
          setBalances([]);
        } catch (err) {
          if (err.response?.data) {
            console.log("Error fetching data:", err.response.data);
            toastify({ msg: err.response.data, type: "error" });
          } else {
            console.log("Error fetching data:", err.message);
            toastify({ msg: err.message, type: "error" });
          }
        }
      }
    });
    // console.log("response", response.data)
  };

  const { darkTheme } = useContext(ThemeContext);
  const handleParentClick = (parentId) => {
    setActiveParent((prevActiveParent) =>
      prevActiveParent === parentId ? null : parentId
    );
  };

  return (
    <>
      <JewelHeader />
      <Container className="mt-3" fluid>
        <Card className={`${darkTheme ? "bg-dark-gray" : " bg-white "}`}>
          <CardHeader
            className={`${
              darkTheme ? "bg-dark-gray" : " bg-erp "
            } border-0 d-flex justify-content-between align-items-center p-3 flex-wrap `}
          >
            <h3 className="text-white mb-0">Chart of Accounts</h3>
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-sm-0 mt-3">
              <button
                type="button"
                className="btn btn-warning text-white "
                onClick={handleFillDemoData}
              >
                {loading ? "Filling..." : "Fill Data"}
              </button>
              {(isAdmin || canDelete) && (
                <button
                  type="button"
                  className="btn btn-warning text-white "
                  onClick={handleRemoveAllData}
                >
                  Remove Data
                </button>
              )}
            </div>
          </CardHeader>
          <CardBody
            className={`${
              darkTheme ? "bg-dark-gray" : " bg-white "
            } pt-0 rounded`}
          >
            <div className="m-3">
              {header.map((cur) => {
                return (
                  <div key={cur.id}>
                    <div
                      className="d-flex w-100 justify-content-between align-items-center"
                      onClick={() => handleParentClick(cur.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <h2
                        className={`${
                          darkTheme ? "text-white" : " text-dark "
                        } d-flex align-items-center`}
                        style={{ gap: "12px" }}
                      >
                        {cur.id === activeParent ? (
                          <AiOutlineFolderOpen />
                        ) : (
                          <AiOutlineFolder />
                        )}
                        {cur.title}
                      </h2>
                      {/* <p>{`₹${cur.amount}`}</p> */}
                      <p>{`₹${parentBalanceFetch(cur)}`}</p>
                    </div>
                    <hr className="my-1" />
                    {cur.id === activeParent && (
                      <div>
                        {cur.children.map((child) => (
                          <div key={child.id}>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                              <div>
                                <Link
                                  to={child.url}
                                  className={`${
                                    darkTheme ? "text-white" : " text-dark "
                                  } mx-4 text-default`}
                                >
                                  {child.title}
                                </Link>
                                <div
                                  className="btn-group btn-group-sm"
                                  role="group"
                                  aria-label="Small button group"
                                >
                                  <button
                                    type="button"
                                    className={`${
                                      darkTheme
                                        ? "btn-outline-secondary "
                                        : "   btn-outline-dark"
                                    } btn`}
                                    onClick={() => fileInputRef.current.click()}
                                  >
                                    CSV
                                  </button>
                                  <input
                                    id="csvFile"
                                    className="form-control"
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileChange(e, child)}
                                  />
                                  <button
                                    type="button"
                                    className={`${
                                      darkTheme
                                        ? "btn-outline-secondary "
                                        : "   btn-outline-dark"
                                    } btn`}
                                    onClick={() => navigate(`${child.url}`)}
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                              <p>{`₹${childBalanceFetch(child)}`}</p>
                            </div>
                            <hr className="my-1" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ChartAccount;
