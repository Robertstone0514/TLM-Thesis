import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import './QuizSelectionButtons.css';
import OptionMERN from './OptionMERN';
import OptionWebDev from './OptionWebDev';

function QuizSelectionButtons({ userData }) {

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState('')

  const handleClose = () => setShow(false);

  // Toggle show/hide Modal
  const handleShow = str => {
    setShow(true)
    setTarget(str)
  }

  const webDev = 'Web Development Fundamentals';
  const mernStack = 'MERN Stack';
  
  return (
    <div className="text-center">
      {/* Quiz Selection Buttons */}
      <Row className="mt-4 justify-content-center" style={{ height: `${40}vh` }}>
        <Col lg={4} md={6} sm={8} xs={7}>
          <Button
            onClick={() => handleShow(webDev)}
            className="btn-block btn-success"
            id="gradient-red">Web Development Fundamentals</Button>
          <Button
            disabled={!userData.gameStatus.Web_Dev.passed}
            onClick={() => handleShow(mernStack)}
            className="btn-block btn-warning"
            id="gradient-gold">
            {
              userData.gameStatus.Web_Dev.passed
                ? <i className="ui unlock icon" />
                : <i className="ui lock icon" />
            }
            MERN Stack
            </Button>
        </Col>
      </Row>

      {/* (Web_Dev Modal) If Web Dev Button is clicked, show this Modal */}
      {
        target === webDev
          ? <OptionWebDev
            handleClose={handleClose}
            show={show}
            target={target}
            userData={userData}
          />
          // (MERN Stack Modal) Else if MERN Stack Button is clicked, show this Modal
          : target === mernStack
            ? <OptionMERN
              handleClose={handleClose}
              show={show}
              target={target}
              userData={userData}
            />
            // Else do nothing (additional tests' may be added here with proper conditional)
            : null
      }
    </div>
  );
}

export default connect(({ userData }) => ({ userData }), null)(withRouter(QuizSelectionButtons));
