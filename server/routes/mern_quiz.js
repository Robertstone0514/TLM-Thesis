const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/mern_controller');

// Web_Dev Routes
router.get('/questions', QuestionController.retrieveQuestions);
router.put('/progress/setscore/:userId', QuestionController.setMERNProgressScores);
router.put('/quizdata/:userId', QuestionController.setMERNQuizData);

module.exports = router;
