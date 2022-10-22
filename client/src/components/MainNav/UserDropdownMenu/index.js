import React from 'react';
import {
  Nav, Dropdown, NavDropdown, Image,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import unknownUser from '../../../images/Miscellaneous/unknownUser1.png';
import './UserDropdownMenu.css';
import api from '../../../api';
import initialState from '../../../redux/initialState';

function UserDropdownMenu({ userData, logoutUser }) {

  const logout = async () => {
    const payload = { email: userData.email };
    logoutUser(initialState);
    const attemptLogout = await (await api.logout(payload));
    if (!attemptLogout) {
      /* eslint-disable-next-line no-console */
      console.log('There was an error logging out!');
    }
    localStorage.clear();
  }

  return (
    <>
      <Nav>
        {/* Navbar user image */}
        {
          userData.userImage.length > 0
            ? <Image id="nav_userImage_dropdown_small" src={`data:image/png;base64, ${userData.userImage}`} roundedCircle />
            : <Image id="nav_userImage_dropdown_small" src={unknownUser} roundedCircle />
        }
        <NavDropdown title="" id="nav-dropdown">
          {/* Dropdown user image */}
          {
            userData.userImage.length > 0
              ? <Image className="ml-4" id="nav_userImage_dropdown_large" src={`data:image/png;base64, ${userData.userImage}`} roundedCircle />
              : <Image className="ml-4" id="nav_userImage_dropdown_large" src={unknownUser} roundedCircle />
          }
          <Dropdown.ItemText>{userData.firstName}</Dropdown.ItemText>
          <Dropdown.ItemText><i>{userData._id}</i></Dropdown.ItemText>
          <NavDropdown.Divider />
          <LinkContainer to="/profile" id="profileBtn">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.ItemText>
            <Nav>
              <NavLink className="btn btn-block btn-danger" id="logout_link" to="/" onClick={() => logout()}><i className="sign out icon" />Sign out</NavLink>
            </Nav>
          </NavDropdown.ItemText>
        </NavDropdown>
      </Nav>
    </>
  );
}

export default UserDropdownMenu;
