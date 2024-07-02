// import "./OverallAttendance.css";
// import React, { Fragment, useEffect, useState } from "react";
// import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar.jsx";
// import TopNavbar from "../../../components/TopNavbar/TopNavbar";
// import { Chart as ChartJS } from "chart.js/auto";
// import { Doughnut } from "react-chartjs-2";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { clearErrors, getAllStudents } from "../../../actions/studentAction.js";
// import {
//   clearAttendanceError,
//   fetchSingleStudentAttendance,
//   fetchStudentSubjectwiseAttendance,
// } from "../../../actions/attendanceAction.js";
// import Dashboard from "../Dashboard/Dashboard.jsx";

// const OverallAttendance = () => {
//   const dispatch = useDispatch();
//   const subjectSY = [
//     "SubjectSY1",
//     "SubjectSY2",
//     "SubjectSY3",
//     "SubjectSY4",
//     "SubjectSY5",
//   ];
//   const subjectTY = [
//     "SubjectTY1",
//     "SubjectTY2",
//     "SubjectTY3",
//     "SubjectTY4",
//     "SubjectTY5",
//   ];

//   const currentUser = useSelector((state) => state.currentUserReducer);
//   const { students, loading, error } = useSelector((state) => state.students);
//   const { singleStudentAttendance, attendanceLoading, attendanceError } =
//     useSelector((state) => state.singleStudentAttendance);
//   const { subjectwiseAttendance, attendanceSError, attendanceSLoading } =
//     useSelector((state) => state.subjectwiseAttendance);

//   const currentStudent =
//     students &&
//     students.filter((student) => student.email === currentUser?.result?.email);

//   const studentId = currentStudent[0]?._id;

//   const [studentYear, setStudentYear] = useState("");
//   const [subjectArray, setSubjectArray] = useState([]);
//   const [attendanceData, setAttendanceData] = useState([]);

//   //set year of student
//   useEffect(() => {
//     const year = currentStudent[0]?.year;
//     setStudentYear(year);
//   }, [currentStudent]);

//   useEffect(() => {
//     if (studentYear === "SY") {
//       setSubjectArray(subjectSY);
//     } else if (studentYear === "TY") {
//       setSubjectArray(subjectTY);
//     }
//   }, [studentYear]);

