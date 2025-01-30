import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const AuthNavbar = () => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      <Navbar
        className={`${
          darkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light text-dark"
        } navbar-top navbar-horizontal`}
        expand="md"
      >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <div className={`${darkTheme ? "text-white" : " text-dark"} `}>
              Company Name
            </div>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            navbar
            toggler="#navbar-collapse-main "
            className={`${darkTheme ? "bg-dark" : "bg-light"}`}
          >
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <div
                      className={`${darkTheme ? "text-white" : " text-dark"} `}
                    >
                      Company Name
                    </div>
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/jewelDashboard"
                  tag={Link}
                >
                  <i className="ni ni-planet" />
                  <span
                    className={`${
                      darkTheme ? "text-white" : " text-dark"
                    } nav-link-inner--text`}
                  >
                    Dashboard
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span
                    className={`${
                      darkTheme ? "text-white" : " text-dark"
                    } nav-link-inner--text`}
                  >
                    Register
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span
                    className={`${
                      darkTheme ? "text-white" : " text-dark"
                    } nav-link-inner--text`}
                  >
                    Login
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span
                    className={`${
                      darkTheme ? "text-white" : " text-dark"
                    } nav-link-inner--text`}
                  >
                    Profile
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
