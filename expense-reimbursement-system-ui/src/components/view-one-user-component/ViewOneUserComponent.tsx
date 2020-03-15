import React, { SyntheticEvent } from "react";
import { User } from "../../models/User";
import { UserInfoComponent } from "../user-info/UserInfoComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { CardDeck } from "../card-deck-component/CardDeckComponent";
import { ersGetAllUsers, ersGetUser } from "../../remote/users-ers-remote";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Card, Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
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
      errorMessage: ""
    };
  }

  updateUserId = (id: any) => {
    this.setState({
      viewUser: new User(
        id.currentTarget.value,
        "",
        "",
        "",
        "",
        new Role(0, "")
      )
    });
  };

  getUser = async () => {
    // e.preventDefault();
    try {
      console.log("call from try");

      let user = await ersGetUser(this.state.viewUser);
      console.log(user);

      this.setState({
        viewUser: user
      });
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          errorMessage: e.message
        });
      } else {
        this.setState({
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  // runs when component starts to exist
  // componentDidMount() {
  //   // check to see if we already have users (redux store)
  //   if (this.state.viewUser === undefined) {
  //     //return
  //     //make sure they are admin
  //   } else if (
  //     this.props.currentUser.role.role === "Admin" ||
  //     this.props.currentUser.role.role === "Finance-Manager"
  //   ) {
  //     //   console.log("call getAll users mapper?");
  //     //   this.props.getAllUsersActionMapper();

  //     //figure out how to get users into state
  //     //have constructor be an empty array
  //     console.log("got here");
  //     //try catch
  //     this.getUser();
  //     //this.setState({})

  //     //  try {
  //     //    let users = ersGetAllUsers();
  //     //    this.setState({allUsers:users.data});
  //     //  } catch (error) {}
  //   } else {
  //     //they weren't admin so do nothing
  //     //return
  //   }
  // }

  render() {
    console.log(this.state.viewUser);

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
          <NavBarComponent />
          {/* <CardDeck elementsPerRow={4}>{userDisplay}</CardDeck> */}
          <Form onSubmit={this.getUser}>
            {/* only thing required should be the user id */}
            <FormGroup row>
              <Label for="userId" sm={2}>
                UserId:
              </Label>
              <Col sm={6}>
                <Input
                  onChange={this.updateUserId}
                  value={this.state.viewUser.userId}
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="UserId"
                  required
                />
              </Col>
            </FormGroup>
            <Button color="info">Submit</Button>
          </Form>
          {/* <Card>{this.state.viewUser}</Card> */}
        </>
      ) : (
        <Redirect to="/" />
        // <Card>{this.state.viewUser}</Card>
      )
      // <p>{console.log(this.props.currentUser)};</p>
    );
  }
}
