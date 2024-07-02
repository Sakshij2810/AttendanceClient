import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "./actions/setCurrentUserAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Profile"));

    if (user) {
      dispatch(setCurrentUser(user));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
