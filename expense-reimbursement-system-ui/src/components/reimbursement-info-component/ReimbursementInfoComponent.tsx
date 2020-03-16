import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import { User } from "../../models/User";
import { Redirect } from "react-router";
import { Reimbursement } from "../../models/Reimbursement";

interface IReimbursementInfoProps {
  currentReimbursement: Reimbursement;
}

export class ReimbursementInfoComponent extends React.Component<
  IReimbursementInfoProps,
  any
> {
  render() {
    console.log(this.props.currentReimbursement);
    console.log(this.props.currentReimbursement.reimbursementId);

    return this.props.currentReimbursement.reimbursementId ? (
      <Card>
        <CardTitle>
          {`Reimbursement ID: ${this.props.currentReimbursement.reimbursementId}`}
        </CardTitle>
        <CardText>{`Author: ${this.props.currentReimbursement.author}`}</CardText>
        <CardText>{`Amount: ${this.props.currentReimbursement.amount}`}</CardText>
        <CardText>{`Date Submitted: ${this.props.currentReimbursement.dateSubmitted}`}</CardText>
        <CardText>{`Date Resolved: ${this.props.currentReimbursement.dateResolved}`}</CardText>
        <CardText>{`Description: ${this.props.currentReimbursement.description}`}</CardText>
        <CardText>{`Resolver: ${this.props.currentReimbursement.resolver}`}</CardText>
        <CardText>{`Status: ${this.props.currentReimbursement.status}`}</CardText>
        <CardText>{`Type: ${this.props.currentReimbursement.type}`}</CardText>
      </Card>
    ) : (
      // <Redirect to="/login" />
      <p>Error</p>
    );
  }
}
