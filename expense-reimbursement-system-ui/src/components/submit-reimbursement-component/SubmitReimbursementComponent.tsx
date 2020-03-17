import React, { SyntheticEvent } from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { User } from "../../models/User";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";
import { ersUpdateUser } from "../../remote/users-ers-remote";
import { Reimbursement } from "../../models/Reimbursement";
import { ersSubmitReimbursement } from "../../remote/reimbursements-ers-remote";
import { ReimbursementInfoComponent } from "../reimbursement-info-component/ReimbursementInfoComponent";

interface ISubmitReimbursementProps extends RouteComponentProps {
  currentUser: User;
}

///remember to put the default states for all form fields
interface ISubmitReimbursementState {
  submittedReimbursement: Reimbursement;
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: any;
  dateResolved: any;
  description: string;
  resolver: number;
  status: number;
  type: number;
  didSubmit: boolean;
  errorMessage: string;
}

export class SubmitReimbursementComponent extends React.Component<
  ISubmitReimbursementProps,
  ISubmitReimbursementState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      submittedReimbursement: new Reimbursement(0, 0, 0, 0, 0, "", 0, 0, 0),
      reimbursementId: 0,
      author: this.props.currentUser.userId,
      amount: 0,
      dateSubmitted: "",
      dateResolved: "",
      description: "",
      resolver: 0,
      status: 1,
      type: 0,
      didSubmit: false,
      errorMessage: ""
    };
  }

  // Update State functions for each field
  updateAuthor = (a: any) => {
    this.setState({
      author: a.currentTarget.value
    });
  };
  updateAmount = (am: any) => {
    this.setState({
      amount: am.currentTarget.value
    });
  };
  updateDateSubmitted = (ds: any) => {
    this.setState({
      dateSubmitted: ds.currentTarget.value
    });
  };
  updateDateResolved = (dr: any) => {
    this.setState({
      dateResolved: dr.currentTarget.value
    });
  };
  updateDescription = (desc: any) => {
    this.setState({
      description: desc.currentTarget.value
    });
  };
  updateResolver = (r: any) => {
    this.setState({
      resolver: r.currentTarget.value
    });
  };
  updateStatus = (stat: any) => {
    this.setState({
      status: stat.currentTarget.value
    });
  };
  updateType = (t: any) => {
    this.setState({
      type: t.currentTarget.value
    });
  };

  // Function to submit update to db
  submitReimbursement = async (e: SyntheticEvent) => {
    console.log(this.state.dateSubmitted);

    e.preventDefault();
    try {
      let submittedReimbursement = await ersSubmitReimbursement(
        this.state.reimbursementId,
        this.state.author,
        this.state.amount,
        this.state.dateSubmitted,
        this.state.dateResolved,
        this.state.description,
        this.state.resolver,
        this.state.status,
        this.state.type
      );
      console.log(submittedReimbursement);

      this.setState({
        submittedReimbursement: submittedReimbursement,
        reimbursementId: 0,
        author: this.props.currentUser.userId,
        amount: 0,
        dateSubmitted: "",
        dateResolved: "",
        description: "",
        resolver: 0,
        status: 1,
        type: 0,
        didSubmit: true
      });
      //I DONT HAVE TO SET STATE?
      //Sets the user in App.tsx
      //this.props.updateUser(user);
      //            this.setState({
      //              userToUpdate: updatedUser,
      //              userId: userId,
      // username: string,
      // firstName: string,
      // lastName: string,
      // email: string,
      // role: number
      //            });
      console.log(submittedReimbursement);
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          reimbursementId: 0,
          author: this.props.currentUser.userId,
          amount: 0,
          dateSubmitted: "",
          dateResolved: "",
          description: "",
          resolver: 0,
          status: 1,
          type: 0,
          didSubmit: false,
          errorMessage: e.message
        });
      } else {
        this.setState({
          reimbursementId: 0,
          author: this.props.currentUser.userId,
          amount: 0,
          dateSubmitted: "",
          dateResolved: "",
          description: "",
          resolver: 0,
          status: 1,
          type: 0,
          didSubmit: false,
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  //figure out how to display new html after user is successfully updated
  render() {
    return this.props.currentUser.role.role === "Admin" ? (
      <>
        {/* Form to submit all fields that you want to update */}
        <Form onSubmit={this.submitReimbursement}>
          <FormGroup row>
            <Label for="author" sm={2}>
              Author:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateAuthor}
                value={this.props.currentUser.userId}
                type="number"
                name="author"
                id="author"
                placeholder="Author"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="amount" sm={2}>
              Amount:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateAmount}
                value={this.state.amount}
                type="number"
                name="amount"
                id="amount"
                placeholder="Amount"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="dateSubmitted" sm={2}>
              Date Submitted:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateDateSubmitted}
                value={this.state.dateSubmitted}
                type="date"
                name="dateSubmitted"
                id="dateSubmitted"
                placeholder="Date Submitted"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="dateResolved" sm={2}>
              Date Resolved:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateDateResolved}
                value={this.state.dateResolved}
                type="date"
                name="dateResolved"
                id="dateResolved"
                placeholder="Date Resolved"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={2}>
              Description:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateDescription}
                value={this.state.description}
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                required
              />
            </Col>
          </FormGroup>
          {/* Inputted Resolver should be the User ID of resolver */}
          <FormGroup row>
            <Label for="resolver" sm={2}>
              Resolver:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateResolver}
                value={this.state.resolver}
                type="number"
                name="resolver"
                id="resolver"
                placeholder="Resolver"
                required
              />
            </Col>
          </FormGroup>
          {/* Inputted Status should be the Status ID */}
          <FormGroup row>
            <Label for="status" sm={2}>
              Status:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateStatus}
                value={this.state.status}
                type="number"
                name="status"
                id="status"
                placeholder="Status"
                required
              />
            </Col>
          </FormGroup>
          {/* Inputted Type should be the Type ID */}
          <FormGroup row>
            <Label for="type" sm={2}>
              Type:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateType}
                value={this.state.type}
                type="number"
                name="type"
                id="type"
                placeholder="Type"
                required
              />
            </Col>
          </FormGroup>
          <Button color="success">Submit</Button>
        </Form>
        {this.state.errorMessage === "" ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <Toast>
            <ToastHeader icon="danger">Error!</ToastHeader>
            <ToastBody>{this.state.errorMessage}</ToastBody>
          </Toast>
        )}
        {this.state.didSubmit === true ? (
          <ReimbursementInfoComponent
            currentReimbursement={this.state.submittedReimbursement}
            key={this.state.submittedReimbursement.reimbursementId}
          />
        ) : (
          <p></p>
        )}
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
