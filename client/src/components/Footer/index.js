import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './Footer.css';

function Footer() {

  return (
    <Container className="p-0" fluid>
      <footer className="footer fixed-bottom p-3">
        <Row>
          <Col className="text-center">This site was created for Thesis Project purposes ONLY</Col>
          <Col className="text-center">&copy;The Last Mile | Created By: TLM Student</Col>
        </Row>
      </footer>
    </Container>
  );
}

export default Footer;
