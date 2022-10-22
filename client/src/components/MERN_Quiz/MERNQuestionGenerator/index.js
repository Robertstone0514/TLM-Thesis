import React, { Component } from 'react';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import api from '../../../api';
import { MERNQuizScoresContainer } from '../../../redux/containers';

class MERNQuestionGenerator extends Component {
  state = {
    quizQuestions: [],
    questionCount: 0,
    userChoice: '',
    correctArr: [],
    incorrectArr: [],
    quizComplete: false,
    totalQuestions: [],
  }

  componentDidMount() {
    this.retrieveQuestions();
  }

  retrieveQuestions = async () => {
    const getMERNQuestions = await (await api.getMERNQuestions());
    const { questions } = getMERNQuestions.data;
    this.setState(() => ({ quizQuestions: questions }));
  }

  setValue = (e) => {
    const userChoice = e.target.value;
    this.setState(() => ({ userChoice }));
  }

  checkAnswer = () => {
    const { userChoice, quizQuestions, questionCount } = this.state;
    // if (!userChoice) return;
    // Set correct and Incorrect arrays
    if (userChoice !== quizQuestions[questionCount].correctAnswer) {
      this.setState((state) => ({ incorrectArr: [...state.incorrectArr, state.quizQuestions[state.questionCount]] }));
    } else {
      this.setState((state) => ({ correctArr: [...state.correctArr, state.quizQuestions[state.questionCount]] }));
    }
    // Determine if last question has been asked
    if (questionCount < quizQuestions.length - 1) {
      this.nextQuestion();
    } else {
      this.quizFinished();
    }
    this.setState(() => ({ userChoice: '' }));
  }

  // Ask next question
  nextQuestion = () => this.setState((state) => ({ questionCount: state.questionCount + 1 }))

  // End Quiz
  quizFinished = () => {
    const { quizQuestions } = this.state;
    const mongodbCount = quizQuestions.filter((question) => question.language === 'mongodb').length;
    const expressCount = quizQuestions.filter((question) => question.language === 'express').length;
    const reactCount = quizQuestions.filter((question) => question.language === 'react').length;
    const nodeCount = quizQuestions.filter((question) => question.language === 'node').length;
    const total = quizQuestions.length;
    this.setState(() => ({
      quizComplete: true,
      total,
      totalQuestions: {
        mongodb: mongodbCount,
        express: expressCount,
        react: reactCount,
        node: nodeCount,
      },
    }));
  }

  render() {
    const {
      quizComplete, questionCount, quizQuestions, total, totalQuestions, correctArr, incorrectArr,
    } = this.state;
    return (
      <Container className="text-center mt-5" id="showScores">
        {/* If Quiz is not complete, continue questions */}
        {
          !quizComplete
            ? (
              <div className="justify-content-left">
                {/* Ask Questions */}
                <h4 className="text-left">
                  Question{questionCount + 1}:
                  {
                    quizQuestions.length > 0 ? quizQuestions[questionCount].question : 'Loading Question'
                  }
                </h4>
                {/* Load Choices */}
                {
                  quizQuestions.length > 0 ? quizQuestions[questionCount].allAnswers.map((choice, i) => (
                    <Row key={i}>
                      <Col><Button className="mt-2 btn btn-block btn-light btn-outline-dark" type="button" value={choice} name="choice" onClick={this.setValue}>{choice}</Button></Col>
                    </Row>
                  ))
                    : null}
                <Row>
                  {' '}
                  <Col><Button className="mt-4" onClick={this.checkAnswer}>Submit</Button></Col>
                </Row>
              </div>
            )
            : <MERNQuizScoresContainer
              total={total}
              totalQuestions={totalQuestions}
              correctAnswers={correctArr}
              incorrectAnswers={incorrectArr}
            />
        }
      </Container>
    );
  }
}

export default MERNQuestionGenerator;
