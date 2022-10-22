const multiparty = require('multiparty'); // Require Multiparty
const path = require('path');
const fs = require('fs'); // Require the 'fs' Module
const User = require('../models/user');
const compose = require('../util/formCompose'); // Require custom Form Compose Functions
const objHelpers = require('../util/objHelper'); // Require custom objHelper
const Image = require('../models/image'); // Require the Image Model

const signupUser = async (req, res) => {
  // Create New multiparty Form instance with "uploadDir" property
  const form = new multiparty.Form({
    uploadDir: path.resolve('../client/public/assets/images/userImage'),
  });
  // Compose function runs from (right to left), removing square brackets from the user results
  const formatForm = compose(
    objHelpers.return_Obj_From_Array_Of_SubArrays,
    objHelpers.remove_ArryBrackets_From_SubArray_Value,
  );
  form.parse(req, async (err, fields, files) => {
    try {
      // Set entire img file
      const imgFile = files.userImage[0];
      // set imgPath for later unLink
      const imgPath = files.userImage[0].path;
      // Format all fields with compose function
      const body = formatForm(fields);
      const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        isLoggedIn: true,
      });
      const user_Email_Exists = await User.aggregate([
        // Compare the projected email with the lowercase copy of user email
        { $match: { email: user.email } },
        // Allow the email field to proceed in the pipeline, excluding the _id field
        { $project: { email: 1, _id: 0 } },
      ]);
      if (user_Email_Exists.length) return res.json({ success: false, message: 'Email already exists. Please try again.' });
      const savedUser = await user.save();
      if (!savedUser) return res.json({ success: false, message: 'There was a problem saving the user.' });
      return res.json({
        success: true,
        message: 'User created!',
        imgFile,
        imgPath,
        userInfo: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          _id: savedUser._id,
          isLoggedIn: true,
        },
      });
    } catch (error) { return res.json({ success: false, message: error.message }) }
  });
};

const loginUser = async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { isLoggedIn: req.body.isLoggedIn } },
      { useFindAndModify: false, new: true },
    );
    // If user doesn not exist, then respond with 'invalid'' message
    if (!user) return res.json({ success: false, message: 'Invalid login.' });
    // If user does exist, continue with the validation from User isValidPassword method
    const validate = await user.isValidPassword(req.body.password);
    if (!validate) return res.json({ success: false, message: 'Invalid login.' });
    return res.json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isLoggedIn: user.isLoggedIn,
        userImage: user.userImage,
        gameStatus: {
          Web_Dev: {
            passed: user.gameStatus.Web_Dev.passed,
            highestScore: user.gameStatus.Web_Dev.highestScore,
          },
          MERN: {
            passed: user.gameStatus.MERN.passed,
            highestScore: user.gameStatus.MERN.highestScore,
          },
        },
      },
      message: 'Logged in successfully.',
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { isLoggedIn: false } },
      { useFindAndModify: false, new: true },
    );
    if (!user) return res.json({ success: false, message: 'Error, please try again.' });
    return res.json({ success: true, user, message: 'Logged out successfully.' });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const editUser = async (req, res) => {
  const form = new multiparty.Form({});
  // Compose function runs from (right to left), removing square brackets from the user results
  const formatForm = compose(
    objHelpers.return_Obj_From_Array_Of_SubArrays,
    objHelpers.remove_ArryBrackets_From_SubArray_Value,
  );
  form.parse(req, async (err, fields) => {
    try {
      const body = formatForm(fields);
      const user = await User.findOneAndUpdate(
        { _id: body.userId },
        { ...body },
        { new: true, useFindAndModify: false },
      );
      return res.json({
        success: true,
        message: 'User updated!',
        userInfo: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          _id: user._id,
          isLoggedIn: user.isLoggedIn,
        },
      });
    } catch (error) { return res.json({ success: false, message: error.message }) }
  });
};

const editPhoto = async (req, res) => {
  // Create New multiparty Form instance with "uploadDir" property
  const form = new multiparty.Form({
    uploadDir: path.resolve('../client/public/assets/images/userImage'),
  });
  // Compose function runs from (right to left), removing square brackets from the user results
  const formatForm = compose(
    objHelpers.return_Obj_From_Array_Of_SubArrays,
    objHelpers.remove_ArryBrackets_From_SubArray_Value,
  );
  form.parse(req, async (err, fields, files) => {
    try {
      const body = formatForm(fields);
      const imgPath = files.userImage[0].path;
      const user = await User.findOne({ _id: body.userId });
      const userImage = await Image.findOneAndUpdate({
        _id: user.userImage
      }, {
          $set: {
            'img.data': fs.readFileSync(imgPath)
          }
        }, { new: true, useFindAndModify: false });
      fs.unlinkSync(imgPath);
      return res.json({
        success: true,
        message: 'User updated!',
        userInfo: {
          userImage: userImage.img.data.toString('base64'),
        },
      });
    } catch (error) { return res.json({ success: false, message: error.message }) }
  });
};

const getHomeData = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id }, { password: 0 });
    return res.json({
      success: true,
      userData,
      message: 'User Home Data'
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const deleteAccount = async (req, res) => {
  try {
    const deleteAction = await User.findByIdAndDelete({ _id: req.params.id });
    if (!deleteAction) console.log('There was a problem deleteing your account.') // eslint-disable-line no-console
    return res.json({
      success: true,
      message: 'User Account Deleted!'
    })
  } catch (error) { return res.json({ success: false, message: error.message }) }
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  editUser,
  editPhoto,
  getHomeData,
  deleteAccount,
};
