import "./AllStudent.css";
import React, { Fragment, useEffect, useMemo } from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import Table from "../../../components/Table/Table";
import {
  clearErrors,
  getAllStudents,
  deleteStudent,
} from "../../../actions/studentAction";

import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateOrDeleteStudent
  );

  const { students, loading, error } = useSelector((state) => state.students);
  const currentTeacher = useSelector((state) => state.currentUserReducer);

  const teacherDepartment = currentTeacher?.result?.department; //TY or SY

  // Memoize the filtered students array
  const studentsBySubject = useMemo(
    () => students.filter((student) => student.year === teacherDepartment),
    [students, teacherDepartment]
  );

  const headersArray = [
    { Header: "SR NO", accessor: (row, i) => i + 1 },
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Year", accessor: "year" },
    { Header: "Batch", accessor: "batch" },
    { Header: "Contact No", accessor: "contactNo" },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div className="action-icons">
          <FaPen className="edit-icon" onClick={() => handleEdit(row)} />
          <MdDelete className="delete-icon" onClick={() => handleDelete(row)} />
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    // console.log("Edit row:", row.original);
  };

  const handleDelete = (row) => {
    const id = row.original._id;
    dispatch(deleteStudent(id));
  };

  const handleAddStudent = () => {
    navigate("/addStudent");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors(error));
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Student Deleted Successfully");
      navigate("/Teacher-AllStudents");
      dispatch({ type: "DELETE_STUDENT_RESET" });
    }

    dispatch(getAllStudents());
  }, [dispatch, error, isDeleted, deleteError, navigate]);

  return (
    <Fragment>
      {loading ? (
        <p>loading</p>
      ) : (
        <Fragment>
          <div className="teacher-container">
            <div className="leftsidebar">
              <LeftSidebar indexNumber={2} />
            </div>

            <div className="rightsidebar">
              <TopNavbar />
              <div className="middle-content">
                <div className="allteacher-table-container">
                  <Table
                    pageSize={10}
                    dataArray={studentsBySubject}
                    headersArray={headersArray}
                  />
                  <div className="add-teacher">
                    <button onClick={handleAddStudent}>
                      <div className="add-icon-teacher">
                        <MdAddCircle />
                      </div>
                      <p>Add New Student</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllStudent;
