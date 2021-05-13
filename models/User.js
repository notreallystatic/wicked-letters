const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  contact: { type: String },
  isVerified: { type: Boolean, default: false },
});

// Hash password everytime it is changed.
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) next();

  const doc = this;
  const SALT = 10;
  bcrypt.hash(doc.password, SALT, function (err, hashedPassowrd) {
    if (err) next(err);
    else {
      doc.password = hashedPassowrd;
      next();
    }
  });
});

// check if password is correct or not.
userSchema.methods.isPasswordCorrect = async function (password, next) {
  try {
    const isCorrect = await bcrypt.compare(password, this.password);
    return isCorrect;
  } catch (err) {
    next(err);
  }
};

// delete password field when fetching any auth details
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

module.exports = mongoose.model('User', userSchema);
