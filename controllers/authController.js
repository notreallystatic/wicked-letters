const User = require('../models/User'),
  RefreshToken = require('../models/RefreshToken'),
  authHelpers = require('../utils').authHelpers;

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      next(error);
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save();
      const newRefreshToken = new RefreshToken({
        user: newUser._id,
        createdByIp: req.ip,
      });
      await newRefreshToken.save();
      const jwtToken = authHelpers.generateJwtToken({
        name,
        email,
        isAdmin: newUser.isAdmin,
        _id: newUser._id,
        isVerified: false,
      });
      // set the refresh-token cookit
      authHelpers.setCookie(res, 'refresh-token', newRefreshToken._id);
      // return the access-token, to store in redux.
      res.status(200).json({ 'access-token': jwtToken });
    }
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const error = new Error(`No user exsists by ${email}.`);
      error.statusCode = 404;
      next(error);
    } else {
      const passwordMatches = await user.isPasswordCorrect(password);
      if (!passwordMatches) {
        const error = new Error('Incorrect password.');
        error.statusCode = 403;
        next(error);
      } else {
        // create jwtToken & create refresh token
        const newRefreshToken = new RefreshToken({
          user: user._id,
          createdByIp: req.ip,
        });
        await newRefreshToken.save();
        const jwtToken = authHelpers.generateJwtToken({
          _id: user._id,
          name: user.name,
          email: user.email,
          contact: user.contact,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
        });
        authHelpers.setCookie(res, 'refresh-token', newRefreshToken._id);
        res.status(200).json({ 'access-token': jwtToken });
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshTokenId = req.cookies['refresh-token'];
    authHelpers.deleteCookie(res, 'refresh-token');
    // revoke the refresh-token(delete it).
    await RefreshToken.deleteOne({ _id: refreshTokenId });
    res.status(200).json({ message: 'Successfully logged you out.' });
  } catch (err) {
    next(err);
  }
};

exports.refreshAccessToken = async (req, res, next) => {
  try {
    const refreshTokenId = req.cookies['refresh-token'];
    const validateRefreshToken = await RefreshToken.findById(refreshTokenId);
    if (!validateRefreshToken || validateRefreshToken.isExpired) {
      const error = new Error('Unauthorized.');
      error.statusCode = 403;
      next(error);
    } else {
      const user = await User.findById(validateRefreshToken.user);
      const jwtToken = authHelpers.generateJwtToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      });
      res.status(200).json({ 'access-token': jwtToken });
    }
  } catch (err) {
    next(err);
  }
};
