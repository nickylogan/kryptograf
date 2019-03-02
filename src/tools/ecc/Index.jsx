import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Generator from './Generator';
import Sign from './Sign';

class Index extends Component {
  render() {
    return (
      <Container className="py-5">
        <h1 className="display-4 mb-5 font-weight-normal d-none d-md-block">Elliptic Curve Cryptography (ECC)</h1>
        <h1 className="mb-5 font-weight-normal d-md-none">Elliptic Curve Cryptography (ECC)</h1>
        <hr/>
        <Generator />
        <hr/>
        <Sign />
      </Container>
    );
  }
}

export default Index;
