import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import { toolRoutes } from '../Routes';
import './Tool.css';

class Tool extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>kryptograf</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
              {toolRoutes.map((route, index) => (
                <LinkContainer to={`${match.url}${route.path}`} key={index}>
                  <Nav.Link>{route.name}</Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
          </Container>
        </Navbar>
        <Switch>
          {toolRoutes.map((route, index) => (
            <Route
              key={index}
              path={`${match.path}${route.path}`}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </>
    );
  }
}

export default Tool;
