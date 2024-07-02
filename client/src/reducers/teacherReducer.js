//get all teacher
export const allTeacherReducer = (state = { teachers: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_TEACHER_REQUEST":
      return {
        loading: true,
        teachers: [],
      };

    case "GET_ALL_TEACHER_SUCCESS":
      return {
        loading: false,
        teachers: action.payload,
      };

    case "GET_ALL_TEACHER_FAIL":
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

//add teacher
export const addTeacherReducer = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case "ADD_TEACHER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "ADD_TEACHER_SUCCESS":
      return {
        loading: false,
        teacher: action.payload,
        success: true,
      };

    case "ADD_TEACHER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "ADD_PRODUCT_RESET":
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

//update or delete teacher
export const updateOrDeleteTeacher = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_TEACHER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_TEACHER_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "DELETE_TEACHER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_PRODUCT_RESET":
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};
