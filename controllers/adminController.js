const User = require('../models/User'),
  Category = require('../models/Category'),
  Newsletter = require('../models/Newsletter');

exports.home = (req, res, next) => {
  try {
    console.log('logged in as admin');
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newCategory = new Category({ title, description, imageUrl });
    await newCategory.save();
    res.status(200).json({ message: 'Added a new category.' });
  } catch (err) {
    next(err);
  }
};

exports.addNewsletter = async (req, res, next) => {
  try {
    const { title, description, url, imageUrl, category } = req.body;
    const newNewsletter = new Newsletter({ title, description, url, imageUrl });
    newNewsletter.addedBy = req.user._id;
    await newNewsletter.save();
    await Category.findOneAndUpdate(
      { title: category },
      {
        $push: { newsletters: newNewsletter._id },
      },
      { new: true }
    );
    res.status(200).json({ message: 'Added new newsletter.' });
  } catch (err) {
    next(err);
  }
};
