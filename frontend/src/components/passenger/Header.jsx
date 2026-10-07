import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

        {/* Logo / Brand */}
        <Navbar.Brand as={Link} to="/">
          🚌 BapuBus
        </Navbar.Brand>

        {/* Mobile Menu */}
        <Navbar.Toggle aria-controls="bapubus-navbar" />

        <Navbar.Collapse id="bapubus-navbar">

          {/* Navigation */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/search-bus">
              Search Bus
            </Nav.Link>

            <Nav.Link as={Link} to="/my-bookings">
              My Bookings
            </Nav.Link>

            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>

          {/* Authentication */}
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to="/login"
              variant="outline-light"
            >
              Login
            </Button>

            <Button
              as={Link}
              to="/register"
              variant="primary"
            >
              Register
            </Button>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;