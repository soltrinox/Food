import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const TopNav = () => {
  const gallery = window.location.pathname.includes("gallery");
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">What-A-Burger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/upload">Upload</Nav.Link>
          <Nav.Link href="/gallery">Gallery</Nav.Link>
        </Nav>
        {gallery && (
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;
