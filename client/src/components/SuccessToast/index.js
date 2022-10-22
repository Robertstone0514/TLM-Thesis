import { Row, Col, Toast } from 'react-bootstrap';
import './SuccessToast.css';

function SuccessToast({show, body}) {
    
    return (
        <Row>
            <Col>
                <Toast className="success" show={show} delay={2000} autohide>
                    <Toast.Header closeButton={false}>
                        <i className="check icon" />
                        <strong className="mr-auto">Status:</strong>
                        <small>Successful</small>
                    </Toast.Header>
                    <Toast.Body>{body}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default SuccessToast;
