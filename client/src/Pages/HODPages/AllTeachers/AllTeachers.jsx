import "./AllTeachers.css";
import React, { Fragment, useEffect } from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import Table from "../../../components/Table/Table";
import {
  clearErrors,
  getAllTeachers,
  deleteTeacher,
} from "../../../actions/teacherAction";

import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AllTeachers = () => {
  const headersArray = [
    { Header: "SR NO", accessor: (row, i) => i + 1 },
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Department", accessor: "department" },
    { Header: "Subject", accessor: "subject" },
    { Header: "Subject-Code", accessor: "subjectCode" },
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
    dispatch(deleteTeacher(id));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateOrDeleteTeacher
  );

  const { teachers, loading, error } = useSelector((state) => state.teachers);

  const handleAddTeacher = () => {
    navigate("/addTeacher");
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
      toast.success("Teacher Deleted Successfully");
      navigate("/AllTeachers");
      dispatch({ type: "DELETE_TEACHER_RESET" });
    }

    dispatch(getAllTeachers());
  }, [dispatch, error, isDeleted, deleteError, navigate]);

  return (
    <Fragment>
      {loading ? (
        <p>loading</p>
      ) : (
        <Fragment>
          <div className="teacher-container">
            <div className="leftsidebar">
              <LeftSidebar indexNumber={1} />
            </div>

            <div className="rightsidebar">
              <TopNavbar />
              <div className="middle-content">
                <div className="allteacher-table-container">
                  <Table
                    pageSize={10}
                    dataArray={teachers}
                    headersArray={headersArray}
                  />
                  <div className="add-teacher">
                    <button onClick={handleAddTeacher}>
                      <div className="add-icon-teacher">
                        <MdAddCircle />
                      </div>
                      <p>Add New Teacher</p>
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

export default AllTeachers;
