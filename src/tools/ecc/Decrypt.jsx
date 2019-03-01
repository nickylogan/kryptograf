import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

class Decrypt extends Component {
  render() {
    return (
      <Row>
        <Col md="3">
          <h3 className="font-weight-normal">Decrypt</h3>
        </Col>
        <Col md={{ span: 6, offset: 1 }}>
          <Form>
            <Form.Group controlId="decCiphertext">
              <Form.Label as="small">Ciphertext</Form.Label>
              <Form.Control size="sm" as="textarea" rows="5" className="text-monospace" />
            </Form.Group>
            <Form.Group controlId="decPrivateKey">
              <Form.Label as="small">Private key</Form.Label>
              <Form.Control size="sm" type="text" className="text-monospace" />
            </Form.Group>
            <Button variant="secondary">Decrypt</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Decrypt;