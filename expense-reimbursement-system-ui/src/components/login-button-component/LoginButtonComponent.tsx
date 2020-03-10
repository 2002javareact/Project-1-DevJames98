import React, { SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { LoginComponent } from "../login-component/LoginComponent";
import { Button } from "reactstrap";

export const LoginButtonComponent = (props: any) => {
  // const gotoLogin = () => {
  // let path = "/login";
  // let history = useHistory();
  // history.push(path);
  // };

  return (
    <Button
      path={"/login"}
      onClick={() => {
        props.history.push("/login");
      }}
    >
      Log In
    </Button>
  );
};

export default LoginButtonComponent;
