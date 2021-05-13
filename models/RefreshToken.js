const mongoose = require('mongoose'),
  User = require('./User');

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expires: { type: Date },
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

refreshTokenSchema.pre('save', function (next) {
  if (!this.isModified('expires')) next();
  const doc = this;
  this.expires = Date.now() + 864000000;
  next();
});

refreshTokenSchema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires;
});

refreshTokenSchema.virtual('isActive').get(function () {
  return !this.revoked && !this.isExpired;
});

refreshTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret.user;
  },
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
