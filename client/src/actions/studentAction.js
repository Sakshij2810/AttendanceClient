import * as api from "../api";

//get all students
export const getAllStudents = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_STUDENT_REQUEST" });

    const { data } = await api.getAllStudentsApi();

    dispatch({ type: "GET_ALL_STUDENT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_ALL_STUDENT_FAIL",
      payload: error.response.data.message,
    });
  }
};

//add student
export const addStudent = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STUDENT_REQUEST" });

    const { data } = await api.addStudent(studentData);

    dispatch({ type: "ADD_STUDENT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADD_STUDENT_FAIL",
      payload: error.response.data.message,
    });
  }
};

//delete student
export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_STUDENT_REQUEST" });

    const { data } = await api.deleteStudent(id);

    dispatch({ type: "DELETE_STUDENT_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_STUDENT_FAIL",
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
