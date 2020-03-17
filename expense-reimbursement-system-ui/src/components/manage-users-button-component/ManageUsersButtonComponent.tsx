import React, { SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { LoginComponent } from "../login-component/LoginComponent";
import { Button } from "reactstrap";

export const ManageUsersButtonComponent = (props: any) => {
  // const gotoLogin = () => {
  // let path = "/login";
  // let history = useHistory();
  // history.push(path);
  // };

  return (
    <Button
      className="profile-buttons"
      path={"/manage/users"}
      onClick={() => {
        props.history.push("/manage/users");
      }}
    >
      Manage Users
    </Button>
  );
};

export default ManageUsersButtonComponent;
