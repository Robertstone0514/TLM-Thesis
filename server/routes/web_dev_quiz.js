const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/web_dev_controller');

// Web_Dev Routes
router.get('/questions', QuestionController.retrieveQuestions);
router.put('/progress/setscore/:userId', QuestionController.setProgressScores);
router.get('/profile/getaverage/:userEmail', QuestionController.profileScoreAverages);
router.put('/quizdata/:userId', QuestionController.setQuizData);

module.exports = router;
