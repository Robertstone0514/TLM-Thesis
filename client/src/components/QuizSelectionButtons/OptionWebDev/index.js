import { Row, Col, Modal, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom/cjs/react-router-dom';

function OptionMERN({
    show,
    handleClose,
    userData,
    target
}) {
    
    return (
        <Modal size="lg" centered backdrop="static" show={show} onHide={handleClose}>
            {/* Modal Header and Title */}
            <Modal.Header>
                <Modal.Title>{`Student: ${userData.email}`}</Modal.Title>
                {' '}
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        {/* Body text (Web_Dev Modal) */}
                        <Col><p className="lead">You are about to begin the Web Development Fundamentals Quiz. Please be sure to read and answer all questions carefully.</p></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <ol>
                                {/* User & Quiz Info (Web_Dev Modal) */}
                                <p>Name:{userData.firstName}{' '}{userData.lastName}</p>
                                <p>Quiz:{target}</p>
                                <p>Questions: 25</p>
                                <p>Skill set required: HTML, CSS, Javascript, JQuery, Bootstrap</p>
                            </ol>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <NavLink to="#" className="btn btn-danger" onClick={handleClose}>Go back</NavLink>
                {/* START QUIZ BUTTON */}
                <Link to="/quiz/web_dev" className="btn btn-success" onClick={handleClose}>Start</Link>
            </Modal.Footer>
        </Modal>
    )
}

export default OptionMERN;
