const express = require('express'),
  User = require('../../models/User');

const UnauthorizedError = new Error('Unauthorized.');
UnauthorizedError.statusCode = 401;

async function authorizeAdmin(req, res, next) {
  try {
    const userId = req.user._id;
    const findUser = await User.findById(userId);
    if (findUser && findUser.isAdmin) {
      next();
    } else {
      next(UnauthorizedError);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorizeAdmin;
