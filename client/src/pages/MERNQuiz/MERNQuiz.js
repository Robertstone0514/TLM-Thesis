import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavContainer } from '../../redux/containers';
import MERNQuestionGenerator from '../../components/MERN_Quiz/MERNQuestionGenerator';
import Footer from '../../components/Footer';

// Import MERNQuestionGenerator Component
function MERNQuiz() {
  return (
    <>
      <NavContainer />
      <Row>
        <Col>
          <MERNQuestionGenerator />
        </Col>
      </Row>
      <Footer />
    </>
  );
}
export default MERNQuiz;
