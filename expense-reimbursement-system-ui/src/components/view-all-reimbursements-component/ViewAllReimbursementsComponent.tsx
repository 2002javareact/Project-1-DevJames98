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

interface IViewAllReimbursementsProps extends RouteComponentProps {
  currentUser: User;
  //allUsers: User[];
  //errorMessage: string;
  //   getAllUsersActionMapper: () => void;
}

///idk
interface IViewAllReimbursementsState {
  allReimbursements: Reimbursement[];
  statusIdToSearch: number;
  userIdToSearch: number;
  errorMessage: string;
}

export class ViewAllReimbursementsComponent extends React.Component<
  IViewAllReimbursementsProps,
  IViewAllReimbursementsState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      allReimbursements: [],
      statusIdToSearch: 0,
      userIdToSearch: 0,
      errorMessage: ""
    };
  }

  getAllReimbursements = async () => {
    // e.preventDefault();
    try {
      console.log("call from try");

      let reimbursements = await ersGetAllReimbursements();
      console.log(reimbursements);

      this.setState({
        allReimbursements: reimbursements
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

  submitStatusId = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let status = await ersGetReimbursementsByStatus(
        this.state.statusIdToSearch
      );
      this.setState({
        allReimbursements: status,
        statusIdToSearch: 0,
        errorMessage: ""
      });

      console.log(status);
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          statusIdToSearch: 0,
          errorMessage: e.message
        });
      } else {
        this.setState({
          statusIdToSearch: 0,
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  submitUserId = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let user = await ersGetReimbursementsByUserId(this.state.userIdToSearch);
      this.setState({
        allReimbursements: user,
        userIdToSearch: 0,
        errorMessage: ""
      });

      console.log(user);
    } catch (e) {
      if (e.status === 404) {
        this.setState({
          userIdToSearch: 0,
          errorMessage: e.message
        });
      } else {
        this.setState({
          userIdToSearch: 0,
          errorMessage: "Something Went Wrong. Oops!"
        });
      }
    }
  };

  updateStatusId = (stat: any) => {
    this.setState({
      statusIdToSearch: stat.currentTarget.value
    });
  };
  updateUserId = (u: any) => {
    this.setState({
      userIdToSearch: u.currentTarget.value
    });
  };

  // runs when component starts to exist
  componentDidMount() {
    // check to see if we already have users (redux store)
    if (this.state.allReimbursements.length !== 0) {
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
      this.getAllReimbursements();
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
    console.log(this.state.allReimbursements);

    //turn array of reimbursements into display components
    let userDisplay = this.state.allReimbursements.map(ele => {
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
        this.props.currentUser.role.role === "Finance-Manager" ? (
        <>
          {/* forms that allow to submit a userId or statusId to search by */}
          <Form onSubmit={this.submitStatusId}>
            <FormGroup row>
              <Label for="statusId" sm={2}>
                Search By Status ID:
              </Label>
              <Col sm={6}>
                <Input
                  onChange={this.updateStatusId}
                  value={this.state.statusIdToSearch}
                  type="text"
                  name="statusId"
                  id="statusId"
                  placeholder="statusId"
                  required
                />
              </Col>
            </FormGroup>
            <Button color="success">Submit</Button>
          </Form>

          <Form onSubmit={this.submitUserId}>
            <FormGroup row>
              <Label for="userId" sm={2}>
                Search By User ID:
              </Label>
              <Col sm={6}>
                <Input
                  onChange={this.updateUserId}
                  value={this.state.userIdToSearch}
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="userId"
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
          <CardDeck elementsPerRow={4}>{userDisplay}</CardDeck>
        </>
      ) : (
        <Redirect to="/" />
      )
      // <p>{console.log(this.props.currentUser)};</p>
    );
  }
}
