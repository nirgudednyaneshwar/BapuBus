import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

function PassengerHome() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Body className="p-4">

              <h2 className="text-center mb-3">
                Welcome to BapuBus 🚌
              </h2>

              <p className="text-center text-muted">
                Book your bus journey easily
              </p>

              <Row className="g-3 mt-3">

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Boarding point"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Dropping point"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Travel Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Button variant="primary" className="w-100">
                    Search Bus
                  </Button>
                </Col>

              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PassengerHome;