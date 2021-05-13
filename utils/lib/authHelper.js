const jwt = require('jsonwebtoken'),
  config = require('../index').environment,
  User = require('../../models/User'),
  RefreshToken = require('../../models/RefreshToken');

module.exports = {
  generateJwtToken,
  decodeJwt,
  setCookie,
  deleteCookie,
};

function generateJwtToken(user) {
  const jwtSecret = config.jwtSecret;
  const payload = user;
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '15m',
  });

  return token;
}

async function decodeJwt(token) {
  // return decoded data if token is valid, else return undefined.
  const jwtSecret = config.jwtSecret;
  try {
    const decodedData = await jwt.verify(token, jwtSecret);
    return decodedData;
  } catch (err) {
    return undefined;
  }
}

function setCookie(res, cookieName, cookie) {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // expiration is set to 10 days.
  };
  // secure: true,
  res.cookie(cookieName, cookie, cookieOptions);
}

function deleteCookie(res, cookieName) {
  res.clearCookie(cookieName);
}
