import React, { SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { LoginComponent } from "../login-component/LoginComponent";
import { Button } from "reactstrap";

export const SubmitReimbursementButtonComponent = (props: any) => {
  // const gotoLogin = () => {
  // let path = "/login";
  // let history = useHistory();
  // history.push(path);
  // };

  return (
    <Button
      className="profile-buttons"
      path={"/reimbursements/submit"}
      onClick={() => {
        props.history.push("/reimbursements/submit");
      }}
    >
      Submit A Reimbursement
    </Button>
  );
};

export default SubmitReimbursementButtonComponent;
