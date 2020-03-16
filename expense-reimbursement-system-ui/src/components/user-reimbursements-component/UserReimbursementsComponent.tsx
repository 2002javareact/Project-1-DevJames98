import React, { SyntheticEvent } from "react";
import { User } from "../../models/User";
import { UserInfoComponent } from "../user-info/UserInfoComponent";
import { Redirect, RouteComponentProps } from "react-router";
import { CardDeck } from "../card-deck-component/CardDeckComponent";
import { ersGetAllUsers } from "../../remote/users-ers-remote";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { Reimbursement } from "../../models/Reimbursement";
import {
  ersGetAllReimbursements,
  ersGetReimbursementsByStatus,
  ersGetReimbursementsByUserId
} from "../../remote/reimbursements-ers-remote";
import { ReimbursementInfoComponent } from "../reimbursement-info-component/ReimbursementInfoComponent";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";

interface IUserReimbursementsProps extends RouteComponentProps {
  currentUser: User;
  //allUsers: User[];
  //errorMessage: string;
  //   getAllUsersActionMapper: () => void;
}

///idk
interface IUserReimbursementsState {
  userReimbursements: Reimbursement[];
  errorMessage: string;
}

export class UserReimbursementsComponent extends React.Component<
  IUserReimbursementsProps,
  IUserReimbursementsState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      userReimbursements: [],
      errorMessage: ""
    };
  }

  getUserReimbursements = async () => {
    //e.preventDefault();
    try {
      let reimbursements = await ersGetReimbursementsByUserId(
        this.props.currentUser.userId
      );
      this.setState({
        userReimbursements: reimbursements
      });

      console.log(reimbursements);
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
    if (this.state.userReimbursements.length !== 0) {
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
      this.getUserReimbursements();
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
    console.log(this.state.userReimbursements);

    //turn array of reimbursements into display components
    let userDisplay = this.state.userReimbursements.map(ele => {
      return (
        <ReimbursementInfoComponent
          currentReimbursement={ele}
          key={ele.reimbursementId}
        />
      );
    });
    // console.log(this.props.currentUser.role);
    //console.log(this.props.currentUser.role.role);

    return (
      // <NavBarComponent/>
      // // check for role or redirect
      this.props.currentUser.role.role === "Admin" ||
        this.props.currentUser.role.role === "Finance-Manager" ||
        this.props.currentUser.role.role === "User" ? (
        <>
          <CardDeck elementsPerRow={4}>{userDisplay}</CardDeck>
        </>
      ) : (
        <Redirect to="/" />
      )
      // <p>{console.log(this.props.currentUser)};</p>
    );
  }
}
