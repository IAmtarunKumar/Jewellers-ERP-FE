import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import ChatBot from "views/examples/chatbot";
import jwtDecode from "jwt-decode";
import { ReviewProvider } from "common/context/reviewContext";
import { ThemeProvider } from "common/context/themeContext";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import { useEffect } from "react";
import { UserProvider } from "common/context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Protected = ({ children }) => {
  const { darkTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);
  let isLoggedIn;
  if (localStorage.getItem("userDetail")) {
    isLoggedIn = !!jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
//added commeny from github dev
root.render(
  <Fragment>
    <UserProvider>
    <ThemeProvider>
      <ReviewProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin/*"
              element={
                <Protected>
                  <AdminLayout />
                  <ChatBot />
                </Protected>
              }
            />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route
              path="*"
              element={<Navigate to="/auth/register" replace />}
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ReviewProvider>
    </ThemeProvider>
    </UserProvider>
  </Fragment>
);
