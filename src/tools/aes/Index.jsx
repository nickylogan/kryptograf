import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';

class Index extends Component {
  render() {
    return (
      <Container className="py-5">
        <h1 className="display-4 mb-5 font-weight-normal d-none d-md-block">Advanced Encryption Standard (AES)</h1>
        <h1 className="mb-5 font-weight-normal d-md-none">Advanced Encryption Standard (AES)</h1>
        <hr/>
        <Encrypt/>
        <hr/>
        <Decrypt/>
      </Container>
    );
  }
}

export default Index;
