import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, Switch, Route } from "react-router";
import { SubmitReimbursementComponent } from "../submit-reimbursement-component/SubmitReimbursementComponent";
import { UserReimbursementsComponent } from "../user-reimbursements-component/UserReimbursementsComponent";

export class ReimbursementsComponent extends React.Component<any, any> {
  render() {
    return this.props.currentUser.userId ? (
      <>
        {/* <NavBarComponent /> */}
        <Switch>
          {/* show user reimbursements */}
          <Route
            path={`${this.props.match.path}/all-user-reimbursements`}
            render={props => (
              <UserReimbursementsComponent
                history={props.history}
                match={props.match}
                location={props.location}
                currentUser={this.props.currentUser}
              />
            )}
          />
          {/* submit reimbursement */}
          <Route
            path={`${this.props.match.path}/submit`}
            render={props => (
              <SubmitReimbursementComponent
                history={props.history}
                match={props.match}
                location={props.location}
                currentUser={this.props.currentUser}
              />
            )}
          />
        </Switch>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
