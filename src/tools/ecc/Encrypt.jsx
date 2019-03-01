import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

class Encrypt extends Component {
  render() {
    return (
      <Row>
        <Col md="3">
          <h3 className="font-weight-normal">Encrypt</h3>
        </Col>
        <Col md={{ span: 6, offset: 1 }}>
          <Form>
            <Form.Group controlId="encPlaintext">
              <Form.Label as="small">Plaintext</Form.Label>
              <Form.Control size="sm" as="textarea" rows="5" className="text-monospace" />
            </Form.Group>
            <Form.Group controlId="encPublicKey">
              <Form.Label as="small">Public key</Form.Label>
              <Form.Control size="sm" type="text" className="text-monospace" />
            </Form.Group>
            <Button variant="secondary">Encrypt</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Encrypt;
