import { combineReducers } from "redux";

import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";
import {
  allTeacherReducer,
  addTeacherReducer,
  updateOrDeleteTeacher,
} from "./teacherReducer";
import {
  allStudentReducer,
  addStudentReducer,
  updateOrDeleteStudent,
} from "./studentReducer";
import {
  addAttendanceReducer,
  allAttendanceReducer,
  attendanceByDateReducer,
  dailyAttendanceReducer,
  singleStudentAttendanceReducer,
  studentSubjectDatewiseAttendanceReducer,
  studentSubjectwiseAttendanceReducer,
} from "./attendanceReducer.js";

export default combineReducers({
  authReducer,
  currentUserReducer,
  teachers: allTeacherReducer,
  teacher: addTeacherReducer,
  updateOrDeleteTeacher,
  students: allStudentReducer,
  student: addStudentReducer,
  updateOrDeleteStudent,
  addAttendance: addAttendanceReducer,
  allAttendance: allAttendanceReducer,
  attendanceByDate: attendanceByDateReducer,
  singleStudentAttendance: singleStudentAttendanceReducer,
  subjectwiseAttendance: studentSubjectwiseAttendanceReducer,
  dailyAttendance: dailyAttendanceReducer,
  subjectDatewiseAttendance: studentSubjectDatewiseAttendanceReducer,
});
