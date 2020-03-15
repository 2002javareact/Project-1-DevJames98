import React, { SyntheticEvent } from "react";
import { User } from "../../models/User";
import { UserInfoComponent } from "../user-info/UserInfoComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { CardDeck } from "../card-deck-component/CardDeckComponent";
import { ersGetAllUsers } from "../../remote/users-ers-remote";
import NavBarComponent from "../navbar-component/NavBarComponent";

interface IViewAllUsersProps extends RouteComponentProps {
  currentUser: User;
  //allUsers: User[];
  //errorMessage: string;
  //   getAllUsersActionMapper: () => void;
}

///idk
interface IViewAllUsersState {
  allUsers: User[];
  errorMessage: string;
}

export class ViewAllUsersComponent extends React.Component<
  IViewAllUsersProps,
  IViewAllUsersState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      allUsers: [],
      errorMessage: ""
    };
  }

  getAllUsers = async () => {
    // e.preventDefault();
    try {
      console.log("call from try");

      let users = await ersGetAllUsers();
      console.log(users);

      this.setState({
        allUsers: users
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
  componentDidMount() {
    // check to see if we already have users (redux store)
    if (this.state.allUsers.length !== 0) {
      //return
      //make sure they are admin
    } else if (
      this.props.currentUser.role.role === "Admin" ||
      this.props.currentUser.role.role === "Finance-Manager"
    ) {
      //   console.log("call getAll users mapper?");
      //   this.props.getAllUsersActionMapper();

      //figure out how to get users into state
      //have constructor be an empty array
      console.log("got here");
      //try catch
      this.getAllUsers();
      //this.setState({})

      //  try {
      //    let users = ersGetAllUsers();
      //    this.setState({allUsers:users.data});
      //  } catch (error) {}
    } else {
      //they weren't admin so do nothing
      //return
    }
  }

  render() {
    console.log(this.state.allUsers);

    //turn array of users into display components
    let userDisplay = this.state.allUsers.map(ele => {
      return <UserInfoComponent currentUser={ele} key={ele.userId} />;
    });
    // console.log(this.props.currentUser.role);
    //console.log(this.props.currentUser.role.role);

    return (
      // <NavBarComponent/>
      // // check for role or redirect
      this.props.currentUser.role.role === "Admin" ||
        this.props.currentUser.role.role === "Finance-Manager" ? (
        <>
          <NavBarComponent />
          <CardDeck elementsPerRow={4}>{userDisplay}</CardDeck>
        </>
      ) : (
        <Redirect to="/" />
      )
      // <p>{console.log(this.props.currentUser)};</p>
    );
  }
}
