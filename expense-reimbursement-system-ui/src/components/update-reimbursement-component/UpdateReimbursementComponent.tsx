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
import { ersUpdateReimbursement } from "../../remote/reimbursements-ers-remote";
import { ReimbursementInfoComponent } from "../reimbursement-info-component/ReimbursementInfoComponent";

interface IUpdateReimbursementProps extends RouteComponentProps {
  currentUser: User;
}

///remember to put the default states for all form fields
interface IUpdateReimbursementState {
  updatedReimbursement: Reimbursement;
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

export class UpdateReimbursementComponent extends React.Component<
  IUpdateReimbursementProps,
  IUpdateReimbursementState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      updatedReimbursement: new Reimbursement(0, 0, 0, 0, 0, "", 0, 0, 0),
      reimbursementId: 0,
      author: 0,
      amount: 0,
      dateSubmitted: "",
      dateResolved: "",
      description: "",
      resolver: 0,
      status: 0,
      type: 0,
      didSubmit: false,
      errorMessage: ""
    };
  }

  // Update State functions for each field
  updateReimbursementId = (id: any) => {
    this.setState({
      reimbursementId: id.currentTarget.value
    });
  };
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
  submitUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let updatedReimbursement = await ersUpdateReimbursement(
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
      this.setState({
        updatedReimbursement: updatedReimbursement,
        reimbursementId: 0,
        author: 0,
        amount: 0,
        dateSubmitted: "",
        dateResolved: "",
        description: "",
        resolver: 0,
        status: 0,
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
      console.log(updatedReimbursement);
      console.log(this.state.updatedReimbursement.reimbursementId);
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          reimbursementId: 0,
          author: 0,
          amount: 0,
          dateSubmitted: "",
          dateResolved: "",
          description: "",
          resolver: 0,
          status: 0,
          type: 0,
          didSubmit: false,
          errorMessage: e.message
        });
      } else {
        this.setState({
          reimbursementId: 0,
          author: 0,
          amount: 0,
          dateSubmitted: "",
          dateResolved: "",
          description: "",
          resolver: 0,
          status: 0,
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
        <Form onSubmit={this.submitUpdate}>
          {/* only thing required should be the user id */}
          <FormGroup row>
            <Label for="reimbursementId" sm={2}>
              ReimbursementId:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateReimbursementId}
                value={this.state.reimbursementId}
                type="number"
                name="reimbursementId"
                id="reimbursementId"
                placeholder="ReimbursementId"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="author" sm={2}>
              Author:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateAuthor}
                value={this.state.author}
                type="number"
                name="author"
                id="author"
                placeholder="Author"
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
              />
            </Col>
          </FormGroup>
          <Button color="success">Submit</Button>
        </Form>
        {/* Have to fix error handling in the back end */}
        {this.state.errorMessage === "" ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <Toast>
            <ToastHeader icon="danger">Error!</ToastHeader>
            <ToastBody>{this.state.errorMessage}</ToastBody>
          </Toast>
        )}
        {console.log(this.state.updatedReimbursement)}
        {console.log(this.state.updatedReimbursement.reimbursementId)}
        {this.state.didSubmit === true ? (
          <ReimbursementInfoComponent
            currentReimbursement={this.state.updatedReimbursement}
            key={this.state.updatedReimbursement.reimbursementId}
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
