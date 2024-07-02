import * as api from "../api";
import { setCurrentUser } from "./setCurrentUserAction";

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);

    dispatch({ type: "AUTH", data });

    localStorage.setItem("Profile", JSON.stringify(data)); // Save profile to local storage
    dispatch(setCurrentUser(data));

    if (authData.role === "Student") {
      navigate("/Student-Home");
    } else if (authData.role === "Teacher") {
      navigate("/Teacher-Home");
    } else if (authData.role === "HOD") {
      navigate("/HOD-Dashboard");
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);

    dispatch({ type: "AUTH", data });

    localStorage.setItem("Profile", JSON.stringify(data)); // Save profile to local storage
    dispatch(setCurrentUser(data));

    if (authData.role === "Student") {
      navigate("/Student-Home");
    } else if (authData.role === "Teacher") {
      navigate("/Teacher-Home");
    } else if (authData.role === "HOD") {
      navigate("/HOD-Dashboard");
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
