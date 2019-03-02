import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { ec as EC } from 'elliptic';

class Verify extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validPub: true,
      validHash: true,
      validSignature: true,
      verified: 0,
      hash: '',
      signature: '',
      pub: ''
    };
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleVerify(event) {
    const { hash, signature, pub } = this.state;
    const { validSignature, validHash, validPub } = this.state;
    if (!hash) {
      this.setState({ validHash: false });
    }
    if (!signature) {
      this.setState({ validSignature: false });
    }
    if (!pub) {
      this.setState({ validPub: false });
    }
    if (!validSignature || !validHash || !validPub) {
      return;
    }
    const ec = new EC('secp256k1');
    let hashBuf = Buffer.from(hash, 'hex');
    let key = ec.keyFromPublic(pub, 'hex');
    this.setState({
      verified: key.verify(hashBuf, signature) ? 1 : -1
    });
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleChangeHash(event) {
    let value = event.target.value;
    this.setState({
      hash: value,
      validHash: !!value.match(/^[0-9a-f]{64}$/i)
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
    const { hash, signature, pub, verified } = this.state;
    const { validSignature, validHash, validPub } = this.state;
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal">Signature verification</h3>
          <p>
            The signature verification algorithm only supports{' '}
            <strong className="text-danger">secp256k1</strong> curve
          </p>
        </Col>
        <Col md="6">
          <Form>
            <Form.Group controlId="verHash">
              <Form.Label as="small">Hash (SHA-256)</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                className={`text-monospace ${validHash ? '' : 'is-invalid'}`}
                value={hash}
                onChange={e => this.handleChangeHash(e)}
                placeholder="e.g. 0f1e2d3c4b5a69788796a5b4c3d2e1f0f0e1d2c3b4a5968778695a4b3c2d1e0f"
              />
              <Form.Text className="text-danger">
                {validHash ? '' : 'Hash must be a 256-bit hexadecimal string'}
              </Form.Text>
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
                placeholder="place the DER signature as a hex string"
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
                placeholder="public key starting with '04'"
              />
              <Form.Text className="text-danger">
                {validPub
                  ? ''
                  : 'Public key must be a 520-bit hexadecimal string starting with 0x04'}
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
