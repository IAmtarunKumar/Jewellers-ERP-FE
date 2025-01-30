import { toastify } from "common/helpers/toast";
import { MdNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./navbar.css";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "common/context/themeContext";
import { searchArray } from "common/constant/constant";
import Avatar from "../../assets/img/male-avatar.png";
import useProfileImage from "common/customHooks/useProfileImage";

const AdminNavbar = (props) => {
  const { darkTheme } = useContext(ThemeContext);
  const { imageUrl, error } = useProfileImage();
  if (error) {
    toastify({ msg: error, type: "danger" });
  }
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchContainerRef = useRef(null);
  let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  const [isNotification, setIsNotification] = useState([]);
  const handleLogout = () => {
    // Clear the token cookie

    localStorage.clear();
    toastify({ msg: "Logged Out Successfully !", type: "info" });
    navigate(`/auth/login`);
  };

  const handleSearchResultClick = () => {
    setSearchValue("");
    setFilteredResults([]);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/notifications",
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
        // console.log(data);
        setIsNotification(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setFilteredResults([]); // Clear the filtered results to close the dropdown
      }
    };

    // Attach the click outside listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const results = searchArray.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(results);
  };

  return (
    <>
      <Navbar
        className={`${
          darkTheme ? "bg-dark text-white" : "bg-white text-dark"
        } navbar-top`}
        expand="md"
        id="navbar-main"
      >
        <Container fluid>
          <Link
            className={`${
              darkTheme ? "text-white" : " text-dark"
            } navbar-top h4 mb-0 text-uppercase d-none d-md-inline-block`}
            to="/admin/jewelDashboard"
          >
            {props.brandText}
          </Link>
          <Nav
            className="align-items-center d-none d-md-flex justify-content-center ml-3"
            navbar
          >
            <li className="search-container nav-item" ref={searchContainerRef}>
              <input
                type="text"
                id="box"
                placeholder="Search"
                className="search__box"
                value={searchValue}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <i className="fas fa-search search__icon" id="icon"></i>
              {filteredResults.length > 0 && (
                <div className="search-results">
                  {filteredResults.map((result) => (
                    <>
                      <Link
                        key={result.id}
                        to={result.url}
                        className="search-result"
                        onClick={handleSearchResultClick}
                      >
                        {result.title}
                      </Link>
                    </>
                  ))}
                </div>
              )}
            </li>
            <UncontrolledDropdown nav>
              {/* Dropdown toggle button */}
              <DropdownToggle className="pr-0" nav>
                <MdNotificationsActive color={darkTheme ? "white" : "black"} />
              </DropdownToggle>

              {/* Dropdown menu */}
              <DropdownMenu
                className={`${
                  darkTheme ? "text-white bg-dark-gray" : "bg-white text-dark"
                } dropdown-menu-arrow`}
                style={{
                  width: "400px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  minHeight: "150px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
                right
              >
                {/* Notification title */}
                <DropdownItem className={` noti-title`} header tag="div">
                  <h6
                    className={`${
                      darkTheme ? "text-white" : " text-dark"
                    } text-overflow m-0`}
                  >
                    Notification!
                  </h6>
                </DropdownItem>

                {/* Check if there are any notifications */}
                {isNotification && isNotification.length ? (
                  isNotification.map((noti, index) => (
                    // <Link to={`/admin/${noti.schema}/${noti.id}`} key={index}>
                    <DropdownItem
                      className="border-bottom border-light"
                      key={index}
                    >
                      <div>
                        <h3
                          className={`${
                            darkTheme ? "text-white" : "text-dark"
                          } form-contal-label`}
                        >
                          {noti.name}
                        </h3>
                        <p
                          className={`${
                            darkTheme ? "text-white" : "text-dark"
                          } fs-6 m-0`}
                        >
                          {noti.message}
                        </p>
                      </div>
                    </DropdownItem>
                    // </Link>
                  ))
                ) : (
                  <DropdownItem>
                    <div className="text-center">
                      <div style={{ fontSize: "2em", marginBottom: "10px" }}>
                        📬
                      </div>
                      <h3
                        className={`${
                          darkTheme ? "text-white" : " text-dark"
                        } `}
                      >
                        No New notifications
                      </h3>
                      <p
                        className={`${
                          darkTheme ? "text-white" : " text-dark"
                        } `}
                      >
                        Looks like you haven't received any notifications.
                      </p>
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={imageUrl ? imageUrl : Avatar}
                      className="d-block"
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-dark"
                      } mb-0 text-sm font-weight-bold`}
                    >
                      {/* {user.name} */}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/userprofile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem> */}
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem> */}
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
