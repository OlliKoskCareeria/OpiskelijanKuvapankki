import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = ({ setLoggedInUser,setLoggedAdmin,loggedInUser,loggedAdmin, logout }) => {
    console.log('Navbar rendered with isAuthenticated:', loggedInUser,loggedAdmin);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/Etusivu">Etusivu</Navbar.Brand>
      <Nav className="me-auto">
      <Nav.Link href="/Etusivu">Etusivu</Nav.Link>
            <Nav.Link href='/KategorianKuvat'>Kuvat</Nav.Link>
            {!loggedInUser&&<Nav.Link href='/Login'>Kirjaudu sisään</Nav.Link>}
            {loggedAdmin && <Nav.Link href='/KategoriatLista'>Kategoriat</Nav.Link>}
            {loggedInUser&&<button onClick={() => logout()}>Logout</button>}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;