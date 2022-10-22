import React, { useState, useLayoutEffect } from 'react';
import './home.css';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { NavContainer } from '../../redux/containers';
import NotLoggedInRedirect from '../../components/NotLoggedInRedirect';
import Footer from '../../components/Footer';
import api from '../../api';

function Home({ history, userData }) {

  const [webDevHighScore, setWebDevHighScore] = useState(0)
  const [webDevAttemps, setWebDevAttemps] = useState(0)
  const [webDevPassed, setWebDevPassed] = useState(false)
  const [mernHighScore, setMernHighScore] = useState(0)
  const [mernAttemps, setMernAttempts] = useState(0)
  const [mernPassed, setMernPassed] = useState(false)

  const retrieveHighScores = (res) => {
    setWebDevHighScore(res.gameStatus.Web_Dev.highestScore)
    setWebDevPassed(res.gameStatus.Web_Dev.passed)
    setWebDevAttemps(res.gameStatus.Web_Dev.attempts)
    setMernHighScore(res.gameStatus.MERN.highestScore)
    setMernPassed(res.gameStatus.MERN.passed)
    setMernAttempts(res.gameStatus.MERN.attempts)
  }

  useLayoutEffect(() => {
    const findUser = async () => {
      const userId = userData._id;
      const getHomeData = await api.getHomeData(userId);
      const res = getHomeData.data.userData;
      retrieveHighScores(res);
    }
    findUser()
    /* eslint-disable-next-line no-console */
    if (!findUser) console.log('There was an error. Please try again.')
  }, [])

  return (
    <>
      <NotLoggedInRedirect>
        <>
          <NavContainer />
          <Row className="justify-content-center">
            <Col sm={11} md={11} lg={8}>
              <div className="mb-sm-4 px-sm-4 pt-md-5 pb-md-4 text-center">
                <h1 className="display-4 page-title">Coding Quiz</h1>
                <p className="lead">
                  Test your skills as a Student in The Last Mile by taking these Cirriculum based corresponding Quizzes.
                  Track your progress through your personal Student Profile,
                  and build a stronger foundation by focusing on the areas where you score low in proficiency.
                  </p>
              </div>
            </Col>
          </Row>

          <Container>
            <CardDeck className="text-center">
              {/* Web Dev Card */}
              <Card>
                <div><h4 className="main-card-deck my-0 font-weight-normal">Web Dev</h4></div>
                <h2>Best Score:<small className="ml-1 text-muted">{webDevHighScore}%</small></h2>
                <ul className="list-unstyled">
                  <li>
                    Proficiency:<span className="ml-1">{webDevHighScore < 50 ? 'Low' : webDevHighScore < 90 ? 'Medium' : 'High'}</span>
                  </li>
                  <li>
                    Attempts:<span className="ml-1">{webDevAttemps}</span>
                  </li>
                </ul>
                <Button onClick={() => history.push('/quiz/web_dev')} className="btn btn-lg btn-block btn-dark">Take Quiz Now</Button>
              </Card>
              {/* MERN Card */}
              <Card>
                <div>
                  <h4 className="main-card-deck my-0 font-weight-normal">MERN</h4>
                </div>
                <h2>Best Score:<small className="ml-1 text-muted">{mernHighScore}%</small></h2>
                <ul className="list-unstyled">
                  <li>
                    Proficiency:<span className="ml-1">{mernHighScore < 50 ? 'Low' : mernHighScore < 90 ? 'Medium' : 'High'}</span>
                  </li>
                  <li>Attempts:<span className="ml-1">{mernAttemps}</span></li>
                </ul>
                <Button onClick={() => history.push('/quiz/mern')} disabled={!userData.gameStatus.Web_Dev.passed} className="btn btn-lg btn-block btn-dark">
                  {/* Lock/Unlock Button */}
                  {userData.gameStatus.Web_Dev.passed ? <i className="ui unlock icon" /> : <i className="ui lock icon" />}
                  Take Quiz Now
                  </Button>
              </Card>
              {/* Student Profile Card */}
              <Card>
                <h4 className="main-card-deck my-0 font-weight-normal">Student Profile</h4>
                <h2>Check Status</h2>
                <ul className="list-unstyled">
                  <li>Web Dev:
                    <span className="ml-1">
                      {
                        webDevPassed
                          ? 'Passed'
                          : !webDevPassed && webDevAttemps >= 1
                            ? 'Failed'
                            : 'Not Tested'
                      }
                    </span>
                  </li>
                  <li>MERN Stack:
                    <span className="ml-1">
                      {
                        mernPassed
                          ? 'Passed'
                          : !mernPassed && mernAttemps >= 1
                            ? 'Failed'
                            : 'Not Tested'
                      }
                    </span>
                  </li>
                </ul>
                <Link to="/profile" className="btn btn-lg btn-block btn-outline-dark">View Profile</Link>
              </Card>
            </CardDeck>
          </Container>
          <Footer />
        </>
      </NotLoggedInRedirect>
    </>
  );
}


export default withRouter(Home);
