import React, { SyntheticEvent } from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { User } from "../../models/User";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { ersUpdateUser } from "../../remote/users-ers-remote";

interface IUpdateUserProps extends RouteComponentProps {
  currentUser: User;
}

///remember to put the default states for all form fields
interface IUpdateUserState {
  updatedUser: User | undefined;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  errorMessage: string;
}

export class UpdateUserComponent extends React.Component<
  IUpdateUserProps,
  IUpdateUserState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      updatedUser: undefined,
      userId: 0,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      role: 0,
      errorMessage: ""
    };
  }

  // Update State functions for each field
  updateUserId = (id: any) => {
    this.setState({
      userId: id.currentTarget.value
    });
  };
  updateUsername = (name: any) => {
    this.setState({
      username: name.currentTarget.value
    });
  };
  updateFirstName = (first: any) => {
    this.setState({
      firstName: first.currentTarget.value
    });
  };
  updateLastName = (last: any) => {
    this.setState({
      lastName: last.currentTarget.value
    });
  };
  updateEmail = (e: any) => {
    this.setState({
      email: e.currentTarget.value
    });
  };
  updateRole = (id: any) => {
    this.setState({
      role: id.currentTarget.value
    });
  };

  // Function to submit update to db
  submitUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let updatedUser = await ersUpdateUser(
        this.state.userId,
        this.state.username,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.role
      );
      this.setState({
        updatedUser: updatedUser
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
      console.log(updatedUser);
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          userId: 0,
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          role: 0,
          errorMessage: e.message
        });
      } else {
        this.setState({
          userId: 0,
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          role: 0,
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  //figure out how to display new html after user is successfully updated
  render() {
    return this.props.currentUser.role.role === "Admin" ? (
      <>
        <NavBarComponent />
        {/* Form to submit all fields that you want to update */}
        <Form onSubmit={this.submitUpdate}>
          {/* only thing required should be the user id */}
          <FormGroup row>
            <Label for="userId" sm={2}>
              UserId:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateUserId}
                value={this.state.userId}
                type="text"
                name="userId"
                id="userId"
                placeholder="UserId"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="username" sm={2}>
              Username:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateUsername}
                value={this.state.username}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="first-name" sm={2}>
              First Name:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateFirstName}
                value={this.state.firstName}
                type="text"
                name="first-name"
                id="first-name"
                placeholder="First Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="last-name" sm={2}>
              Last Name:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateLastName}
                value={this.state.lastName}
                type="text"
                name="last-name"
                id="last-name"
                placeholder="Last Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>
              Email:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateEmail}
                value={this.state.email}
                type="text"
                name="email"
                id="email"
                placeholder="Email"
              />
            </Col>
          </FormGroup>
          {/* Inputted Role should be the Role ID */}
          <FormGroup row>
            <Label for="role" sm={2}>
              Role:
            </Label>
            <Col sm={6}>
              <Input
                onChange={this.updateRole}
                value={this.state.role}
                type="text"
                name="role"
                id="role"
                placeholder="Role"
              />
            </Col>
          </FormGroup>
          <Button color="info">Submit</Button>
        </Form>
        {/* <p>{this.state.updatedUser}</p> */}
      </>
    ) : (
      // <Redirect to="/" />
      <Redirect to={`${this.props.match.path}/user`} />
    );
  }
}
