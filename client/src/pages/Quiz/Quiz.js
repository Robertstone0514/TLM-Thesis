import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { NavContainer } from '../../redux/containers';
import QuizSelectionButtons from '../../components/QuizSelectionButtons';
import NotLoggedInRedirect from '../../components/NotLoggedInRedirect';
import Footer from '../../components/Footer';

// Quiz selection
function Quiz() {

  return (
    <NotLoggedInRedirect>
      <NavContainer />
      <Row className="justify-content-center">
        <Col sm={11} md={11} lg={8}>
          <div className="mb-sm-4 px-sm-4 pt-md-5 pb-md-4 text-center">
            <h1 className="display-4">Student Quiz</h1>
            <p className="lead">
              Select a quiz and see if you have what it takes! Upon completing the Web Development Fundamentals Quiz,
              you must score a 70% or above to unlock the MERN Stack Quiz.
            </p>
          </div>
        </Col>
      </Row>
      <QuizSelectionButtons />
      <Footer />
    </NotLoggedInRedirect>
  );
  
}

export default Quiz;
