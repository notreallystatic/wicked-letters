const User = require('../models/User');

exports.getInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    res.status(200).json({ message: userInfo });
  } catch (err) {
    next(err);
  }
};
