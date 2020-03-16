import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import { User } from "../../models/User";
import { Redirect } from "react-router";

interface IUserInfoProps {
  currentUser: User;
}

export class UserInfoComponent extends React.Component<IUserInfoProps, any> {
  render() {
    return this.props.currentUser.userId ? (
      <Card>
        <CardTitle>{`USER ID: ${this.props.currentUser.userId}`}</CardTitle>
        <CardText>{`Username: ${this.props.currentUser.username}`}</CardText>
        <CardText>{`Full Name: ${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</CardText>
        <CardText>{`Email: ${this.props.currentUser.email}`}</CardText>
        <CardText>{`Role: ${this.props.currentUser.role.role}`}</CardText>
      </Card>
    ) : (
      <Redirect to="/login" />
    );
  }
}
