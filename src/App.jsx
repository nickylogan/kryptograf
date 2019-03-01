import React, { Component } from 'react';
import './App.css';
import { mainRoutes } from './Routes';
import { Container } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <main role="main" className="flex-fill">
          <Switch>
            {mainRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.component} />
            ))}
          </Switch>
        </main>
        <footer className="text-muted py-3 border-top">
          <Container>
            <p className="mb-2 float-right">
              <a href="https://github.com/nickylogan/kryptograf">Source</a>
            </p>
            <p className="mb-2">
              Pay a visit to our <Link to="/authors">contributors</Link>
            </p>
          </Container>
        </footer>
      </div>
    );
  }
}

export default App;
