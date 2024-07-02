import { useSelector } from "react-redux";
import "./Avatar.css";
import React from "react";
import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
import TopNavbar from "../TopNavbar/TopNavbar.jsx";

const Avatar = () => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  console.log(currentUser);

  const data = currentUser?.result;
  if (!data) {
    return <div>No user data available.</div>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedJoinedDate = formatDate(data.joinedOn);

  const commonFields = [
    { label: "ID", value: data._id },
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Role", value: data.role },
    { label: "Joining Date", value: formattedJoinedDate },
  ];

  let specificFields = [];
  let leftsidebarIndexNumber;

  if (data.role === "Teacher") {
    leftsidebarIndexNumber = 2;
    specificFields = [
      { label: "Department", value: data.department },
      { label: "Subject", value: data.subject },
      { label: "Subject - Code", value: data.subjectCode },
    ];
  } else if (data.role === "Student") {
    leftsidebarIndexNumber = 0;
    specificFields = [
      { label: "Year", value: data.year },
      { label: "Batch", value: data.batch },
    ];
  } else {
    leftsidebarIndexNumber = 1;
    specificFields = [];
  }

  return (
    <div className="avtar-main-container">
      <div className="leftsidebar">
        <LeftSidebar indexNumber={leftsidebarIndexNumber} />
      </div>

      <div className="rightsidebar">
        <TopNavbar />
        <div className="avatar-container">
          <div className="avatar-content">
            {commonFields.map((field) => (
              <p key={data._id}>
                <h3 className="label">{field.label}:</h3>{" "}
                <span>{field.value}</span>
              </p>
            ))}
            {specificFields.map((field) => (
              <p key={data._id}>
                <h3 className="label">{field.label}:</h3>{" "}
                <span>{field.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
