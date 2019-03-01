import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Latex from 'react-latex';

class Generator extends Component {
  render() {
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal">Keypair generator</h3>
          <p>Description thing</p>
        </Col>
        <Col md="6">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="genA">
                <Form.Label as="small">
                  <Latex>$a$</Latex>
                </Form.Label>
                <Form.Control size="sm" type="text" className="text-monospace" disabled />
              </Form.Group>
              <Form.Group as={Col} controlId="genB">
                <Form.Label as="small">
                  <Latex>$b$</Latex>
                </Form.Label>
                <Form.Control size="sm" type="text" className="text-monospace" disabled />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="genPubKey">
              <Form.Label as="small">Public key</Form.Label>
              <Form.Control size="sm" type="text" className="text-monospace" disabled />
            </Form.Group>
            <Form.Group controlId="genPrivKey">
              <Form.Label as="small">Private key</Form.Label>
              <Form.Control size="sm" type="text" className="text-monospace" disabled />
            </Form.Group>
            <Button variant="secondary">Generate</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Generator;