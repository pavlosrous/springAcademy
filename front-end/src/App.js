import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";
import AssignmentView from "./AssignmentView";
import { useState } from "react";

import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import CourseView from "./CourseView";
import InstructorDashboard from "./CoderReviewerDashboard";
import NavigationBar from "./Navbar";
import RegisterView from "./RegisterView";
import AssignmentViewReviewer from "./AssignmentViewReviewer";
import SubmissionsView from "./SubmissionsView";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRoles());

  function getRoles() {
    if (jwt) {
      console.log("in jwt if " + jwt);

      const decodedJwt = jwt_decode(jwt);
      console.log(decodedJwt);
      console.log(decodedJwt.authorities);

      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            roles.find((role) => role === "ROLE_REVIEWER") ? (
              <PrivateRoute>
                {/* if jwt exists, return the children which is the dashboard */}
                <NavigationBar />
                <InstructorDashboard />
              </PrivateRoute>
            ) : roles.find((role) => role === "ROLE_ADMIN") ? (
              <PrivateRoute>
                {/* if jwt exists, return the children which is the dashboard */}
                <NavigationBar />
                <AdminDashboard />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                {/* if jwt exists, return the children which is the dashboard */}
                <NavigationBar />
                <Dashboard />
              </PrivateRoute>
            )
          }
        />
        {/*<Route*/}
        {/*  path="/api/assignments/:id"*/}
        {/*  element={*/}
        {/*    <PrivateRoute>*/}
        {/*      <AssignmentView />*/}
        {/*    </PrivateRoute>*/}
        {/*  }*/}
        {/*/>*/}
        <Route
          path="/api/cs/courses/:id"
          element={
            <PrivateRoute>
              <CourseView />
            </PrivateRoute>
          }
        />
        <Route
          path="/api/courses/register"
          element={
            <PrivateRoute>
              <NavigationBar />
              <RegisterView />
            </PrivateRoute>
          }
        />
        <Route
          path="/api/cs/courses/:id/assignments"
          element={
            <PrivateRoute>
              <NavigationBar />
              {roles.find((role) => role === "ROLE_STUDENT") ? (
                <AssignmentView />
              ) : (
                <AssignmentViewReviewer />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/api/courses/submissions"
          element={
            <PrivateRoute>
              <NavigationBar />
              <SubmissionsView />
            </PrivateRoute>
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
