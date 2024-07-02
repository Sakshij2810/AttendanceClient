//add attendance
export const addAttendanceReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case "ADD_ATTENDANCE_REQUEST":
      return {
        ...state,
        attendanceLoading: true,
      };

    case "ADD_ATTENDANCE_SUCCESS":
      return {
        attendanceLoading: false,
        studentAttendance: action.payload,
        success: true,
      };

    case "ADD_ATTENDANCE_FAIL":
      return {
        attendanceLoading: false,
        attendanceError: action.payload,
      };

    case "ADD_ATTENDANCE_RESET":
      return {
        ...state,
        success: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceError: null,
      };
    default:
      return state;
  }
};

//get all attendance
export const allAttendanceReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "ALL_ATTENDANCE_REQUEST":
      return {
        attendanceLoading: true,
        allAttendance: [],
      };

    case "ALL_ATTENDANCE_SUCCESS":
      return {
        attendanceLoading: false,
        allAttendance: action.payload,
      };

    case "ALL_ATTENDANCE_FAIL":
      return {
        attendanceLoading: false,
        attendanceError: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceError: null,
      };
    default:
      return state;
  }
};

//fetch attendance by date
export const attendanceByDateReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "ATTENDANCE_BY_DATE_REQUEST":
      return {
        attendanceLoading: true,
        ...state,
      };

    case "ATTENDANCE_BY_DATE_SUCCESS":
      return {
        attendanceLoading: false,
        attendanceByDateValue: action.payload,
      };

    case "ATTENDANCE_BY_DATE_FAIL":
      return {
        attendanceLoading: false,
        attendanceError: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceError: null,
      };
    default:
      return state;
  }
};

//get single student attendance
export const singleStudentAttendanceReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case "STUDENT_ATTENDANCE_REQUEST":
      return {
        attendanceLoading: true,
      };

    case "STUDENT_ATTENDANCE_SUCCESS":
      return {
        attendanceLoading: false,
        singleStudentAttendance: action.payload,
      };

    case "STUDENT_ATTENDANCE_FAIL":
      return {
        attendanceLoading: false,
        attendanceError: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceError: null,
      };
    default:
      return state;
  }
};

//studentSubjectwiseAttendanceReducer
const initialState = {
  subjectwiseAttendance: {},
  attendanceSLoading: false,
  attendanceSError: null,
};

export const studentSubjectwiseAttendanceReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SUBJECTWISE_ATTENDANCE_REQUEST":
      return {
        ...state,
        attendanceSLoading: true,
      };
    case "SUBJECTWISE_ATTENDANCE_SUCCESS":
      return {
        ...state,
        attendanceSLoading: false,
        subjectwiseAttendance: {
          ...state.subjectwiseAttendance,
          [action.payload.subject]: action.payload.attendance,
        },
      };
    case "SUBJECTWISE_ATTENDANCE_FAIL":
      return {
        ...state,
        attendanceSLoading: false,
        attendanceSError: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceSError: null,
      };
    default:
      return state;
  }
};

//studentSubjectwiseAttendanceReducer
// const initialStateDate = {
//   subjectDatewiseAttendance: {},
//   attendanceSLoading: false,
//   attendanceSError: null,
// };

// export const studentSubjectDatewiseAttendanceReducer = (
//   state = initialStateDate,
//   action
// ) => {
//   switch (action.type) {
//     case "SUBJECTDATEWISE_ATTENDANCE_REQUEST":
//       return {
//         ...state,
//         attendanceSLoading: true,
//       };
//     case "SUBJECTDATEWISE_ATTENDANCE_SUCCESS":
//       return {
//         ...state,
//         attendanceSLoading: false,
//         subjectDatewiseAttendance: {
//           ...state.subjectDatewiseAttendance,
//           [action.payload.subject]: action.payload.attendance,
//         },
//       };
//     case "SUBJECTDATEWISE_ATTENDANCE_FAIL":
//       return {
//         ...state,
//         attendanceSLoading: false,
//         attendanceSError: action.payload,
//       };
//     case "CLEAR_ERRORS":
//       return {
//         ...state,
//         attendanceSError: null,
//       };
//     default:
//       return state;
//   }
// };

// reducers/studentSubjectDatewiseAttendanceReducer.js
const initialStateDate = {
  subjectDatewiseAttendance: {},
  attendanceSLoading: false,
  attendanceSError: null,
};

export const studentSubjectDatewiseAttendanceReducer = (
  state = initialStateDate,
  action
) => {
  switch (action.type) {
    case "SUBJECTDATEWISE_ATTENDANCE_REQUEST":
      return {
        ...state,
        attendanceSLoading: true,
      };
    case "SUBJECTDATEWISE_ATTENDANCE_SUCCESS":
      return {
        ...state,
        attendanceSLoading: false,
        subjectDatewiseAttendance: {
          ...state.subjectDatewiseAttendance,
          [action.payload.subject]: action.payload.attendance,
        },
      };
    case "SUBJECTDATEWISE_ATTENDANCE_FAIL":
      return {
        ...state,
        attendanceSLoading: false,
        attendanceSError: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceSError: null,
      };
    default:
      return state;
  }
};

//daily attendance
export const dailyAttendanceReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "DAILY_ATTENDANCE_REQUEST":
      return {
        attendanceSLoading: true,
      };
    case "DAILY_ATTENDANCE_SUCCESS":
      return {
        attendanceSLoading: false,
        dailyAttendanceData: action.payload,
      };
    case "DAILY_ATTENDANCE_FAIL":
      return {
        attendanceSLoading: false,
        attendanceSError: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        attendanceSError: null,
      };
    default:
      return state;
  }
};
