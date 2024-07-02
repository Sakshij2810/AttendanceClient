//get all student
export const allStudentReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_STUDENT_REQUEST":
      return {
        loading: true,
        students: [],
      };

    case "GET_ALL_STUDENT_SUCCESS":
      return {
        loading: false,
        students: action.payload,
      };

    case "GET_ALL_STUDENT_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//add student
export const addStudentReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case "ADD_STUDENT_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "ADD_STUDENT_SUCCESS":
      return {
        loading: false,
        student: action.payload,
        success: true,
      };

    case "ADD_STUDENT_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "ADD_STUDENT_RESET":
      return {
        ...state,
        success: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//update or delete student
export const updateOrDeleteStudent = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_STUDENT_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_STUDENT_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "DELETE_STUDENT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_STUDENT_RESET":
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};
