import React from "react";

import Attendance from "../../../components/Attendace/Attendace";

const TheoryAttendance = () => {
  return (
    <div className="theoryAttendance-container">
      <Attendance attendanceType={"theory"} />
    </div>
  );
};

export default TheoryAttendance;
