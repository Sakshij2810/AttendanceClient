import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import LeftSidebar from "../LeftSidebar/LeftSidebar";
import TopNavbar from "../TopNavbar/TopNavbar";
import Table from "../Table/Table.jsx";
import { clearErrors, getAllStudents } from "../../actions/studentAction";

const StudentCategory = ({ batch }) => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  const [studentCategoryData, setStudentCategoryData] = useState([]);

  useEffect(() => {
    if (batch === "S1") {
      const data = students && students.filter((std) => std.batch === batch);
      setStudentCategoryData(data);
    } else if (batch === "S2") {
      const data = students && students.filter((std) => std.batch === batch);
      setStudentCategoryData(data);
    } else if (batch === "S3") {
      const data = students && students.filter((std) => std.batch === batch);
      setStudentCategoryData(data);
    } else if (batch === "T1") {
      const data = students && students.filter((std) => std.batch === batch);
      setStudentCategoryData(data);
    } else if (batch === "T2") {
      const data = students && students.filter((std) => std.batch === batch);
      setStudentCategoryData(data);
    } else if (batch === "T3") {
      const data = students && students.filter((std) => std.batch === batch);
      setStudentCategoryData(data);
    }
  }, [batch, students]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllStudents());
  }, [dispatch, error]);

  const headersArray = [
    {
      Header: "SR NO",
      accessor: (row, i) => i + 1,
    },
    { Header: "ID", accessor: "_id" },
    { Header: "Name", accessor: "name" },

    { Header: "Email", accessor: "email" },
    { Header: "Batch", accessor: "batch" },
    { Header: "Year", accessor: "year" },

    { Header: "Contact No", accessor: "contactNo" },
  ];
  return loading ? (
    <p>loading...</p>
  ) : (
    <Fragment>
      <div className="student-container">
        <div className="leftsidebar">
          <LeftSidebar indexNumber={1} />
        </div>

        <div className="rightsidebar">
          <TopNavbar />
          <div className="middle-content">
            <Table
              pageSize={10}
              dataArray={studentCategoryData}
              headersArray={headersArray}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentCategory;