//   //handling all errors and dispatching getAllStudents
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     if (attendanceError) {
//       toast.error(attendanceError);
//       dispatch(clearAttendanceError());
//     }

//     if (attendanceSError) {
//       toast.error(attendanceSError);
//       dispatch(clearAttendanceError());
//     }

//     dispatch(getAllStudents());
//   }, [dispatch, attendanceError, attendanceSError, error]);

//   // dispatching fetchSingleStudentAttendance
//   useEffect(() => {
//     if (studentId) {
//       dispatch(fetchSingleStudentAttendance(studentId));
//     }
//   }, [dispatch, studentId]);

//   //dispatching fetchStudentSubjectwiseAttendance
//   useEffect(() => {
//     if (studentId && subjectArray.length) {
//       subjectArray.forEach((subject) => {
//         dispatch(fetchStudentSubjectwiseAttendance(studentId, subject));
//       });
//     }
//   }, [dispatch, studentId, subjectArray]);

//   //calculating percentange for each subject
//   useEffect(() => {
//     if (subjectwiseAttendance && subjectArray.length) {
//       const data = subjectArray.map((subject) => {
//         const attendance = subjectwiseAttendance[subject] || [];
//         const totalClasses = attendance.length;
//         const totalPresent = attendance.filter(
//           (att) => att.status === "present"
//         ).length;
//         return totalClasses ? (totalPresent / totalClasses) * 100 : 0;
//       });
//       setAttendanceData(data);
//     }
//   }, [subjectwiseAttendance, subjectArray]);

//   return attendanceLoading || loading || attendanceSLoading ? (
//     <p>Loading...</p>
//   ) : (
//     <Fragment>
//       <div style={{ display: "none" }}>
//         {" "}
//         <Dashboard
//           doughnutLabels={subjectArray}
//           doughnutData={attendanceData}
//         />
//       </div>
//       <div className="overallAttendance-container">
//         <div className="leftsidebar">
//           <LeftSidebar indexNumber={0} />
//         </div>
//         <div className="rightsidebar">
//           <TopNavbar />

//           <div className="overall-attendance-main">
//             <Doughnut
//               data={{
//                 labels: subjectArray,
//                 datasets: [
//                   {
//                     label: "Attendance",
//                     data: attendanceData,
//                     backgroundColor: [
//                       "rgb(204, 0, 204)",
//                       "rgb(83, 0, 83)",
//                       "rgb(163, 0, 163)",
//                       "rgb(109, 0, 109)",
//                       "rgb(255, 0, 255)",
//                     ],
//                     borderColor: [
//                       "rgb(204, 0, 204)",
//                       "rgb(83, 0, 83)",
//                       "rgb(163, 0, 163)",
//                       "rgb(109, 0, 109)",
//                       "rgb(255, 0, 255)",
//                     ],
//                   },
//                 ],
//               }}
//               height={4}
//               width={1}
//             />
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default OverallAttendance;

import "./OverallAttendance.css";
import React, { Fragment, useEffect, useState } from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar.jsx";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getAllStudents } from "../../../actions/studentAction.js";
import {
  clearAttendanceError,
  fetchSingleStudentAttendance,
  fetchStudentSubjectwiseAttendance,
} from "../../../actions/attendanceAction.js";

const OverallAttendance = () => {
  const dispatch = useDispatch();
  const subjectSY = [
    "SubjectSY1",
    "SubjectSY2",
    "SubjectSY3",
    "SubjectSY4",
    "SubjectSY5",
  ];
  const subjectTY = [
    "SubjectTY1",
    "SubjectTY2",
    "SubjectTY3",
    "SubjectTY4",
    "SubjectTY5",
  ];

  const currentUser = useSelector((state) => state.currentUserReducer);
  const { students, loading, error } = useSelector((state) => state.students);
  const { singleStudentAttendance, attendanceLoading, attendanceError } =
    useSelector((state) => state.singleStudentAttendance);
  const { subjectwiseAttendance, attendanceSError, attendanceSLoading } =
    useSelector((state) => state.subjectwiseAttendance);

  const currentStudent =
    students &&
    students.filter((student) => student.email === currentUser?.result?.email);

  const studentId = currentStudent[0]?._id;

  const [studentYear, setStudentYear] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Set year of student
  useEffect(() => {
    const year = currentStudent[0]?.year;
    setStudentYear(year);
  }, [currentStudent]);

  useEffect(() => {
    if (studentYear === "SY") {
      setSubjectArray(subjectSY);
    } else if (studentYear === "TY") {
      setSubjectArray(subjectTY);
    }
  }, [studentYear]);

  // Handle all errors and dispatch getAllStudents
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (attendanceError) {
      toast.error(attendanceError);
      dispatch(clearAttendanceError());
    }

    if (attendanceSError) {
      toast.error(attendanceSError);
      dispatch(clearAttendanceError());
    }

    dispatch(getAllStudents());
  }, [dispatch, attendanceError, attendanceSError, error]);

  // Dispatch fetchSingleStudentAttendance
  useEffect(() => {
    if (studentId) {
      dispatch(fetchSingleStudentAttendance(studentId));
    }
  }, [dispatch, studentId]);

  // Dispatch fetchStudentSubjectwiseAttendance
  useEffect(() => {
    if (studentId && subjectArray.length) {
      subjectArray.forEach((subject) => {
        dispatch(fetchStudentSubjectwiseAttendance(studentId, subject));
      });
    }
  }, [dispatch, studentId, subjectArray]);

  // Calculate percentage for each subject
  useEffect(() => {
    if (subjectwiseAttendance && subjectArray.length) {
      const data = subjectArray.map((subject) => {
        const attendance = subjectwiseAttendance[subject] || [];
        const totalClasses = attendance.length;
        const totalPresent = attendance.filter(
          (att) => att.status === "present"
        ).length;
        return totalClasses ? (totalPresent / totalClasses) * 100 : 0;
      });
      setAttendanceData(data);
    }
  }, [subjectwiseAttendance, subjectArray]);

  return attendanceLoading || loading || attendanceSLoading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <div className="overallAttendance-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={0} />
        </div>
        <div className="rightsidebar">
          <TopNavbar />

          <div className="overall-attendance-main">
            <Doughnut
              data={{
                labels: subjectArray,
                datasets: [
                  {
                    label: "Attendance",
                    data: attendanceData,
                    backgroundColor: [
                      "rgb(204, 0, 204)",
                      "rgb(83, 0, 83)",
                      "rgb(163, 0, 163)",
                      "rgb(109, 0, 109)",
                      "rgb(255, 0, 255)",
                    ],
                    borderColor: [
                      "rgb(204, 0, 204)",
                      "rgb(83, 0, 83)",
                      "rgb(163, 0, 163)",
                      "rgb(109, 0, 109)",
                      "rgb(255, 0, 255)",
                    ],
                  },
                ],
              }}
              height={4}
              width={1}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OverallAttendance;
