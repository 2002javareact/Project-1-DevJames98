import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, Switch, Route, RouteComponentProps } from "react-router";
import { ViewAllUsersComponent } from "../view-all-users-component/ViewAllUsersComponent";
import { User } from "../../models/User";
import { UpdateUserComponent } from "../update-user-component/UpdateUserComponent";
import { ViewAllReimbursementsComponent } from "../view-all-reimbursements-component/ViewAllReimbursementsComponent";
import { UpdateReimbursementComponent } from "../update-reimbursement-component/UpdateReimbursementComponent";
import { ViewOneUserComponent } from "../view-one-user-component/ViewOneUserComponent";

interface IManageProps extends RouteComponentProps {
  currentUser: User;
}

export class ManageComponent extends React.Component<IManageProps, any> {
  render() {
    console.log(this.props.currentUser);

    return this.props.currentUser.userId ? (
      // <>
      //   <NavBarComponent />
      // </>
      <Switch>
        {/* Don't forget the component={} */}
        {/* UpdateUser should be inside the user component */}
        {/* <Route
          path={`${this.props.match.path}/users`}
          component={ViewAllUsersComponent}

        /> */}
        <Route
          path={`${this.props.match.path}/users`}
          render={props => (
            <ViewAllUsersComponent
              history={props.history}
              match={props.match}
              location={props.location}
              currentUser={this.props.currentUser}
            />
          )}
        />
        {/* View one user */}
        <Route
          path={`${this.props.match.path}/user`}
          render={props => (
            <ViewOneUserComponent
              history={props.history}
              match={props.match}
              location={props.location}
              currentUser={this.props.currentUser}
            />
          )}
        />
        {/* update user */}
        <Route
          path={`${this.props.match.path}/update-user`}
          render={props => (
            <UpdateUserComponent
              history={props.history}
              match={props.match}
              location={props.location}
              currentUser={this.props.currentUser}
            />
          )}
        />
        {/* find reimbursement - REMEMBER TO UPDATE QUERY AND ADD FUNCTIONS FOR STATUS AND USER ID*/}
        <Route
          path={`${this.props.match.path}/reimbursements`}
          render={props => (
            <ViewAllReimbursementsComponent
              history={props.history}
              match={props.match}
              location={props.location}
              currentUser={this.props.currentUser}
            />
          )}
        />
        {/* update reimbursement */}
        <Route
          path={`${this.props.match.path}/update-reimbursement`}
          render={props => (
            <UpdateReimbursementComponent
              history={props.history}
              match={props.match}
              location={props.location}
              currentUser={this.props.currentUser}
            />
          )}
        />
      </Switch>
    ) : (
      <Redirect to="/" />
    );
  }
}
