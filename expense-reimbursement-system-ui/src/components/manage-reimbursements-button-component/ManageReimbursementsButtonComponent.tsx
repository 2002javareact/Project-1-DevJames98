import React, { SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { LoginComponent } from "../login-component/LoginComponent";
import { Button } from "reactstrap";

export const ManageReimbursementsButtonComponent = (props: any) => {
  // const gotoLogin = () => {
  // let path = "/login";
  // let history = useHistory();
  // history.push(path);
  // };

  return (
    <Button
      className="profile-buttons"
      path={"/manage/reimbursements"}
      onClick={() => {
        props.history.push("/manage/reimbursements");
      }}
    >
      Manage Reimbursements
    </Button>
  );
};

export default ManageReimbursementsButtonComponent;
