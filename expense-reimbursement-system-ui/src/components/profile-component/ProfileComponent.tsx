import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { User } from "../../models/User";
import { Redirect } from "react-router";

interface IProfileProps {
  currentUser: User;
}

export class ProfileComponent extends React.Component<IProfileProps, any> {
  render() {
    return this.props.currentUser.userId ? (
      <>
        <h1>{`Welcome Back, ${this.props.currentUser.firstName} ${this.props.currentUser.lastName}!`}</h1>
        <h4>{`Username: ${this.props.currentUser.username}`}</h4>
        <h4>{`Email: ${this.props.currentUser.email}`}</h4>
        <h4>{`Role: ${this.props.currentUser.role.role}`}</h4>
        {console.log(this.props.currentUser)}
        {/* put buttons to view and submit reimbursements */}
        {/* put buttons to view users or reimbursements */}
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
