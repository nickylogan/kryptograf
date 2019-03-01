import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Generator from './Generator';
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';

class Index extends Component {
  render() {
    return (
      <Container className="py-5">
        <h1 className="display-4 mb-5 font-weight-normal">Elliptic Curve Cryptography (ECC)</h1>
        <hr/>
        <Generator />
        <hr />
        <Encrypt />
        <hr />
        <Decrypt />
      </Container>
    );
  }
}

export default Index;
