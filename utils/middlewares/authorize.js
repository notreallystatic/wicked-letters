const User = require('express'),
  RefreshToken = require('../../models/RefreshToken'),
  jwt = require('jsonwebtoken'),
  authHelpers = require('../index').authHelpers;

const UnauthorizedError = new Error('Unauthorized.');
UnauthorizedError.statusCode = 401;

async function authorize(req, res, next) {
  try {
    const refreshTokenId = req.cookies['refresh-token'];
    const jwtToken = req.header('Authorization');
    const validateRefreshTokenId = await RefreshToken.findById(refreshTokenId);
    if (!validateRefreshTokenId || validateRefreshTokenId.isExpired) {
      next(UnauthorizedError);
    } else {
      const decodedToken = await authHelpers.decodeJwt(jwtToken);
      if (!decodedToken) {
        const error = new Error('Invalid access token.');
        error.statusCode = 401;
        next(error);
      } else {
        req.user = decodedToken;
        req.user._id = validateRefreshTokenId.user;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorize;
