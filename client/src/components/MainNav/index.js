import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './MainNav.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import tlmLogo from '../../images/TLM_Logos/TLMWhiteLogo.png';
import { UserDropdownContainer } from '../../redux/containers';

function MainNavbar() {

  return (
    <Container className="p-0" fluid>
      <Navbar bg="dark" variant="dark" collapseOnSelect>
        {/* Nav Brand */}
        <Navbar.Brand>
          <NavLink to="#">
            <img id="navbrand_logo" alt="TLM Logo" src={tlmLogo} />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="mr-auto">
          {/* Home Link */}
          <NavLink className="navbar item nav-link" id="home_link" to="/home"><i className="home icon mb-1" />Home</NavLink>
          {/* Quiz Link */}
          <NavLink className="navbar item nav-link" id="quiz_link" to="/quiz"><i className="computer icon mb-1" />Quiz</NavLink>
          {/* Profile Link */}
          <NavLink className="navbar item nav-link" id="quiz_link" to="/profile"><i className="user icon mb-1" />Profile</NavLink>
        </Nav>
        {/* User Dropdown Menu */}
        <UserDropdownContainer />
      </Navbar>
    </Container>
  )
}

export default MainNavbar;
