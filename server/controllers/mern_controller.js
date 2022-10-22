const User = require('../models/user');
const Question = require('../models/question');

const retrieveQuestions = async (req, res) => {
  try {
    // Retrieve 20 questions for MERN from the selected languages
    const questions = await Question.aggregate([
      {
        $match: {
          track: 'MERN',
          language: { $in: ['mongodb', 'express', 'react', 'node'] }
        }
      }, {
        $sample: {
          size: 20
        }
      }
    ]);
    return res.json({ success: true, questions, message: 'Questions successfully found.' });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const setMERNProgressScores = async (req, res) => {
  try {
    // Track attempts and show user scores
    const findUser = await User.findByIdAndUpdate({
      _id: req.params.userId
    }, {
        $inc: { 'gameStatus.MERN.attempts': 1 },
        $push: {
          'language.mongodb.average': req.body.mongodb,
          'language.express.average': req.body.express,
          'language.react.average': req.body.react,
          'language.node.average': req.body.node,
        },
      }, { new: true, useFindAndModify: false });
    if (!findUser) return res.json({ success: false, message: 'User could not be found, please try again!' });
    return res.json({
      success: true
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const setMERNQuizData = async (req, res) => {
  try {
    // Track (passed || failed) and set highscore
    const findUser = await User.findByIdAndUpdate({ _id: req.params.userId }, {
      $set: {
        'gameStatus.MERN.passed': req.body.passed,
        'gameStatus.MERN.highestScore': req.body.highestScore,
      },
    }, { useFindAndModify: false, new: true });
    if (!findUser) return res.json({ success: false, message: 'User could not be found, please try again!' });
    return res.json({
      success: true
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

module.exports = {
  retrieveQuestions,
  setMERNQuizData,
  setMERNProgressScores
};
