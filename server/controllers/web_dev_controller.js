const User = require('../models/user');
const Question = require('../models/question');

const retrieveQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {
        $match: {
          track: 'WDF',
          language: { $in: ['html', 'css', 'javascript', 'jquery', 'bootstrap'] }
        }
      }, {
        $sample: { size: 25 }
      }
    ]);
    return res.json({
      success: true,
      questions,
      message: 'Questions successfully found.'
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const setProgressScores = async (req, res) => {
  try {
    const findUser = await User.findByIdAndUpdate({ _id: req.params.userId },
      {
        $inc: { 'gameStatus.Web_Dev.attempts': 1 },
        $push: {
          'language.html.average': req.body.html,
          'language.css.average': req.body.css,
          'language.javascript.average': req.body.javascript,
          'language.jquery.average': req.body.jquery,
          'language.bootstrap.average': req.body.bootstrap,
        },
      },
      { new: true, useFindAndModify: false });
    if (!findUser) return res.json({ success: false, message: 'User could not be found, please try again!' });
    return res.json({
      success: true
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const setQuizData = async (req, res) => {
  try {
    const findUser = await User.findByIdAndUpdate({ _id: req.params.userId }, {
      $set: {
        'gameStatus.Web_Dev.passed': req.body.passed,
        'gameStatus.Web_Dev.highestScore': req.body.highestScore,
      },
    }, { useFindAndModify: false, new: true });
    if (!findUser) return res.json({ success: false, message: 'User could not be found, please try again!' });
    return res.json({
      success: true
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const profileScoreAverages = async (req, res) => {
  try {
    const userScoreAverage = await User.aggregate([
      { $match: { email: req.params.userEmail } },
      {
        $project: {
          _id: 0,
          scores: [
            { title: 'html', percent: { $avg: '$language.html.average' } },
            { title: 'css', percent: { $avg: '$language.css.average' } },
            { title: 'javascript', percent: { $avg: '$language.javascript.average' } },
            { title: 'jquery', percent: { $avg: '$language.jquery.average' } },
            { title: 'bootstrap', percent: { $avg: '$language.bootstrap.average' } },
            { title: 'mongodb', percent: { $avg: '$language.mongodb.average' } },
            { title: 'express', percent: { $avg: '$language.express.average' } },
            { title: 'react', percent: { $avg: '$language.react.average' } },
            { title: 'node', percent: { $avg: '$language.node.average' } },
          ],
        },
      },
    ]);
    return res.json({
      success: true,
      average: userScoreAverage[0].scores,
      message: 'User Score Averages'
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

module.exports = {
  retrieveQuestions,
  setProgressScores,
  profileScoreAverages,
  setQuizData,
};
