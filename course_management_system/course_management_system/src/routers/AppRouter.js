import { createBrowserHistory } from "history";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddCourse from "../components/courses/AddCourse";
import AllCourses from "../components/courses/AllCourses";
import CourseClasses from "../components/courses/CourseClasses";
import EditCourse from "../components/courses/EditCourse";
import MyCourses from "../components/courses/MyCourses";
import ScheduleClassesCourse from "../components/courses/AddAttendency";
import ProfessorDash from "../components/dashbords/ProfessorDash";
import StudentDashboard from "../components/dashbords/StudentDashboard";
import StudentList from "../components/dashbords/StudentList";
import Login from "../components/login/Login";
import SubscribeProfessor from "../components/login/SubscribeProfessor";
import SubscribeStudent from "../components/login/SubscribeStudent";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import Loader from "../components/main/Loader";
import LoginContextProvider from "../context/loginContext";
import DashboardsRouter from "./DashboardsRouter";
import LoginRoute from "./LoginRoute";
import NotFoundPageRouter from "./NotFoundPageRouter";
import AddAttendency from "../components/courses/AddAttendency";
import LessonsList from "../components/courses/LessonsList";
import ClassAttendanceList from "../components/courses/ClassAttendanceList";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <LoginContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginRoute element={Login} />} />
          <Route path="/login" element={<LoginRoute element={Login} />} />
          <Route
            path="/professor-dashboard"
            element={<DashboardsRouter element={ProfessorDash} />}
          />
          <Route
            path="/all-courses"
            element={<DashboardsRouter element={AllCourses} />}
          />
          <Route
            path="/all-courses/add-course"
            element={<DashboardsRouter element={AddCourse} />}
          />
          <Route
            path="/all-courses/edit-course"
            element={<DashboardsRouter element={EditCourse} />}
          />

          <Route
            path="/professor-dashboard/add-new-student"
            element={<DashboardsRouter element={SubscribeStudent} />}
          />
          <Route
            path="/login/subscribe-professor"
            element={<LoginRoute element={SubscribeProfessor} />}
          />

          <Route
            path="/professor-dashboard/students-list"
            element={<DashboardsRouter element={StudentList} />}
          />
          <Route
            path="/student-dashboard"
            element={<DashboardsRouter element={StudentDashboard} />}
          />
          <Route
            path="/student-dashboard/my-courses"
            element={<DashboardsRouter element={MyCourses} />}
          />
          <Route
            path="/student-dashboard/my-courses/course-lesson/add-attendency"
            element={<AddAttendency />}
          />
          <Route
            path="/student-dashboard/my-courses/course-lessons"
            element={<CourseClasses />}
          />
          <Route
            path="/all-courses/course-lessons-list"
            element={<LessonsList />}
          />
          <Route
            path="/all-courses/course-lessons-list/lesson-attend"
            element={<ClassAttendanceList />}
          />
          <Route path="/loader" element={<Loader />} />
          <Route path="*" element={<NotFoundPageRouter />} />
        </Routes>
        <Footer />
      </LoginContextProvider>
    </Router>
  );
};

export default AppRouter;
