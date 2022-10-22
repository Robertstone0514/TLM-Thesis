import { Row, Col, Modal, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

function OptionMERN({
    show,
    handleClose,
    userData,
    target
}) {
    return (
        <Modal size="lg" centered backdrop="static" show={show} onHide={handleClose}>
            {/* Modal Header and Title */}
            <Modal.Header closeButton><Modal.Title>{`Student: ${userData.email}`}</Modal.Title></Modal.Header>
            {/* Body */}
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        {/* Body text (MERN Stack) */}
                        <Col>
                            You are about to begin the MERN Stack Quiz. Be advised this is a quiz based on Full-Stack knowledge.
                             Please be sure to read and answer all questions carefully.
                         </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <ol>
                                {/* User / Quiz Info (MERN Stack) */}
                                <p>Name:{userData.firstName}{' '}{userData.lastName}</p>
                                <p>Quiz:{target}</p>
                                <p>Questions: 20</p>
                                <p>Skill set required: MongoDB, Express, React, Node</p>
                            </ol>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <NavLink to="#" className="btn btn-danger" onClick={handleClose}>Go back</NavLink>
                <NavLink to="/quiz/mern" className="btn btn-success" onClick={handleClose}>Start</NavLink>
            </Modal.Footer>
        </Modal>
    )
}

export default OptionMERN;
