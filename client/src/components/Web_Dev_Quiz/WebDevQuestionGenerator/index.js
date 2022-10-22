import React, { Component } from 'react';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import api from '../../../api';
import { QuizScoresContainer } from '../../../redux/containers';

class WebDevQuestionGenerator extends Component {
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
    const getQuestions = await (await api.getQuestions());
    const { questions } = getQuestions.data;
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
    const htmlCount = quizQuestions.filter((question) => question.language === 'html').length;
    const cssCount = quizQuestions.filter((question) => question.language === 'css').length;
    const bootstrapCount = quizQuestions.filter((question) => question.language === 'bootstrap').length;
    const jqueryCount = quizQuestions.filter((question) => question.language === 'jquery').length;
    const javascriptCount = quizQuestions.filter((question) => question.language === 'javascript').length;
    const total = quizQuestions.length;
    this.setState(() => ({
      quizComplete: true,
      total,
      totalQuestions: {
        html: htmlCount,
        css: cssCount,
        bootstrap: bootstrapCount,
        jquery: jqueryCount,
        javascript: javascriptCount,
      },
    }));
  }

  render() {
    const {
      quizQuestions, questionCount, quizComplete, totalQuestions, total, correctArr, incorrectArr,
    } = this.state;
    return (
      <Container className="" id="showScores">
        <Row className="mt-5">
          <Col className="mt-5 text-center">
            {/* If Quiz is not complete, continue questions */}
            {!quizComplete
              ? (
                <div className="justify-content-left">
                  {/* Question Container */}
                  <h4 className="text-left">Question {questionCount + 1}:
                  {
                      quizQuestions.length > 0
                        ? quizQuestions[questionCount].question
                        : 'Loading Question'
                    }
                  </h4>
                  {/* Load Choices */}
                  {
                    quizQuestions.length > 0 ? quizQuestions[questionCount].allAnswers.map((choice, i) => (
                      <Row key={i}>
                        <Col><Button className="mt-2 btn btn-block btn-light btn-outline-dark" type="button" value={choice} name="choice" onClick={this.setValue}>{choice}</Button></Col>
                      </Row>
                    ))
                      : null
                  }
                  <Row>
                    <Col>
                      <Button className="mt-4" onClick={this.checkAnswer}>Submit</Button>
                    </Col>
                  </Row>
                </div>
              )
              : <QuizScoresContainer
                total={total}
                totalQuestions={totalQuestions}
                correctAnswers={correctArr}
                incorrectAnswers={incorrectArr}
              />
            }
          </Col>
        </Row>

      </Container>
    );
  }
}

export default WebDevQuestionGenerator;
