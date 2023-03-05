import { createBrowserHistory } from "history";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AddCourse from "../components/courses/AddCourse";
import AllCourses from "../components/courses/AllCourses";
import EditCourse from "../components/courses/EditCourse";
import ProfessorDash from "../components/dashbords/ProfessorDash";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import LoginContextProvider from "../context/loginContext";
import LoginRoute from "./LoginRoute";
// import AddCourse from "../components/courses/AddCourse";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <LoginContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginRoute element={Login} />} />
          {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
          <Route path="/login" element={<LoginRoute element={Login} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/professor-dashboard" element={<ProfessorDash />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/all-courses/add-course" element={<AddCourse />} />
          <Route path="/all-courses/edit-course" element={<EditCourse />} />
        </Routes>
        <Footer />
      </LoginContextProvider>
    </Router>
  );
};

export default AppRouter;
