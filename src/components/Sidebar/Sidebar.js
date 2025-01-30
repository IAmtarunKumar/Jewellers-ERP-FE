/*eslint-disable*/
import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import jwtDecode from "jwt-decode";
import Avatar from "../../assets/img/male-avatar.png";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import SubMenu from "./SubMenu";
import "./index.scss";
import { toastify } from "common/helpers/toast";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import useProfileImage from "common/customHooks/useProfileImage";

const Sidebar = (props) => {
  const { imageUrl, error } = useProfileImage();
  if (error) {
    toastify({ msg: error, type: "danger" });
  }
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const [collapseOpen, setCollapseOpen] = useState();
  // const [role, setRole] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  let user;
  let orgName;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
    orgName = jwtDecode(localStorage.getItem("userDetail")).foundUser
      .organisationName;
  }

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        prop.display &&
        (prop.children ? (
          <SubMenu
            title={prop.name}
            icon={prop.icon}
            items={prop?.children}
            key={key}
            onClick={closeCollapse}
            darkTheme={darkTheme}
          />
        ) : (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              className={`${darkTheme ? "dark-theme" : "light-theme"}`}
            >
              <i className={prop.icon} />
              {prop?.name}
            </NavLink>
          </NavItem>
        ))
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
  const handleLogout = () => {
    // Clear the token cookie

    localStorage.clear();
    toastify({ msg: "Logged Out Successfully !", type: "info" });
    navigate(`/auth/login`);
  };
  const [isClockedIn, setIsClockedIn] = useState();
  const handleStatus = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/getClockStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ email: user.email }), // Convert data to JSON string
        }
      );
      const responseData = await response;
      const responseData1 = await response.json();

      if (responseData.status === 200) {
        setIsClockedIn(responseData1.status);
      } else {
        return;
      }

      // // console.log(responseData);
    } catch (err) {
      console.error(err);
      // toastify({ msg:  responseData , type: "success" });
    }
  };
  // // console.log("user", user);
  const handleClockIn = async () => {
    const data = { email: user.email, phoneNo: user.mobile, type: "signIn" };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/webClock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(data), // Convert data to JSON string
        }
      );
      const responseData = await response;
      if (responseData.status === 200) {
        setIsClockedIn(!isClockedIn);
        toastify({ msg: "Clocked In successfully!", type: "success" });
      } else {
        toastify({ msg: "Server Error! Try Again Later", type: "error" });
        return;
      }

      // // console.log(responseData);
    } catch (err) {
      console.error(err);
      // toastify({ msg:  responseData , type: "success" });
    }
  };
  const handleClockOut = async () => {
    const data = { email: user.email, phoneNo: user.mobile, type: "signOut" };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/webClock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(data), // Convert data to JSON string
        }
      );
      const responseData = response;
      if (responseData.status === 200) {
        setIsClockedIn(!isClockedIn);
        toastify({ msg: "Clocked Out successfully!", type: "error" });
      }
      // // console.log(responseData);
      else {
        toastify({ msg: "Server Error! Try Again Later", type: "error" });
        return;
      }
    } catch (err) {
      console.error(err);
      // toastify({ msg:  responseData , type: "success" });
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
    handleStatus();
    //eslint-disable-next-line
  }, []);
  return (
    <Navbar
      className={`${
        darkTheme
          ? "text-white bg-dark navbar-dark"
          : " text-dark bg-light navbar-light"
      } navbar-vertical fixed-left`}
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span
            className={`${
              darkTheme ? "text-white" : "text-dark"
            } navbar-toggler-icon`}
          />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pb-0" {...navbarBrandProps}>
            {/* <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            /> */}
            <div>
              <h1
                className={`${
                  darkTheme ? "text-light" : "text-dark"
                } logo-name text-uppercase m-0`}
              >
                {orgName}
              </h1>
            </div>
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            {/* <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle> */}
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media
                className={`${
                  darkTheme ? "text-white" : " text-dark"
                } align-items-center`}
              >
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={imageUrl ? imageUrl : Avatar}
                    className="d-block"
                  />
                </span>
                {/* {user.name} */}
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>

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
        {/* Collapse */}
        <Collapse
          navbar
          isOpen={collapseOpen}
          className={`${darkTheme ? "bg-dark" : "bg-light"}`}
        >
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col>
                <div>
                  <h1
                    className={`${
                      darkTheme ? "text-light" : "text-dark"
                    } logo-name text-uppercase m-0`}
                  >
                    {orgName}
                  </h1>
                </div>
              </Col>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div
              className={`${
                !isClockedIn
                  ? "bg-erp text-white text-center rounded p-2 w-100"
                  : "w-100 bg-danger text-light text-center rounded p-2 mb-3"
              } `}
              role="button"
              onClick={!isClockedIn ? handleClockIn : handleClockOut}
            >
              {!isClockedIn ? "Clock In" : "Clock Out"}
            </div>
          </div>
          <hr className="my-3" />

          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    // imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
