import "./AddTeacher.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { addTeacher, clearErrors } from "../../../actions/teacherAction";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.teacher);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("password", password);
    // myForm.set("department", department);
    // myForm.set("subject", subject);
    // myForm.set("subjectCode", subjectCode);

    dispatch(
      addTeacher({ name, email, password, department, subject, subjectCode })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Teacher Created Successfully");

      navigate("/AllTeachers");
      dispatch({ type: "ADD_TEACHER_RESET" });
    }
  }, [dispatch, error, navigate, success]);

  return (
    <div className="add-teacher-container">
      <div className="add-teacher-content">
        <h2>Add New Teacher</h2>
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
          <label htmlFor="department">
            <h4>Department:</h4>
            <input
              type="text"
              name="department"
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </label>
          <label htmlFor="subject">
            <h4>Subject:</h4>
            <input
              type="text"
              name="subject"
              id="subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <label htmlFor="subjectCode">
            <h4>Subject-Code:</h4>
            <input
              type="text"
              name="subjectCode"
              id="subjectCode"
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
