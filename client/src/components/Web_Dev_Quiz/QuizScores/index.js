import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import api from '../../../api';
import CustomProgressBar from '../../CustomProgressBar';
// Image Links
import HTML from '../../../images/Web_Dev/HTML5.png';
import CSS from '../../../images/Web_Dev/CSS3.png';
import JS from '../../../images/Web_Dev/JS.png';
import JQUERY from '../../../images/Web_Dev/jquery-icon.black.png';
import BOOTSTRAP from '../../../images/Web_Dev/bootstrap.green.png';
import MONGODB from '../../../images/MERN/mongoDB1.png';
import EXPRESS from '../../../images/MERN/Express-js.png';
import REACT from '../../../images/MERN/react-logo.png';
import NODE from '../../../images/MERN/Node-js.png';

function QuizScores({
  correctAnswers,
  totalQuestions,
  updateScores,
  userData,
  setHighScore,
  total
}) {

  const [currentUserScoreData, setCurrentUserScoreData] = useState([])
  const [totalPercent, setTotalPercent] = useState(0)

  const getPercentage = async (userScoreData) => {
    const newTotalPercent = correctAnswers.length > 0 ? Math.round((correctAnswers.length / total) * 100) : totalPercent;
    updateScores(userScoreData);
    const payload = userScoreData.reduce((init, obj) => {
      init[obj.title.toLowerCase()] = obj.percent;
      return init;
    }, {});
    const setProgressScores = await (await api.setProgressScore({ ...payload, newTotalPercent }, userData._id));
    if (!setProgressScores.data.success) {
      console.log('There was an error setting progress scores') // eslint-disable-line no-console
    }
    const { highestScore, passed } = userData.gameStatus.Web_Dev;
    // Call Action to save total Percent to user. Check for 70% OR Above, and save the highest score
    const highScorePayload = (newTotalPercent >= 70)
      ? ({
        highestScore: (highestScore > newTotalPercent
          ? highestScore
          : newTotalPercent), passed: !passed
            ? true
            : passed
      })
      : ({
        highestScore: highestScore > newTotalPercent
          ? highestScore
          : newTotalPercent, passed
      });
    // If player sets new highScore, set new highScore
    if (newTotalPercent > highestScore) setHighScore(highScorePayload);
    const setQuizData = await (await api.setQuizData({ ...highScorePayload }, userData._id));
    if (!setQuizData.data.success) {
      console.log('There was an error with the Quiz Data Set') // eslint-disable-line no-console
    }
    setTotalPercent(newTotalPercent)
    setCurrentUserScoreData(userScoreData)
  }

  const languagePercent = (num, correct, lang) => {
    let percentLogic = 0
    if (num > 0) {
      percentLogic = Math.round(((correct.filter((question) => question.language === lang).length) / totalQuestions.html) * 100)

    }
    return percentLogic
  }

  const userScoreObj = () => {
    const userScoreData = [
      {
        title: 'HTML',
        img: HTML,
        score: correctAnswers.filter((question) => question.language === 'html').length,
        languageQuestionCount: totalQuestions.html,
        percent: languagePercent(totalQuestions.html, correctAnswers, 'html')
      },
      {
        title: 'CSS',
        img: CSS,
        score: correctAnswers.filter((question) => question.language === 'css').length,
        languageQuestionCount: totalQuestions.css,
        percent: languagePercent(totalQuestions.css, correctAnswers, 'css')
      },
      {
        title: 'Javascript',
        img: JS,
        score: correctAnswers.filter((question) => question.language === 'javascript').length,
        languageQuestionCount: totalQuestions.javascript,
        percent: languagePercent(totalQuestions.javascript, correctAnswers, 'javascript')
      },
      {
        title: 'JQuery',
        img: JQUERY,
        score: correctAnswers.filter((question) => question.language === 'jquery').length,
        languageQuestionCount: totalQuestions.jquery,
        percent: languagePercent(totalQuestions.jquery, correctAnswers, 'jquery')
      },
      {
        title: 'Bootstrap',
        img: BOOTSTRAP,
        score: correctAnswers.filter((question) => question.language === 'bootstrap').length,
        languageQuestionCount: totalQuestions.bootstrap,
        percent: languagePercent(totalQuestions.bootstrap, correctAnswers, 'bootstrap')
      },
      {
        title: 'MongoDB',
        img: MONGODB,
        score: correctAnswers.filter((question) => question.language === 'mongodb').length,
        languageQuestionCount: totalQuestions.mongodb,
        percent: languagePercent(totalQuestions.mongodb, correctAnswers, 'mongodb')
      },
      {
        title: 'Express',
        img: EXPRESS,
        score: correctAnswers.filter((question) => question.language === 'express').length,
        languageQuestionCount: totalQuestions.express,
        percent: languagePercent(totalQuestions.express, correctAnswers, 'express')
      },
      {
        title: 'React',
        img: REACT,
        score: correctAnswers.filter((question) => question.language === 'react').length,
        languageQuestionCount: totalQuestions.react,
        percent: languagePercent(totalQuestions.react, correctAnswers, 'react')
      },
      {
        title: 'Node',
        img: NODE,
        score: correctAnswers.filter((question) => question.language === 'node').length,
        languageQuestionCount: totalQuestions.node,
        percent: languagePercent(totalQuestions.node, correctAnswers, 'node')
      },
    ];
    getPercentage(userScoreData)
  }

  useEffect(() => {
    userScoreObj()
  }, [])

  return (
    <Container fluid className="p-0">
      <h1>You have completed the Web Development Fundamentals Quiz</h1>
      <Table striped hover className="ui compact celled">
        {/* Table Head */}
        <thead>
          <tr>
            <th />
            <th>Language</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Proficiency</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {
            currentUserScoreData
              ? currentUserScoreData.map((data, i) => (
                <tr key={i}>
                  <td><div className="text-center"><img src={data.img} alt="language logo" style={{ height: `${2}rem` }} /></div></td>
                  <td><b>{data.title}</b></td>
                  <td>{data.languageQuestionCount ? `${data.score} of ${data.languageQuestionCount}` : 'Not Tested'}</td>
                  <td style={{ width: 100 }}>
                    <CustomProgressBar
                      title={data.title}
                      newNow={0}
                      newMin={0}
                      newMax={100}
                      percent={data.percent}
                    />
                  </td>
                  <td>{data.percent < 50 ? 'Low' : data.percent < 90 ? 'Medium' : 'High'}</td>
                </tr>
              ))
              : null
          }
          <tr>
            {/* <td><div></div></td> */}
            <td className="text-center" colSpan="5">
              <h2>Total Percentage:{`${totalPercent}%`}</h2>
              {' '}
            </td>
          </tr>
        </tbody>
        {/* Table Footer */}
        <tfoot className="full-width">
          <tr>
            <th />
            <th colSpan="4">
              {/* View Profile Link */}
              <Link to="/profile" className="ui right floated small primary labeled icon button"><i className="user icon" />View Profile</Link>
              {/* Quiz Selection Link */}
              <Link to="/quiz" className="ui small button"><i className="browser icon" />Quiz Selection</Link>
              {/* Return to Home Link */}
              <Link to="/home" className="ui small button"><i className="home icon" />Return to Home</Link>
            </th>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}


export default connect(({ userData }) => ({ userData }), null)(QuizScores);
