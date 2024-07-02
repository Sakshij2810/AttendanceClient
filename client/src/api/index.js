import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

//auth API
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

//teacher API
export const getAllTeachersApi = () => API.get("/teacher/allTeachers");
export const addTeacher = (teacherData) =>
  API.post("/teacher/add", teacherData);

export const deleteTeacher = (id) => API.delete(`/teacher/${id}`);

//student API
export const getAllStudentsApi = () => API.get("/student/allStudents");
export const addStudent = (teacherData) =>
  API.post("/student/add", teacherData);

export const deleteStudent = (id) => API.delete(`/student/${id}`);

//attendance API
export const addAttendanceApi = (attendanceData) =>
  API.post("/attendance/add", attendanceData);

export const getAllAttendanceApi = () => API.get("/attendance/allAttendance");
// export const fetchAttendanceByDateApi = (date) =>
//   API.post("/attendance/attendanceByDate", date);
export const fetchAttendanceByDateApi = (date) =>
  API.post("/attendance/attendanceByDate", { date });

export const fetchSingleStudentAttendanceApi = (studentId) =>
  API.get(`/attendance/${studentId}`);
export const fetchStudentSubjectwiseAttendanceApi = (studentId, subject) =>
  API.get(`/attendance/subjectwise/${studentId}/${subject}`);
export const getDailyAttendanceApi = () => API.get("/attendance/daily");
// export const fetchStudentSubjectDatewiseAttendanceApi = (
//   studentId,
//   subject,
//   date
// ) => API.get(`/attendance/subjectDatewise/${studentId}/${subject}/${date}`);

export const fetchStudentSubjectDatewiseAttendanceApi = (
  studentId,
  subject,
  date
) => API.get(`/attendance/subjectDatewise/${studentId}/${subject}/${date}`);
