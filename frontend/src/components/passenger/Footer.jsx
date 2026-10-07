import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container className="py-4">
        <Row>

          {/* Company */}
          <Col md={4} className="mb-3">
            <h5>🚌 BapuBus</h5>
            <p className="text-secondary">
              Comfortable, safe and reliable bus travel.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>

            <div className="d-flex flex-column gap-2">
              <Link
                to="/"
                className="text-light text-decoration-none"
              >
                Home
              </Link>

              <Link
                to="/search-bus"
                className="text-light text-decoration-none"
              >
                Search Bus
              </Link>

              <Link
                to="/my-bookings"
                className="text-light text-decoration-none"
              >
                My Bookings
              </Link>
            </div>
          </Col>

          {/* Support */}
          <Col md={4} className="mb-3">
            <h5>Support</h5>

            <p className="mb-1">Contact Us</p>
            <p className="mb-1">Terms & Conditions</p>
            <p className="mb-1">Privacy Policy</p>
          </Col>

        </Row>

        <hr />

        <div className="text-center text-secondary">
          © 2026 BapuBus. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;