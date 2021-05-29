const User = require('../models/User'),
  RefreshToken = require('../models/RefreshToken'),
  authHelpers = require('../utils').authHelpers,
  Token = require('../models/Token'),
  Mailer = require('../utils/mailer'),
  crypto = require('crypto');


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

      var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
      await token.save();
      Mailer(newUser.email, req.headers.host, token.token);

      // return response.
      res.status(200).json({ 'message':'Registration Successfull'});
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
      } else // Make sure the user has been verified
        if (!user.isVerified) {
          const error = new Error('not-verified');
          error.statusCode = 402;
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



exports.emailConfirmation = (req, res, next) => {
  const token = req.params.token;

  // Find a matching token
  Token.findOne({ token }, function (err, token) {
    if (!token) {
      return res.status(400).send({ type: 'not-verified', msg: 'Invalid token' });
    }
    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send("The account has been verified. Please log in.");
      });
    });
  })
}

exports.resendToken = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email }, function (err, user) {
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
    if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

    // Check if token already exist for user then send that otherwise generate a new token.
    Token.findOne({ _userId: user._id }, function (err, token) {
      if (token) {
        Mailer(user.email, req.headers.host, token.token);
        return res.status(200).send('A verification email has been sent to ' + user.email + '.');
      }

      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        // Send the email
        Mailer(user.email, req.headers.host, token.token);
        return res.status(200).send('A verification email has been sent to ' + user.email + '.');
      });

    })


  })
}

