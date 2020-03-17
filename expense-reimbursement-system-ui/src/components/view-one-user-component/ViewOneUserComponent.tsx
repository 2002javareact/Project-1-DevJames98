import React, { SyntheticEvent } from "react";
import { User } from "../../models/User";
import { UserInfoComponent } from "../user-info/UserInfoComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { CardDeck } from "../card-deck-component/CardDeckComponent";
import { ersGetAllUsers, ersGetUser } from "../../remote/users-ers-remote";
import NavBarComponent from "../navbar-component/NavBarComponent";
import {
  Card,
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
import { Role } from "../../models/Role";

interface IViewOneUserProps extends RouteComponentProps {
  currentUser: User;
  //allUsers: User[];
  //errorMessage: string;
  //   getAllUsersActionMapper: () => void;
}

///idk
interface IViewOneUserState {
  viewUser: User;
  searchId: number;
  didSubmit: boolean;
  errorMessage: string;
}

export class ViewOneUserComponent extends React.Component<
  IViewOneUserProps,
  IViewOneUserState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewUser: new User(0, "", "", "", "", new Role(0, "")),
      searchId: 0,
      didSubmit: false,
      errorMessage: ""
    };
  }
  //add search id and
  updateSearchId = (idEvent: any) => {
    this.setState({
      searchId: idEvent.currentTarget.value
    });
  };

  getUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      console.log("call from try");

      let user = await ersGetUser(this.state.searchId);
      console.log(user);

      this.setState({
        viewUser: user,
        didSubmit: true,
        errorMessage: ""
      });
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          didSubmit: false,
          errorMessage: e.message
        });
      } else {
        this.setState({
          didSubmit: false,
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  render() {
    //console.log(this.state.viewUser);
    console.log(this.state.searchId);

    //turn array of users into display components
    // let userDisplay = this.state.allUsers.map(ele => {
    //   return <UserInfoComponent currentUser={ele} key={ele.userId} />;
    // });

    // console.log(this.props.currentUser.role);
    //console.log(this.props.currentUser.role.role);

    return (
      // <NavBarComponent/>
      // // check for role or redirect
      this.props.currentUser.role.role === "Admin" ||
        this.props.currentUser.role.role === "Finance-Manager" ? (
        <>
          {/* <CardDeck elementsPerRow={4}>{userDisplay}</CardDeck> */}
          <Form onSubmit={this.getUser}>
            {/* only thing required should be the user id */}
            <FormGroup row>
              <Label for="userId" sm={2}>
                UserId:
              </Label>
              <Col sm={6}>
                <Input
                  onChange={this.updateSearchId}
                  value={this.state.searchId}
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="UserId"
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
            <UserInfoComponent
              currentUser={this.state.viewUser}
              key={this.state.viewUser.userId}
            />
          ) : (
            <p></p>
          )}
        </>
      ) : (
        <Redirect to="/" />
        // <Card>{this.state.viewUser}</Card>
      )
      // <p>{console.log(this.props.currentUser)};</p>
    );
  }
}
