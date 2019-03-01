import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, CardDeck, Table, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <>
        <Jumbotron className="text-center bg-white mb-0 border-bottom">
          <Container>
            <h1 className="display-3">kryptograf</h1>
            <p>A proof-of-concept on cryptography algorithms</p>
          </Container>
        </Jumbotron>
        <section className="bg-light py-5">
          <Container className="flex-fill">
            <Row>
              <Col>
                <CardDeck>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>Asymmetric-key algorithms</Card.Title>
                      <Card.Text>
                        Asymmetric cryptography or public-key cryptography is a cryptography system
                        that uses a pair of keys: a public one (can be known by others), and a
                        private one (which must always be kept secret). Below are examples
                        demonstrating asymmetric cryptography algorithms:
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="pb-0">
                      <Table size="sm" className="border-bottom">
                        <tbody>
                          <tr>
                            <td className="align-middle">Elliptic Curve Cryptography</td>
                            <td className="text-right">
                              <LinkContainer to="tools/ecc">
                                <Button size="sm">
                                  <FontAwesomeIcon icon="key" />
                                </Button>
                              </LinkContainer>
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">Digital Signature Algorithm</td>
                            <td className="text-right">
                              <LinkContainer to="tools/dsa">
                                <Button size="sm">
                                  <FontAwesomeIcon icon="key" />
                                </Button>
                              </LinkContainer>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Footer>
                  </Card>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>Symmetric-key algorithms</Card.Title>
                      <Card.Text>
                        Symmetric-key algorithms are cryptography algorithms that uses the same key
                        for both encryption and decryption. Below are examples demonstrating
                        symmetric-key algorithms:
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="pb-0">
                      <Table size="sm" className="border-bottom">
                        <tbody>
                          <tr>
                            <td className="align-middle">Galois/Counter Mode</td>
                            <td className="text-right">
                              <LinkContainer to="tools/gcm">
                                <Button size="sm">
                                  <FontAwesomeIcon icon="key" />
                                </Button>
                              </LinkContainer>
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">Advanced Encryption Standard</td>
                            <td className="text-right">
                              <LinkContainer to="tools/aes">
                                <Button size="sm">
                                  <FontAwesomeIcon icon="key" />
                                </Button>
                              </LinkContainer>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Footer>
                  </Card>
                </CardDeck>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Home;
