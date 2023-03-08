import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AddCourse from "../components/courses/AddCourse";
import AllCourses from "../components/courses/AllCourses";
import EditCourse from "../components/courses/EditCourse";
import MyCourses from "../components/courses/MyCourses";
import ProfessorDash from "../components/dashbords/ProfessorDash";
import StudentDashboard from "../components/dashbords/StudentDashboard";
import StudentList from "../components/dashbords/StudentList";
import SubscribeStudent from "../components/login/SubscribeStudent";
import { loginContext } from "../context/loginContext";

const DashboardsRouter = ({ element: Element, ...rest }) => {
  const { userData } = useContext(loginContext);

  if (
    userData.user &&
    Element === StudentDashboard &&
    userData.user.roll === "student"
  ) {
    return <Element {...rest} />;
  }
  if (
    userData.user &&
    Element === ProfessorDash &&
    userData.user.roll === "professor"
  ) {
    return <Element {...rest} />;
  }

  if (
    userData.user &&
    Element === AllCourses &&
    userData.user.roll === "professor"
  ) {
    return <Element {...rest} />;
  }

  if (
    userData.user &&
    Element === AddCourse &&
    userData.user.roll === "professor"
  ) {
    return <Element {...rest} />;
  }
  if (
    userData.user &&
    Element === EditCourse &&
    userData.user.roll === "professor"
  ) {
    return <Element {...rest} />;
  }

  if (
    userData.user &&
    Element === SubscribeStudent &&
    userData.user.roll === "professor"
  ) {
    return <Element {...rest} />;
  }

  if (
    userData.user &&
    Element === StudentList &&
    userData.user.roll === "professor"
  ) {
    return <Element {...rest} />;
  }

  if (
    userData.user &&
    Element === MyCourses &&
    userData.user.roll === "student"
  ) {
    return <Element {...rest} />;
  }

  return <Navigate to="/login" state={{ needToLogin: true }} replace />;
};

export default DashboardsRouter;
