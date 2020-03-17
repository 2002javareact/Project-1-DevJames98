import React, { SyntheticEvent } from "react";
import { User } from "../../models/User";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Button,
  Input,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";
import { ersLogin } from "../../remote/login-ers";
import { Redirect } from "react-router";

interface ILoginProps {
  updateUser: (u: User) => void;
}

interface ILoginComponentState {
  username: string;
  password: string;
  errorMessage: string;
  user: User | undefined;
}

export class LoginComponent extends React.Component<
  ILoginProps,
  ILoginComponentState
> {
  // Default login component fields
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      user: undefined
    };
  }

  // Functions to update the state of user/pass fields dynamically
  updateUser = (name: any) => {
    this.setState({
      username: name.currentTarget.value
    });
  };
  updatePassword = (pass: any) => {
    this.setState({
      password: pass.currentTarget.value
    });
  };

  //Function to submit the login form
  submitLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let user = await ersLogin(this.state.username, this.state.password);
      //Sets the user in App.tsx
      this.props.updateUser(user);
      this.setState({
        user: user,
        username: "",
        password: ""
      });
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          password: "",
          errorMessage: e.message
        });
      } else {
        this.setState({
          password: "",
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  render() {
    return (
      //Redirect to page after successful login (if user exists)

      this.state.user ? (
        <Redirect to="/profile" />
      ) : (
        // Form for login
        <>
          <Form onSubmit={this.submitLogin}>
            <FormGroup row>
              <Label for="username" sm={2}>
                Username:
              </Label>
              <Col sm={6}>
                <Input
                  onChange={this.updateUser}
                  value={this.state.username}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={2}>
                Password:
              </Label>
              <Col sm={6}>
                <Input
                  onChange={this.updatePassword}
                  value={this.state.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
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
        </>
      )
    );
  }
}
