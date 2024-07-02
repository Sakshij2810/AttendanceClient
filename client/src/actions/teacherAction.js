import * as api from "../api";

//get all teachers
export const getAllTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_TEACHER_REQUEST" });

    const { data } = await api.getAllTeachersApi();

    dispatch({ type: "GET_ALL_TEACHER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_ALL_TEACHER_FAIL",
      payload: error.response.data.message,
    });
  }
};

//add teacher
export const addTeacher = (teacherData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_TEACHER_REQUEST" });

    const { data } = await api.addTeacher(teacherData);

    dispatch({ type: "ADD_TEACHER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADD_TEACHER_FAIL",
      payload: error.response.data.message,
    });
  }
};

//delete teacher
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_TEACHER_REQUEST" });

    const { data } = await api.deleteTeacher(id);

    dispatch({ type: "DELETE_TEACHER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_TEACHER_FAIL",
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
