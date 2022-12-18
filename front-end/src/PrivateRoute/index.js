import React, {useState} from "react";
import {useLocalState} from "../util/useLocalStorage";
import {Navigate} from "react-router-dom";
import ApiService from "../service/ApiService";
//render the props on the screen if we are authenticated and if not redirect to login page
const PrivateRoute = ({ children }) => {
  //check if jwt is present, and if yes allow
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true); //if isLoading is true we are still waiting for the return value of fetch
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    ApiService.GetTokenStatus(jwt)
      .then((response) => {
        //check to see if token is still valid
        if (response.status === 200) return response.json();
      })
      .then((tokenStatus) => {
        setIsValid(tokenStatus);
        setIsLoading(false);
      });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
