import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { User } from "../../models/User";
import { Redirect, RouteComponentProps } from "react-router";
import ViewReimbursementsButtonComponent from "../view-reimbursements-button-component/ViewReimbursementsButtonComponent";
import SubmitReimbursementButtonComponent from "../submit-reimbursement-button-component/SubmitReimbursementButtonComponent";
import ManageUsersButtonComponent from "../manage-users-button-component/ManageUsersButtonComponent";
import ManageReimbursementsButtonComponent from "../manage-reimbursements-button-component/ManageReimbursementsButtonComponent";

interface IProfileProps extends RouteComponentProps {
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
        <ViewReimbursementsButtonComponent history={this.props.history} />
        <SubmitReimbursementButtonComponent history={this.props.history} />
        {this.props.currentUser.role.role !== "User" ? (
          <>
            <ManageUsersButtonComponent history={this.props.history} />
            <ManageReimbursementsButtonComponent history={this.props.history} />
          </>
        ) : (
          <div></div>
        )}
        {/* put buttons to view users or reimbursements */}
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
