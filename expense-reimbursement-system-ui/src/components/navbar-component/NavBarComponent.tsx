//TO BE EDITED
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

//this is a function component
const NavBarComponent = (props: any) => {
  // useState is a hook
  // hooks are special functions provided by react for doing specific things
  // useState allows us to build a varibale that react keeps track of like state
  // hooks are only available in functions
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Expense Reimbursement System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {/* <NavLink to="/profile">Profile</NavLink> */}
              <Link className="link" to="/">
                Home
              </Link>
            </NavItem>
            <DropdownItem divider />
            <NavItem>
              {/* <NavLink to="/profile">Profile</NavLink> */}
              <Link className="link" to="/profile">
                Profile
              </Link>
            </NavItem>
            <DropdownItem divider />
            {props.role === "User" ? (
              <div></div>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Manage
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/manage/users">Find All Users</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/manage/user">Find One User</Link>
                  </DropdownItem>
                  {props.role === "Admin" ? (
                    <>
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link to="/manage/update-user">Update User</Link>
                      </DropdownItem>
                    </>
                  ) : (
                    <div></div>
                  )}
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/manage/reimbursements">Find Reimbursement</Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/manage/update-reimbursement">
                      Update Reimbursement
                    </Link>
                  </DropdownItem>

                  {/* <DropdownItem>Reset</DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            <DropdownItem divider />
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Reimbursements
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/reimbursements/all-user-reimbursements">
                    My Reimbursements
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/reimbursements/submit">Submit Reimbursement</Link>
                </DropdownItem>

                {/* <DropdownItem>Reset</DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <NavbarText>Simple Text</NavbarText> */}
            <DropdownItem divider />
            <Button className="logout-button" href="/">
              Log Out
            </Button>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
