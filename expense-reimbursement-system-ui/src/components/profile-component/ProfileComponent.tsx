import React from "react";
import NavBarComponent from "../navbar-component/NavBarComponent";
import { User } from "../../models/User";
import { Redirect } from "react-router";

interface IProfileProps {
  currentUser: User;
}

export class ProfileComponent extends React.Component<IProfileProps, any> {
  render() {
    return this.props.currentUser.userId ? (
      <>
        <NavBarComponent />
        {/* <p>{this.props.currentUser}</p> */}
        {console.log(this.props.currentUser)}
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}
