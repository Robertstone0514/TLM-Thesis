import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../api';
import tlmLogo from '../../images/TLM_Logos/tlmlogo.png';
import Footer from '../../components/Footer';

function Login({ toggleLoading, loginUser, history, userData }) {

  const [errMessage, setErrMessage] = useState(null)
  const _email = useRef('')
  const _password = useRef('')

  // onSubmit Function
  const onSubmit = async (e) => {
    e.preventDefault();
    toggleLoading(true);
    try {
      const payloadData = {
        email: _email.current.value,
        password: _password.current.value,
        isLoggedIn: true
      };
      const userLogin = await (await api.login(payloadData));
      let newErrMessage = userLogin.data.message;
      if (!userLogin.data.success) {
        setErrMessage(newErrMessage)
        setTimeout(() => {
          newErrMessage = false
          setErrMessage(newErrMessage)
        }, 3000);
      }
      setTimeout(async () => {
        toggleLoading(false);
        const { success } = userLogin.data;
        if (success) {
          const payloadUser = userLogin.data.user._id;
          const userImage = await (await api.findImage(payloadUser));
          loginUser({ ...userLogin.data.user, userImage: userImage.data.userImage });
          history.push('/home');
        }
      }, 1000);
    } catch (error) {
      toggleLoading(false);
      // eslint-disable-next-line
      console.log(`Error: ${error.message}`)
    }
  };

  return (
    <>
      {
        !userData.isLoggedIn || !userData
          ? (
            <>
              <div className="text-center">
                <img id="tlmLogo" alt="TLM Logo" src={tlmLogo} />
              </div>
              <Container className="text-center">
                <Row className="justify-content-center">
                  <Col sm={8} md={7} lg={5}>
                    <h2 className="mt-5 mb-3" id="studentLogin">Student Login</h2>
                    <Form onSubmit={onSubmit} className="ui form stacked segment">
                      {/* Email Field / Input */}
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="user icon" />
                          <FormControl type="text" ref={_email} placeholder="E-mail address" required />
                        </div>
                      </div>
                      {/* Password Field / Input */}
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="lock icon" />
                          <FormControl type="password" ref={_password} placeholder="Password" required />
                        </div>
                      </div>
                      {/* Login Button */}
                      {
                        userData.loading
                          ? <Button className="ui fluid button">
                            <span className="text-center">
                              <i className="notched circle loading icon" />
                            </span>
                          </Button>
                          : <Button className="ui fluid button" type="submit">Login</Button>
                      }
                    </Form>

                    <div className="ui message">New to us?<a href="/register"> Sign Up</a></div>

                    {/* Display error messages */}
                    {errMessage ? <div id="errorMsg" className="ui error message">{errMessage}</div> : null}
                  </Col>
                </Row>
              </Container>
              <Footer />
            </>
          )
          : <Redirect to="/home" />
      }
    </>
  );
}

export default withRouter(Login);
