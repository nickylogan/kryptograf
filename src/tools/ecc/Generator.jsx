import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ecurve from 'ecurve';
import { ec as EC } from 'elliptic';
import crypto from 'crypto';
import BigInteger from 'bigi';

class Generator extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validCurve: true,
      curve: { a: '-', b: '-', p: '-', Gx: '-', Gy: '-' },
      priv: '-',
      pub: '-',
      validated: false,
    };
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleChangeCurve(event) {
    let curve = ecurve.getCurveByName(event.target.value);
    if (!curve) {
      this.setState({
        curve: { a: '-', b: '-', p: '-', Gx: '-', Gy: '-' },
        validCurve: event.target.value === ''
      });
      return;
    }

    this.setState({
      curve: {
        name: event.target.value,
        a: curve.a.toString('16').padStart(2, '0'),
        b: curve.b.toString('16').padStart(2, '0'),
        p: curve.p.toString('16'),
        Gx: curve.G.affineX.toString('16'),
        Gy: curve.G.affineY.toString('16')
      },
      validCurve: true
    });
  }

  /**
   * Author: James
   * @param {SyntheticEvent} event
   */
  handleGenerate(event) {
    // Retrieve form and event
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();


    if (form.checkValidity()) { // Check if form is valid
      let priv = crypto.randomBytes(32); // Generate private key using 'crypto' library
      let ecparams = ecurve.getCurveByName('secp256k1'); // generate elliptic curve parameters using 'ecurve'
                                                         // library with 'secp256k1'
      let curvePt = ecparams.G.multiply(BigInteger.fromBuffer(priv)); // get curve point by multiplying the
                                                                      // result G and the private key
      this.setState({
        priv: priv.toString('hex'), // set the private key using the hex encoded generated private key
        pub: curvePt.getEncoded(false).toString('hex'), // set the public key using the previously generated 
                                                        // curve point
      });
      this.setState({ validated: false });
    } else {
      this.setState({ validated: true });
    }
  }

  render() {
    return (
      <Row>
        <Col md="4">
          <h3 className="font-weight-normal"><span className="text-monospace text-info">#1</span> Keypair generator</h3>
          <p>
            The keypair generator uses the <strong className="text-danger">secp256k1</strong> curve. 
            Here's <a href="https://en.bitcoin.it/wiki/Secp256k1">more info</a> on how it works
          </p>
        </Col>
        <Col md="6">
          <Form noValidate validated={this.state.validated} onSubmit={e => this.handleGenerate(e)}>
            <Form.Group controlId="genPrivKey">
              <Form.Label as="small">Private key</Form.Label>
              <Form.Control as="textarea" rows="3" size="sm" type="text" className="text-monospace" disabled value={this.state.priv}/>
            </Form.Group>
            <Form.Group controlId="genPubKey">
              <Form.Label as="small">Public key</Form.Label>
              <Form.Control as="textarea" rows="5" size="sm" type="text" className="text-monospace" disabled value={this.state.pub}/>
            </Form.Group>
            <Button variant="info" type="submit">Generate</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Generator;
