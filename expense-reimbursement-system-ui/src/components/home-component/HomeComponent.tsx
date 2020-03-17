import React, { SyntheticEvent } from "react";
import { LoginButtonComponent } from "../login-button-component/LoginButtonComponent";
import { Button, Jumbotron, Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  RouteComponentProps
} from "react-router-dom";
import { LoginComponent } from "../login-component/LoginComponent";
import { User } from "../../models/User";

interface IHomeComponentProps extends RouteComponentProps {
  currentUser: User;
}

export class HomeComponent extends React.Component<IHomeComponentProps, any> {
  render() {
    //return <LoginButtonComponent history={this.props.history} />;
    return this.props.currentUser ? (
      // do everything
      <>
        <Jumbotron className="jumbo" fluid>
          <Container fluid>
            <h1 className="display-3">
              Welcome to The Expense Reimbursement System (ERS) API!
            </h1>
            <p className="lead">
              The Expense Reimbursement System (ERS) will manage the process of
              reimbursing employees for expenses incurred while on company time.
              All employees in the company can login and submit requests for
              reimbursement and view their past tickets and pending requests.
              Finance managers can log in and view all reimbursement requests
              and past history for all employees in the company. Finance
              managers are authorized to approve and deny requests for expense
              reimbursement.
            </p>
          </Container>
        </Jumbotron>
        <section>
          <h3>About This Project</h3>
          <p>This project was done using: </p>
          <ul>
            <li>React</li>
            <li>Axios</li>
          </ul>
        </section>
        <aside>
          {/* if no user id, load login component */}
          {this.props.currentUser.userId !== 0 ? (
            <></>
          ) : (
            <LoginButtonComponent history={this.props.history} />
          )}
        </aside>
      </>
    ) : (
      // do nothing
      <div></div>
    );
  }
}
