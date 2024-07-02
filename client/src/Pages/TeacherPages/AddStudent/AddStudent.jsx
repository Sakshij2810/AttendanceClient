import "./AddStudent.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { addStudent, clearErrors } from "../../../actions/studentAction";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.student);
  const currentTeacher = useSelector((state) => state.currentUserReducer);

  const studentYear = currentTeacher?.result?.department; //SY

  // Memoize the filtered students array
  // const studentsBySubject = useMemo(
  //   () => students.filter((student) => student.year === teacherDepartment),
  //   [students, teacherDepartment]
  // );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [batch, setBatch] = useState("");
  const [contactNo, setContactNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addStudent({ name, email, password, year: studentYear, batch, contactNo })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Student Created Successfully");

      navigate("/Teacher-AllStudents");
      dispatch({ type: "ADD_STUDENT_RESET" });
    }
  }, [dispatch, error, navigate, success]);

  return (
    <div className="add-teacher-container">
      <div className="add-teacher-content">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <h4>Name:</h4>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <h4>Email:</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <h4>Password:</h4>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="year">
            <h4>Year:</h4>
            <input
              type="text"
              name="year"
              id="year"
              value={studentYear}
              onChange={() => setYear(studentYear)}
            />
          </label>
          <label htmlFor="batch">
            <h4>Batch:</h4>
            <input
              type="text"
              name="batch"
              id="batch"
              onChange={(e) => setBatch(e.target.value)}
            />
          </label>

          <label htmlFor="contactNo">
            <h4>Contact No:</h4>
            <input
              type="text"
              name="contactNo"
              id="contactNo"
              onChange={(e) => setContactNo(e.target.value)}
            />
          </label>

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
