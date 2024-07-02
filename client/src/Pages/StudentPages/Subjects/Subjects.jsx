import "./Subjects.css";
import React, { Fragment } from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import { subjectData } from "./SubjectsList";
import { useSelector } from "react-redux";

const Subjects = () => {
  var User = useSelector((state) => state.currentUserReducer);

  const renderSubject = () => {
    switch (User?.result?.batch) {
      case "T1":
        return subjectData[0].batch[0].subjects.map((Subject) => (
          <p key={Subject}>{Subject}</p>
        ));
      case "T2":
        return subjectData[0].batch[1].subjects.map((Subject) => (
          <p key={Subject}>{Subject}</p>
        ));
      case "T3":
        return subjectData[0].batch[2].subjects.map((Subject) => (
          <p key={Subject}>{Subject}</p>
        ));
      case "S1":
        return subjectData[1].batch[0].subjects.map((Subject) => (
          <p key={Subject}>{Subject}</p>
        ));
      case "S2":
        return subjectData[1].batch[1].subjects.map((Subject) => (
          <p key={Subject}>{Subject}</p>
        ));
      case "S3":
        return subjectData[1].batch[2].subjects.map((Subject) => (
          <p key={Subject}>{Subject}</p>
        ));

      default:
        return <></>;
    }
  };
  return (
    <div className="subject-container">
      <div className="leftsidebar">
        <LeftSidebar indexNumber={0} />
      </div>
      <div className="rightsidebar">
        <TopNavbar />

        <div className="subject-middle-contant">
          <div className="subject-headline">
            <h2>
              {User?.result?.year.charAt(0) === "T"
                ? "Third-Year"
                : "Second-Year"}
            </h2>
            <h2>|</h2>
            <h2>Batch-{User?.result?.batch}</h2>
          </div>
          <div className="subject-names">
            {User?.result?.year.charAt(0) === "T" ? (
              <Fragment>{renderSubject()}</Fragment>
            ) : (
              <Fragment>{renderSubject()}</Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
