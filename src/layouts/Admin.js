import React, { useContext, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { ThemeContext } from "common/context/themeContext";

const Admin = (props) => {
  const { themeHandler, darkTheme } = useContext(ThemeContext);
  const mainContent = React.useRef(null);
  const location = useLocation();
  function extractUserProfile(url) {
    const parts = url.split("/");
    if (parts.length >= 3) {
      return parts[2];
    }
    return null;
  }

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.children) {
          return prop.children.map((child, key) => (
            <Route
              path={child.path}
              element={child.component}
              key={key}
              exact
            />
          ));
        }
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  // const getBrandText = (path) => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (
  //       props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
  //       -1
  //     ) {
  //       return routes[i]?.name;
  //     }
  //   }
  //   return "Brand";
  // };

  const [isFilterVisible, setFilterVisible] = useState(false);
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/jewelDashboard",
          // imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={extractUserProfile(location.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route
            path="*"
            element={<Navigate to="/admin/jewelDashboard" replace />}
          />
        </Routes>
        <div className="filter-btn" onMouseOver={() => setFilterVisible(true)}>
          <span className="fas fa-cog "></span>
        </div>
        <div
          className={`filter-form  text-center ${
            isFilterVisible ? "visible" : ""
          } ${darkTheme ? "bg-dark" : "bg-gray"}`}
          onMouseLeave={() => setFilterVisible(false)}
        >
          <h2 className={`${darkTheme ? "text-light" : "text-dark"}`}>
            Change Theme
          </h2>
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onClick={themeHandler}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="ball"></span>
          </label>
        </div>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
