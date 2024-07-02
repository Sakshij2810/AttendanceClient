import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Student from "./Pages/Student/Student";
import Subjects from "./Pages/StudentPages/Subjects/Subjects";
import MonthlyAttendance from "./Pages/StudentPages/MonthlyAttendance/MonthlyAttendance";
import OverallAttendance from "./Pages/StudentPages/OverallAttendance/OverallAttendance";
import Dashboard from "./Pages/StudentPages/Dashboard/Dashboard";
import Teacher from "./Pages/Teacher/Teacher";
import HOD from "./Pages/HOD/HOD";
import HODDashboard from "./Pages/HODPages/Dashboard/HODDashboard";
import AllTeachers from "./Pages/HODPages/AllTeachers/AllTeachers";
import AddTeacher from "./Pages/HODPages/AddTeacher/AddTeacher";
import AllStudents from "./Pages/HODPages/AllStudents/AllStudents";
import AllStudent from "./Pages/TeacherPages/AllStudents/AllStudent";
import AddStudent from "./Pages/TeacherPages/AddStudent/AddStudent";
import TakeAttendance from "./Pages/TeacherPages/TakeAttendance/TakeAttendance";
import Avatar from "./components/Avatar/Avatar";
import TheoryAttendance from "./Pages/TeacherPages/TakeAttendance/TheoryAttendance";
import PracticalAttendance from "./Pages/TeacherPages/TakeAttendance/PracticalAttendance";
import OverallReport from "./Pages/TeacherPages/OverallReport/OverallReport";
import ReportGeneration from "./Pages/TeacherPages/ReportGeneration/ReportGeneration";

import SYS2 from "./Pages/HODPages/AllStudents/SYS2";
import SYS3 from "./Pages/HODPages/AllStudents/SYS3";
import TYT1 from "./Pages/HODPages/AllStudents/TYT1";
import TYT2 from "./Pages/HODPages/AllStudents/TYT2";
import TYT3 from "./Pages/HODPages/AllStudents/TYT3";
import SYS1exception from "./Pages/HODPages/AllStudents/SYS1exception";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route exact path="/Login" Component={Login} />
      <Route exact path="/SignUp" Component={SignUp} />
      <Route exact path="/Profile" Component={Avatar} />

      {/* student Routes */}
      <Route exact path="/Student-Home" Component={Student} />
      <Route exact path="/Student-Dashboard" Component={Dashboard} />
      <Route exact path="/Student-Subjects" Component={Subjects} />
      <Route
        exact
        path="/Student-MonthlyAttendance"
        Component={MonthlyAttendance}
      />
      <Route
        exact
        path="/Student-OverallAttendance"
        Component={OverallAttendance}
      />

      {/* teacher routes */}
      <Route exact path="/Teacher-Home" Component={Teacher} />
      <Route exact path="/Teacher-AllStudents" Component={AllStudent} />
      <Route exact path="/addStudent" Component={AddStudent} />
      <Route exact path="/Teacher-TakeAttendance" Component={TakeAttendance} />
      <Route exact path="/Theory-Attendance" Component={TheoryAttendance} />
      <Route
        exact
        path="/Practical-Attendance"
        Component={PracticalAttendance}
      />
      <Route exact path="/Students-OverallReport" Component={OverallReport} />

      <Route exact path="/Student-Report" Component={ReportGeneration} />

      {/* HOD routes */}

      <Route exact path="/HOD-Dashboard" Component={HODDashboard} />

      <Route exact path="/AllTeachers" Component={AllTeachers} />
      <Route exact path="/addTeacher" Component={AddTeacher} />

      <Route exact path="/AllStudents" Component={AllStudents} />

      <Route exact path="/SY-S1" Component={SYS1exception} />
      <Route exact path="/SY-S2" Component={SYS2} />
      <Route exact path="/SY-S3" Component={SYS3} />
      <Route exact path="/TY-T1" Component={TYT1} />
      <Route exact path="/TY-T2" Component={TYT2} />
      <Route exact path="/TY-T3" Component={TYT3} />
    </Routes>
  );
};

export default AllRoutes;
