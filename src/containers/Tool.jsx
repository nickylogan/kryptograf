import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import { toolRoutes } from '../Routes';
import './Tool.css';

class Tool extends Component {
  render() {
    return (
      <>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="font-weight-light">kryptograf</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
              {toolRoutes.map((route, index) => (
                <LinkContainer to={`/tools${route.path}`} key={index}>
                  <Nav.Link>{route.name}</Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
          </Container>
        </Navbar>
        <section style={{ paddingTop: 56 }}>
          <Switch>
            {toolRoutes.map((route, index) => (
              <Route
                key={index}
                path={`/tools${route.path}`}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </section>
      </>
    );
  }
}

export default Tool;
