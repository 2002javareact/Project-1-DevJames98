import React, { SyntheticEvent } from "react";
import { LoginButtonComponent } from "../login-button-component/LoginButtonComponent";
import { Button } from "reactstrap";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { LoginComponent } from "../login-component/LoginComponent";

export class HomeComponent extends React.Component<any, any> {
  render() {
    return <LoginButtonComponent history={this.props.history} />;

    //return null;
  }
}
