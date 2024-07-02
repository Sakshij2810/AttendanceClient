import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import "./ReportGeneration.css";
import { clearErrors, getAllStudents } from "../../../actions/studentAction";
import {
  clearAttendanceError,
  getAllAttendance,
} from "../../../actions/attendanceAction";
import Table from "../../../components/Table/Table";

import React, { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const ReportGeneration = ({ reportStudentIdProp }) => {
  const dispatch = useDispatch();

  const { students, loading, error } = useSelector((state) => state.students);
  const currentTeacher = useSelector((state) => state.currentUserReducer);
  const { attendanceLoading, allAttendance, attendanceError } = useSelector(
    (state) => state.allAttendance
  );

  const validStudents = students?.filter(
    (student) => student && student.year === currentTeacher?.result?.department
  );

  const [searchStudent, setSearcheStudent] = useState("");
  const [totalTheoryLectures, setTotalTheoryLectures] = useState(0);
  const [totalPracticalLectures, setTotalPracticalLectures] = useState(0);

  console.log(totalTheoryLectures, totalPracticalLectures);

  const teacherSubject = currentTeacher?.result?.subject;
  const totalLectures =
    allAttendance &&
    allAttendance.filter((attendance) => attendance.subject === teacherSubject);
  //   const reportStudentId = searchStudent && searchStudent[0]._id;
  const reportStudentId = reportStudentIdProp
    ? reportStudentIdProp
    : searchStudent && searchStudent[0]._id;

  const studentReportAttendance =
    allAttendance &&
    allAttendance.filter(
      (attendance) => attendance.student === reportStudentId
    );

  const totalAttendedLectures =
    studentReportAttendance &&
    studentReportAttendance.filter(
      (attendance) => attendance.status === "present"
    );

  const practicalAttended =
    totalAttendedLectures &&
    totalAttendedLectures.filter(
      (attendance) => attendance.attendanceType === "practical"
    );

  const theoryAttended =
    totalAttendedLectures &&
    totalAttendedLectures.filter(
      (attendance) => attendance.attendanceType === "theory"
    );

  const totalNotAttendedLectures =
    studentReportAttendance &&
    studentReportAttendance.filter(
      (attendance) => attendance.status === "absent"
    );

  const practicalNotAttended =
    totalNotAttendedLectures &&
    totalNotAttendedLectures.filter(
      (attendance) => attendance.attendanceType === "practical"
    );

  const theoryNotAttended =
    totalNotAttendedLectures &&
    totalNotAttendedLectures.filter(
      (attendance) => attendance.attendanceType === "theory"
    );

  const theoryPercentange =
    (theoryAttended?.length /
      (theoryAttended?.length + theoryNotAttended?.length)) *
    100;

  const practicalPercentange =
    (practicalAttended?.length /
      (practicalAttended?.length + practicalNotAttended?.length)) *
    100;

  const handleSearchField = (value) => {
    const searchStudentValue =
      validStudents &&
      validStudents.filter((student) => student && student.name === value);

    if (searchStudentValue?.length !== 0) {
      setSearcheStudent(searchStudentValue);
    }
  };

  const headersArray = [
    {
      Header: "Theory A",
      accessor: "",
      Cell: ({ row }) => (
        <p>
          {theoryAttended?.length}{" "}
          <span style={{ color: "green" }}>present</span>
        </p>
      ),
    },
    {
      Header: "Theory NA",
      accessor: "",
      Cell: ({ row }) => (
        <p>
          {theoryNotAttended?.length}{" "}
          <span style={{ color: "red" }}>absent</span>
        </p>
      ),
    },
    {
      Header: "Practical A",
      accessor: "",
      Cell: ({ row }) => (
        <p>
          {practicalAttended?.length}{" "}
          <span style={{ color: "green" }}>present</span>
        </p>
      ),
    },
    {
      Header: "Practical NA",
      accessor: "",
      Cell: ({ row }) => (
        <p>
          {practicalNotAttended?.length}{" "}
          <span style={{ color: "red" }}>absent</span>
        </p>
      ),
    },
    {
      Header: "Total Attended ",
      accessor: "",
      Cell: ({ row }) => <p>{totalAttendedLectures?.length}</p>,
    },
    {
      Header: "Total Not-Attended ",
      accessor: "",
      Cell: ({ row }) => <p>{totalNotAttendedLectures?.length}</p>,
    },
    {
      Header: "Total Lectures",
      accessor: "",
      Cell: ({ row }) => (
        <p>{totalPracticalLectures + totalPracticalLectures}</p>
      ),
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (attendanceError) {
      toast.error(attendanceError);
      dispatch(clearAttendanceError());
    }

    dispatch(getAllStudents());
    dispatch(getAllAttendance());
  }, [dispatch, error]);

  useEffect(() => {
    // Filter and calculate totals for theory and practical lectures
    if (allAttendance && allAttendance.length > 0) {
      const theoryDates = new Set();
      const practicalDates = new Set();

      allAttendance.forEach((attendance) => {
        if (
          attendance.attendanceType === "theory" &&
          attendance.subject === teacherSubject
        ) {
          // const date = dayjs(attendance.date)
          theoryDates.add(attendance.date);
        } else if (
          attendance.attendanceType === "practical" &&
          attendance.subject === teacherSubject
        ) {
          practicalDates.add(attendance.date);
        }
      });

      setTotalTheoryLectures(theoryDates.size);

      setTotalPracticalLectures(practicalDates.size);
    } else {
      // If there's no attendance data, reset totals
      setTotalTheoryLectures(0);
      setTotalPracticalLectures(0);
    }
  }, [allAttendance, teacherSubject]);
  return loading || attendanceLoading ? (
    <p>loading...</p>
  ) : (
    <Fragment>
      <div className="report-generation-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={2} />
        </div>

        <div className="rightsidebar">
          <TopNavbar />
          <div className="report-middle-content">
            <div className="report-search-container">
              <FaSearch className="search-icon-report" />

              <input
                type="text"
                name="search"
                placeholder="search student here..."
                onChange={(e) => handleSearchField(e.target.value)}
              />
            </div>
            {searchStudent ? (
              <Fragment>
                <div className="report-attendance-div">
                  <Table
                    headersArray={headersArray}
                    dataArray={searchStudent}
                    pageSize={10}
                  />
                </div>

                <div className="report-bottom-div">
                  <div className="report-student-info">
                    <span>
                      {" "}
                      <h3>Name:</h3>
                      <p> {searchStudent[0].name}</p>
                    </span>

                    <span>
                      {" "}
                      <h3>Email:</h3> <p> {searchStudent[0].email}</p>
                    </span>
                    <span>
                      <h3>Year-Batch:</h3>
                      <p>
                        {" "}
                        {searchStudent[0].year} - {searchStudent[0].name}
                      </p>
                    </span>
                  </div>
                  <div className="report-doughnut-div">
                    <Doughnut
                      data={{
                        labels: ["Theory", "Practical"],
                        datasets: [
                          {
                            //   label: "Theory",
                            data: [theoryPercentange, practicalPercentange],
                            backgroundColor: [
                              " rgb(204, 0, 204)",
                              " rgb(83, 0, 83)",
                            ],
                            borderColor: [
                              " rgb(204, 0, 204)",
                              " rgb(83, 0, 83)",
                            ],
                          },
                        ],
                      }}
                      height={400}
                      width={1}
                    />
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="error-search-div">
                {" "}
                <p>Search for Student Report </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReportGeneration;
