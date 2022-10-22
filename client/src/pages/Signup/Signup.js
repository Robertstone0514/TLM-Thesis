import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, Container, Col, Button, FormControl, Row, Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../api';
import Footer from '../../components/Footer';

function Signup({
  userData,
  toggleLoading,
  createUser,
  history,
  addUserImage
}) {

  const [errMessage, setErrMessage] = useState(false)

  const createProfileImg = async (imgFile, _id) => {
    const payload = { imgFile, userId: _id };
    const createUserProfileImg = await (await api.createImage(payload));
    if (createUserProfileImg.data.success) {
      /* eslint-disable-next-line no-console */
      console.log('User Profile Image Created')
    }
    const findUserImage = await (await api.findImage(_id));
    const userImg = findUserImage.data.userImage;
    addUserImage(userImg);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    toggleLoading(true);
    const payload = new FormData(e.target);
    const signup = await (await api.signup(payload));
    let updateErrMessage = signup.data.message;
    setTimeout(() => {
      if (!signup.data.success) {
        setErrMessage(updateErrMessage)
        setTimeout(() => {
          updateErrMessage = false;
          setErrMessage(updateErrMessage)
        }, 3000);
      }
      toggleLoading(false);
      const { userInfo, imgFile } = signup.data;
      if (userInfo) {
        createProfileImg(imgFile, userInfo._id);
        createUser(signup.data.userInfo);
        history.push('/home');
      }
    }, 3000);
  };

  return (
    <>
      <Container fluid>
        <div className="ui form segment mt-5">
          <h2 className="ml-3">Please Register to Continue</h2>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            {/* FIRSTNAME INPUT */}
            <Form.Group>
              <Form.Label as={Col} sm={4} className="mt-3">First Name:</Form.Label>
              <Col sm={8}>
                <FormControl
                  type="text"
                  name="firstName"
                  placeholder="First..."
                  required
                />
              </Col>
            </Form.Group>
            {/* LASTNAME INPUT */}
            <Form.Group>
              <Form.Label as={Col} sm={4}>Last Name:</Form.Label>
              <Col sm={8}>
                <FormControl
                  type="text"
                  name="lastName"
                  placeholder="Last..."
                  required
                />
              </Col>
            </Form.Group>
            {/* USERNAME/EMAIL INPUT */}
            <Form.Group>
              <Form.Label as={Col} sm={4}>Email:</Form.Label>
              <Col sm={8}>
                <FormControl
                  type="text"
                  name="email"
                  pattern="^.+@.+\..{3}$"
                  placeholder="Email..."
                  required
                />
              </Col>
            </Form.Group>
            {/* PASSWORD INPUT */}
            <Form.Group>
              <Form.Label as={Col} sm={4}>Password:</Form.Label>
              <Col sm={8}>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </Col>
            </Form.Group>
            {/* USER PHOTO INPUT */}
            <Form.Group>
              <Form.Label as={Col} sm={4}>(Optional) Profile Picture:</Form.Label>
              <Col sm={8}>
                <FormControl
                  type="file"
               
                  name="userImage"
                />
              </Col>
            </Form.Group>
            {/* SIGN IN BUTTON */}
            <Form.Group>
              <Row className="ml-1">
                <Col sm={4} md={3} lg={2}>
                  <Button to="/" as={Link} variant="danger" className="mb-3">Return to Login</Button>
                </Col>
                <Col>
                  {
                    userData.loading
                      ? <Button variant="primary" className="mb-3">
                        <span className="ext-center">
                          <Spinner className="mr-1" as="span" role="status" animation="border" variant="light" size="sm" />
                          Please wait
                            </span>
                      </Button>

                      : <Button type="submit" variant="primary" className="mb-3">Sign Up</Button>
                  }
                </Col>
              </Row>

            </Form.Group>
          </Form>
        </div>
        {/* Display error messages */}
        {
          errMessage
            ? <div id="errorMsg" className="ui error message">{errMessage}</div>
            : null
        }
      </Container>
      <Footer />
    </>
  );
}

export default withRouter(Signup);
