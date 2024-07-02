import * as api from "../api";

//add attendance
export const addAttendance = (attendanceData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_ATTENDANCE_REQUEST" });

    const { data } = await api.addAttendanceApi(attendanceData);

    dispatch({ type: "ADD_ATTENDANCE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADD_ATTENDANCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

//get all attendance
export const getAllAttendance = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ATTENDANCE_REQUEST" });

    const { data } = await api.getAllAttendanceApi();
    dispatch({ type: "ALL_ATTENDANCE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ALL_ATTENDANCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

//fetch date wise attendance
export const fetchAttendanceByDate = (date) => async (dispatch) => {
  try {
    dispatch({ type: "ATTENDANCE_BY_DATE_REQUEST" });

    const { data } = await api.fetchAttendanceByDateApi(date);
    dispatch({ type: "ATTENDANCE_BY_DATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ATTENDANCE_BY_DATE_FAIL",
      payload: error.response.data.message,
    });
  }
};

//single student overall attendance
export const fetchSingleStudentAttendance = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: "STUDENT_ATTENDANCE_REQUEST" });

    const { data } = await api.fetchSingleStudentAttendanceApi(studentId);
    dispatch({ type: "STUDENT_ATTENDANCE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "STUDENT_ATTENDANCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

// fetching attendance by subject
export const fetchStudentSubjectwiseAttendance =
  (studentId, subject) => async (dispatch) => {
    try {
      dispatch({ type: "SUBJECTWISE_ATTENDANCE_REQUEST" });

      const { data } = await api.fetchStudentSubjectwiseAttendanceApi(
        studentId,
        subject
      );

      dispatch({
        type: "SUBJECTWISE_ATTENDANCE_SUCCESS",
        payload: { subject, attendance: data },
      });
    } catch (error) {
      dispatch({
        type: "SUBJECTWISE_ATTENDANCE_FAIL",
        payload: error.response.data.message,
      });
    }
  };

// fetching attendance by subject

export const fetchStudentSubjectDatewiseAttendance =
  (studentId, subject, date) => async (dispatch) => {
    try {
      dispatch({ type: "SUBJECTDATEWISE_ATTENDANCE_REQUEST" });

      const { data } = await api.fetchStudentSubjectDatewiseAttendanceApi(
        studentId,
        subject,
        date
      );

      dispatch({
        type: "SUBJECTDATEWISE_ATTENDANCE_SUCCESS",
        payload: { subject, attendance: data },
      });
    } catch (error) {
      dispatch({
        type: "SUBJECTDATEWISE_ATTENDANCE_FAIL",
        payload: error.response.data.message,
      });
    }
  };

//get daily attendance
export const getDailyAttendance = () => async (dispatch) => {
  try {
    dispatch({ type: "DAILY_ATTENDANCE_REQUEST" });

    const { data } = await api.getDailyAttendanceApi();

    dispatch({ type: "DAILY_ATTENDANCE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DAILY_ATTENDANCE_FAIL",
      payload: error.response.data.message,
    });
  }
};

//clear errors
export const clearAttendanceError = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
