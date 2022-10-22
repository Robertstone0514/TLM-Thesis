import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavContainer } from '../../redux/containers';
import WebDevQuestionGenerator from '../../components/Web_Dev_Quiz/WebDevQuestionGenerator';
import Footer from '../../components/Footer';

// Import WebDevQuestionGenerator Component
function WebDevQuiz() {
  return (
    <>
      <NavContainer />
      <Row>
        <Col>
          <WebDevQuestionGenerator />
        </Col>
        <Footer />
      </Row>
    </>
  );
}

export default WebDevQuiz;
