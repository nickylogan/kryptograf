import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import crypto from 'crypto';

class Encrypt extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      plaintext: '',
      password: '',
      ciphertext: '',
      validPlaintext: true,
      validPassword: true,
    };
  }

  handleChangePlaintext(event) {
    let value = event.target.value;
    this.setState({
      plaintext: value,
      validPlaintext: !!value
    });
  }

  handleChangePassword(event) {
    let value = event.target.value;
    this.setState({
      password: value,
      validPassword: !!value
    });
  }

  handleEncrypt(event) {
    const { password, plaintext } = this.state;
    const { validPassword, validPlaintext } = this.state;
    if (!password) {
      this.setState({ validPassword: false });
    }
    if (!plaintext) {
      this.setState({ validPlaintext: false });
    }
    if (!validPassword || !validPlaintext) {
      return;
    }
    const key = crypto.createHash('sha256').update(Buffer.from(password, 'utf8')).digest();
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plaintext);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let ciphertext =  iv.toString('hex') + ':' + encrypted.toString('hex');
    this.setState({
      ciphertext: ciphertext
    });
  }

  render() {
    const { validPlaintext, validPassword } = this.state;
    const { plaintext, password, ciphertext } = this.state;
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal">Encryption</h3>
          <p>
            Encrypt with 256-bit key
          </p>
        </Col>
        <Col md="6">
        <Form>
            <Form.Group controlId="encPlain">
              <Form.Label as="small">Plaintext</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                className={`text-monospace ${validPlaintext ? '' : 'is-invalid'}`}
                value={plaintext}
                onChange={e => this.handleChangePlaintext(e)}
                placeholder="e.g. hello world!"
              />
              <Form.Text className="text-danger">
                {validPlaintext ? '' : 'Message cannot be empty'}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="encPassword">
              <Form.Label as="small">Password</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                className={`text-monospace ${validPassword ? '' : 'is-invalid'}`}
                value={password}
                onChange={e => this.handleChangePassword(e)}
                placeholder="e.g. secret"
              />
              <Form.Text className="text-danger">
                {validPassword ? '' : 'Password cannot be empty!'}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="encCipher">
              <Form.Label as="small">Ciphertext</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                size="sm"
                type="text"
                className="text-monospace"
                disabled
                value={ciphertext}
                placeholder="Encrypted message will appear here"
              />
            </Form.Group>
            <Button
              variant="info"
              onClick={e => this.handleEncrypt(e)}
            >
              Encrypt
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Encrypt;
