import { MdHome } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { IoIosPeople } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { ImBooks } from "react-icons/im";
import { BsPersonRaisedHand } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbReport } from "react-icons/tb";

export const NavlinkArrayList = [
  //student
  {
    _id: 1,
    owner: "Student",
    info: [
      {
        to: "/Student-Home",
        icon: <MdHome />,
        title: "Home",
      },
      {
        to: "/Student-Dashboard",
        icon: <MdDashboard />,
        title: "Dashboard",
      },
      {
        to: "/Student-Subjects",
        icon: <FaBook />,
        title: "Subjects",
      },
      {
        to: "/Student-MonthlyAttendance",
        icon: <MdCalendarMonth />,
        title: "Monthly Attendance",
      },
      {
        to: "/Student-OverallAttendance",
        icon: <BsPersonFillCheck />,
        title: "Overall Attendance",
      },
    ],
  },
  //HOD
  {
    _id: 2,
    owner: "HOD",
    info: [
      {
        to: "/HOD-Dashboard",
        icon: <MdDashboard />,
        title: "Dashboard",
      },

      {
        to: "/AllTeachers",
        icon: <IoIosPeople />,
        title: "Teacher Data",
      },
      {
        to: "/AllStudents",
        icon: <PiStudentBold />,
        title: "Student Data",
      },
    ],
  },
  //Teacher
  {
    _id: 3,
    owner: "Teacher",
    info: [
      {
        to: "/Teacher-Home",
        icon: <MdHome />,
        title: "Home",
      },

      {
        to: "/Teacher-AllStudents",
        icon: <PiStudentBold />,
        title: "Student Data",
      },
      {
        to: "/Teacher-TakeAttendance",
        icon: <BsPersonRaisedHand />,
        title: "Take Attendance",
      },
      {
        to: "/Students-OverallReport",
        icon: <BsGraphUpArrow />,
        title: "Overall Report",
      },
      {
        to: "/Student-Report",
        icon: <TbReport />,
        title: "Report Generation",
      },
    ],
  },
];
