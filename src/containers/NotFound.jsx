import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <Jumbotron className="bg-white mb-0 text-center">
        <h1 className="display-4">are you lost?</h1>
        <span className="text-muted">go <Link to="/">home</Link></span>
      </Jumbotron>
    );
  }
}

export default NotFound;
