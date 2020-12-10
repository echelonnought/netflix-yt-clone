import React, { useEffect } from "react";
import "./App.css";
import Rows from "./Rows";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { auth } from "./firebase";
import { useDataLayerValues } from "./DataLayer";
import { IsUserRedirect, ProtectedRoute } from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useDataLayerValues(JSON.parse(localStorage.getItem("authUser")));
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User is logged in
        localStorage.setItem("authUser", JSON.stringify(authUser));
        
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //User is logged out
        localStorage.removeItem("authUser");
        
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      return unsubscribe;
    };
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <IsUserRedirect loggedInPath="/rows" path="/" user={user} exact>
            {" "}
            <SignIn />
          </IsUserRedirect>
          <IsUserRedirect loggedInPath="/rows" path="/signup" user={user} exact>
            {" "}
            <SignUp />
          </IsUserRedirect>
          <ProtectedRoute path="/rows" user={user} exact>
            <Rows />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
