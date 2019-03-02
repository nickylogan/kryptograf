import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import Latex from 'react-latex';
import ecurve from 'ecurve';
import crypto from 'crypto';
import BigInteger from 'bigi';
import { curves } from './utils';

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
   * @param {SyntheticEvent} event
   */
  handleGenerate(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      let priv = crypto.randomBytes(32);
      let ecparams = ecurve.getCurveByName('secp256k1')
      let curvePt = ecparams.G.multiply(BigInteger.fromBuffer(priv));
      this.setState({
        priv: priv.toString('hex'),
        pub: curvePt.getEncoded(false).toString('hex'),
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
          <h3 className="font-weight-normal">Keypair generator</h3>
          <p>
            General curve form: <br />
            <Latex>$y^2=x^3+ax+b$</Latex>
          </p>
        </Col>
        <Col md="6">
          <Form noValidate validated={this.state.validated} onSubmit={e => this.handleGenerate(e)}>
            <Form.Group controlId="genCurve">
              <Form.Label as="small">Curve type</Form.Label>
              <Form.Control
                as="select"
                onChange={e => this.handleChangeCurve(e)}
                isInvalid={!this.state.validCurve}
                required
              >
                <option defaultValue value="">
                  Select any
                </option>
                {Object.values(curves).map((curve, index) => (
                  <option value={curve} key={index}>
                    {curve}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a valid elliptical curve
              </Form.Control.Feedback>
            </Form.Group>
            <Table size="sm">
              <tbody>
                <tr>
                  <td className="align-middle" style={{ width: '10%' }}>
                    <small>
                      <Latex>$a$</Latex>
                    </small>
                  </td>
                  <td className="align-middle" style={{ width: '5%' }}>
                    <small className="text-monospace">=</small>
                  </td>
                  <td>
                    <small className="text-monospace">{this.state.curve.a}</small>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle" style={{ width: '10%' }}>
                    <small>
                      <Latex>$b$</Latex>
                    </small>
                  </td>
                  <td className="align-middle" style={{ width: '5%' }}>
                    <small className="text-monospace">=</small>
                  </td>
                  <td>
                    <small className="text-monospace">{this.state.curve.b}</small>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle" style={{ width: '10%' }}>
                    <small>
                      <Latex>$p$</Latex>
                    </small>
                  </td>
                  <td className="align-middle" style={{ width: '5%' }}>
                    <small className="text-monospace">=</small>
                  </td>
                  <td>
                    <small className="text-monospace">{this.state.curve.p}</small>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle" style={{ width: '10%' }}>
                    <small>
                      <Latex>$G_x$</Latex>
                    </small>
                  </td>
                  <td className="align-middle" style={{ width: '5%' }}>
                    <small className="text-monospace">=</small>
                  </td>
                  <td>
                    <small className="text-monospace">{this.state.curve.Gx}</small>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle" style={{ width: '10%' }}>
                    <small>
                      <Latex>$G_y$</Latex>
                    </small>
                  </td>
                  <td className="align-middle" style={{ width: '5%' }}>
                    <small className="text-monospace">=</small>
                  </td>
                  <td>
                    <small className="text-monospace">{this.state.curve.Gy}</small>
                  </td>
                </tr>
              </tbody>
            </Table>
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
