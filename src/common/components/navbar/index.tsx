import * as React from 'react';
import {
  Collapse,
  CollapseProps,
  //   DropdownItem,
  //   DropdownMenu,
  //   DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  //   NavLink, 
  //   UncontrolledDropdown
} from 'reactstrap';

export default class MonsterMenu extends React.Component<{}, CollapseProps> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  public toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  public render() {
    return (
      <div>
        <Navbar color="light" light={true} expand="md">
          <NavbarBrand href="/">Koin Monster</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <a href="#">Refresh</a>
              </NavItem>
              <NavItem>
                <a href="#">Fav</a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}