import { createBrowserHistory } from "history";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import LoginContextProvider from "../context/loginContext";
import LoginRoute from "./LoginRoute";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <LoginContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginRoute element={Login} />} />
          {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
          <Route
            path="/login"
            element={/*<LoginRoute element={Login} />*/ <Login />}
          />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </LoginContextProvider>
    </Router>
  );
};

export default AppRouter;
