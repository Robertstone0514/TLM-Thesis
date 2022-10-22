import React from 'react';
import { connect } from 'react-redux';
import './ProfileInfoCard.css';
import { Button, Row, Col, Form, InputGroup, FormControl, Card } from 'react-bootstrap';
import image from '../../../images/Miscellaneous/unknownUser1.png';

function ProfileInfoCard({
    userData,
    toggleEditPhotoModal,
    toggleEditProfileModal,
    toggleDeactivation
}) {

    return (
        <Card>
            <Card.Header>Personal Information</Card.Header>
            <Row className="mt-2">
                <Col>
                    <div className="imgIcon">
                        {/* Placeholder/User Image */}
                        {
                            userData.userImage
                                ? <Card.Img className="mr-3 userImg" src={`data:image/png;base64,${userData.userImage}`} alt="User Image" style={{ height: 225, width: 225 }} />
                                : <Card.Img className="mr-3 userImg" src={image} alt="User Image" style={{ height: 225, width: 225 }} />
                        }
                        <div className="overlay">
                            <p id="changePicText">
                                <Button variant="outline-light" onClick={toggleEditPhotoModal}>Change Profile Picture</Button>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Card.Body>
                <Card.Text>These are readOnly values, and can be edited through the Edit Profile Feature</Card.Text>
            </Card.Body>
            <Form className="p-4">
                <Row className="justify-content-center">
                    <Col sm={12} md={10} lg={8}>
                        <Form.Group>
                            <Form.Label srOnly>First Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>First Name:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="inlineFormInputGroup"
                                    placeholder={userData.firstName}
                                    readOnly
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm={12} md={10} lg={8}>
                        <Form.Group>
                            <Form.Label srOnly>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Last Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="inlineFormInputGroup"
                                    placeholder={userData.lastName}
                                    readOnly
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm={12} md={10} lg={8}>
                        <Form.Group>
                            <Form.Label srOnly>Email</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Email</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="inlineFormInputGroup"
                                    placeholder={userData.email}
                                    pattern="^.+@.+\..{3}$"
                                    readOnly
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Card.Body>
                <Row>
                    <Col className="">
                        <Button
                            className="xs-screen"
                            variant="outline-info"
                            onClick={toggleEditProfileModal}>Edit Profile</Button>
                    </Col>
                    <Col className="float-right">
                        <Button
                            className="xs-screen"
                            variant="outline-danger"
                            onClick={toggleDeactivation}>Deactivate Profile</Button>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    )
}

export default connect(({ userData }) => ({ userData }), null)(ProfileInfoCard)
