const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gameStatus: {
    Web_Dev: {
      attempts: { type: Number, default: 0 },
      passed: { type: Boolean, default: false },
      highestScore: { type: Number, default: 0 },
    },
    MERN: {
      attempts: { type: Number, default: 0 },
      passed: { type: Boolean, default: false },
      highestScore: { type: Number, default: 0 },
    },
  },
  language: {
    html: { average: Array },
    css: { average: Array },
    javascript: { average: Array },
    jquery: { average: Array },
    bootstrap: { average: Array },
    mongodb: { average: Array },
    express: { average: Array },
    react: { average: Array },
    node: { average: Array },
  },
  isLoggedIn: Boolean,
  userImage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }], // Images Array
},
{ timestamps: true });

// hash Password when creating user
userSchema.pre('save', async function hashPass(next) {
  const hash = await bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

// Validate User at LogIn
userSchema.methods.isValidPassword = async function userValidate(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
