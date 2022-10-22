const fs = require('fs'); // Require the 'fs' Module
const User = require('../models/user'); // Require the User Model
const Image = require('../models/image'); // Require the Image Model

const createImage = async (req, res) => {
  try {
    const payload = req.body;
    const { userId } = payload;
    const image = new Image({
      'img.data': fs.readFileSync(payload.imgFile.path),
      'img.contentType': 'image/png'
    });
    const completeImg = await image.save();
    if (!completeImg) return res.json({ success: false, message: 'There was a problem saving the user image!' });
    // Add the Image _id to the users Images Array
    const findUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { userImage: image._id } },
      { useFindAndModify: false, new: true },
    );
    if (!findUser) return res.json({ success: false, message: 'User image could not be set, please try again!' });
    // Pull the File Name from the path
    // const newPath = path.win32.basename(payload.imgFile.path)
    // Delete the Image File from the images folder
    fs.unlinkSync(payload.imgFile.path);
    return res.json({
      success: true
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

const findImage = async (req, res) => {
  try {
    // Find the current logged in user by Id
    const user = await User.findOne({ _id: req.params.id });
    const userImage = await Image.findOne({ _id: user.userImage[0] });
    return res.json({
      userImage: userImage.img.data.toString('base64')
    });
  } catch (error) { return res.json({ success: false, message: error.message }) }
};

module.exports = {
  createImage,
  findImage
};
