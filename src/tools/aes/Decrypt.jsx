import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import crypto from 'crypto';

class Decrypt extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      ciphertext: '',
      password: '',
      plaintext: '',
      validCiphertext: true,
      validPassword: true,
      validDecrypt: 0
    };
  }

  handleChangeCiphertext(event) {
    let value = event.target.value;
    this.setState({
      ciphertext: value,
      validCiphertext: value.match(/^[0-9a-f]{32}:[0-9a-f]+$/i)
    });
  }

  handleChangePassword(event) {
    let value = event.target.value;
    this.setState({
      password: value,
      validPassword: !!value
    });
  }

  handleDecrypt(event) {
    const { password, ciphertext } = this.state;
    const { validPassword, validCiphertext } = this.state;
    if (!password) {
      this.setState({ validPassword: false });
    }
    if (!ciphertext) {
      this.setState({ validPlaintext: false });
    }
    if (!validPassword || !validCiphertext) {
      return;
    }

    let textParts = ciphertext.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let key = crypto
      .createHash('sha256')
      .update(Buffer.from(password, 'utf8'))
      .digest();
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    try {
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      this.setState({
        plaintext: decrypted.toString(),
        validDecrypt: 1
      });
    } catch (e) {
      this.setState({
        plaintext: 'Cannot decrypt ciphertext',
        validDecrypt: -1
      });
    }
  }

  render() {
    const { validCiphertext, validPassword, validDecrypt } = this.state;
    const { plaintext, password, ciphertext } = this.state;
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal">Decryption</h3>
          <p>Decrypt with 256-bit key</p>
        </Col>
        <Col md="6">
          <Form>
            <Form.Group controlId="decCiphertext">
              <Form.Label as="small">Ciphertext</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                size="sm"
                type="text"
                className={`text-monospace ${validCiphertext ? '' : 'is-invalid'}`}
                value={ciphertext}
                onChange={e => this.handleChangeCiphertext(e)}
                placeholder="e.g. 0123456789abcdef:62e78b76c69736822a42373abe5193a3"
              />
              <Form.Text className="text-danger">
                {validCiphertext ? (
                  ''
                ) : (
                  <>
                    Ciphertext must match{' '}
                    <span className="text-monospace">/^[0-9a-f]{32}:[0-9a-f]+$/i</span>
                  </>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="decPassword">
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
            <Form.Group controlId="decPlaintext">
              <Form.Label as="small">Plaintext</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                size="sm"
                type="text"
                className={`text-monospace font-weight-bold ${
                  validDecrypt === 1
                    ? 'is-valid text-success'
                    : validDecrypt === -1
                    ? 'is-invalid text-danger'
                    : ''
                }`}
                disabled
                value={plaintext}
                placeholder="Encrypted message will appear here"
              />
            </Form.Group>
            <Button variant="info" onClick={e => this.handleDecrypt(e)}>
              Decrypt
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Decrypt;
