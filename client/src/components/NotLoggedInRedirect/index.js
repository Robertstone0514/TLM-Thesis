import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import NotLoggedIn from '../../pages/NotLoggedIn';

function NotLoggedInRedirect({ userData, children }) {
    return (
        <Row>
            <Col className="text-center">
                {
                    userData.isLoggedIn
                        ? children
                        : <NotLoggedIn />
                }
            </Col>
        </Row>
    )
}

export default connect(({ userData }) => ({ userData }), null)(NotLoggedInRedirect);
