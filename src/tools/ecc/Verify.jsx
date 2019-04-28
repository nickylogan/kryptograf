import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import crypto from 'crypto';
import { ec as EC } from 'elliptic';

class Verify extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validPub: true,
      validMessage: true,
      validSignature: true,
      verified: 0,
      message: '',
      hash: '',
      signature: '',
      pub: ''
    };
  }

  /**
   * Author: Nicky
   * @param {SyntheticEvent} event
   */
  handleVerify(event) {
    const { message, signature, pub } = this.state; // Get data from form submission
    
    // Form validation
    const { validSignature, validMessage, validPub } = this.state;
    if (!message) {
      this.setState({ validMessage: false });
    }
    if (!signature) {
      this.setState({ validSignature: false });
    }
    if (!pub) {
      this.setState({ validPub: false });
    }
    if (!validSignature || !validMessage || !validPub) {
      return;
    }

    const ec = new EC('secp256k1'); // Get secp56k1 ECC cipher object from 'EC' in the 'elliptic' library
    let messageBuf = Buffer.from(message, 'utf8'); // Create buffer from message input
    let hashBuf = crypto
      .createHash('sha256')
      .update(messageBuf)
      .digest(); // Create SHA-256 hash of the inputted message
    let key = ec.keyFromPublic(pub, 'hex'); // Get the public key input
    let verified; // Value is 1 if valid, -1 if invalid
    try {
      verified = key.verify(hashBuf, signature) ? 1 : -1; // Verify if the hash and signature is valid
                                                          // using the public key.
    } catch(e) {
      verified = -1; // Catch any errors from malformed input; meaning signature is invalid
    }

    // Display data to form
    this.setState({
      hash: hashBuf.toString('hex'),
      verified: verified
    });
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleChangeMessage(event) {
    let value = event.target.value;
    this.setState({
      message: value,
      validMessage: !!value
    });
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleChangePubKey(event) {
    let value = event.target.value;
    this.setState({
      pub: value,
      validPub: !!value.match(/^04[0-9a-f]{128}$/i)
    });
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleChangeSignature(event) {
    let value = event.target.value;
    this.setState({
      signature: value,
      validSignature: !!value.match(/^[0-9a-f]+$/i)
    });
  }

  render() {
    const { message, hash, signature, pub, verified } = this.state;
    const { validSignature, validMessage, validPub } = this.state;
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal"><span className="text-monospace text-info">#3</span> Signature verification</h3>
          <p>
            The signature verification algorithm only supports{' '}
            <strong className="text-danger">secp256k1</strong> curve
          </p>
        </Col>
        <Col md="6">
          <Form>
            <Form.Group controlId="verHash">
              <Form.Label as="small">Message to verify</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                className={`text-monospace ${validMessage ? '' : 'is-invalid'}`}
                value={message}
                onChange={e => this.handleChangeMessage(e)}
                placeholder="e.g. hello world!"
              />
              <Form.Text className="text-danger">
                {validMessage ? '' : 'Message cannot be empty'}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="verMessage">
              <Form.Label as="small">Hash (SHA-256)</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                className="text-monospace"
                disabled
                value={hash}
                placeholder="The message hash will appear here"
              />
            </Form.Group>
            <Form.Group controlId="verSignature">
              <Form.Label as="small">Signature (in DER format)</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                rows="3"
                as="textarea"
                className={`text-monospace ${validSignature ? '' : 'is-invalid'}`}
                value={signature}
                onChange={e => this.handleChangeSignature(e)}
                placeholder="Place the DER signature as a hex string. Use the one generated from (#2)"
              />
              <Form.Text className="text-danger">
                {validSignature ? '' : 'Signature cannot be empty'}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="verPubKey">
              <Form.Label as="small">Public key</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                size="sm"
                type="text"
                className={`text-monospace ${validPub ? '' : 'is-invalid'}`}
                value={pub}
                onChange={e => this.handleChangePubKey(e)}
                placeholder="The public key starting with '04'. Use the public key generated from (#1)."
              />
              <Form.Text className="text-danger">
                {validPub
                  ? ''
                  : 'Public key must be a 520-bit hexadecimal string starting with \'04\''}
              </Form.Text>
            </Form.Group>
            {verified !== 0 ? (
              <Alert variant={verified === 1 ? 'success' : 'danger'}>
                The signature is <strong>{verified === 1 ? 'valid' : 'invalid'}</strong>
              </Alert>
            ) : (
              ''
            )}
            <Button variant="info" onClick={e => this.handleVerify(e)}>
              Verify
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Verify;
