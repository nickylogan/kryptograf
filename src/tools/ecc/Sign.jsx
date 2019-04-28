import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import crypto from 'crypto';
import { ec as EC } from 'elliptic';

class Sign extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validPriv: true,
      validMessage: true,
      message: '',
      hash: '',
      signature: '',
      priv: ''
    };
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleSign(event) {
    const { message, priv } = this.state;
    const { validMessage, validPriv } = this.state;
    if (!message) {
      this.setState({ validMessage: false });
    }
    if (!priv) {
      this.setState({ validPriv: false });
    }
    if (!validMessage || !validPriv) {
      return;
    }
    const ec = new EC('secp256k1');
    let privBuf = Buffer.from(priv, 'hex');
    let msgBuf = Buffer.from(message, 'utf8');
    let hashBuf = crypto
      .createHash('sha256')
      .update(msgBuf)
      .digest();
    let key = ec.keyFromPrivate(privBuf);
    let sgn = key.sign(hashBuf);
    let der = Buffer.from(sgn.toDER());
    this.setState({
      hash: hashBuf.toString('hex'),
      signature: der.toString('hex')
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
  handleChangePrivKey(event) {
    let value = event.target.value;
    this.setState({
      priv: value,
      validPriv: !!value.match(/^[0-9a-f]{64}$/i)
    });
  }

  render() {
    const { validMessage, validPriv } = this.state;
    const { message, priv, hash, signature } = this.state;
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal"><span className="text-monospace text-info">#2</span> Message signature</h3>
          <p>The signature algorithm only supports <strong className="text-danger">secp256k1</strong> curve</p>
        </Col>
        <Col md="6">
          <Form>
            <Form.Group controlId="signMsg">
              <Form.Label as="small">Message</Form.Label>
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
            <Form.Group controlId="signPrivKey">
              <Form.Label as="small">Private key</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                size="sm"
                type="text"
                className={`text-monospace ${validPriv ? '' : 'is-invalid'}`}
                value={priv}
                onChange={e => this.handleChangePrivKey(e)}
                placeholder="Use the private key generated in (#1), e.g. 0f0f1e1e2d2d3c3c4b4b5a5a6969787887879696a5a5b4b4c3c3d2d2e1e1f0f0"
              />
              <Form.Text className="text-danger">
                {validPriv ? '' : 'Private key must be a 256-bit hexadecimal string'}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="signHash">
              <Form.Label as="small">Hash (SHA-256)</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                className="text-monospace"
                disabled
                value={hash}
              />
            </Form.Group>
            <Form.Group controlId="signSignatuer">
              <Form.Label as="small">Signature (in DER format)</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                size="sm"
                type="text"
                className="text-monospace"
                disabled
                value={signature}
              />
            </Form.Group>
            <Button
              variant="info"
              onClick={e => this.handleSign(e)}
            >
              Sign
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Sign;
