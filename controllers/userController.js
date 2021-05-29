const User = require('../models/User'),
  Review = require('../models/Review'),
  Newsletter = require('../models/Newsletter'),
  Category = require('../models/Category');

exports.getInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    res.status(200).json({ message: userInfo });
  } catch (err) {
    next(err);
  }
};

exports.categories = async (req, res, next) => {
  try {
    const allCategories = await Category.find({});
    res.status(200).json({ categories: allCategories });
  } catch (err) {
    next(err);
  }
};

exports.showCategory = async (req, res, next) => {
  try {
    const getCategory = await Category.findById(req.params.id);
    await getCategory
      .populate({
        path: 'newsletters',
        options: { sort: { rating: 'desc' } },
      })
      .execPopulate();
    res.status(200).json(getCategory);
  } catch (err) {
    next(err);
  }
};

exports.showNewsletter = async (req, res, next) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    await newsletter.populate('reviews').execPopulate();
    await newsletter.populate('addedBy').execPopulate();
    res.status(200).json({
      rating: newsletter.rating,
      reviews: newsletter.reviews,
      _id: newsletter.reviews,
      title: newsletter.title,
      description: newsletter.description,
      url: newsletter.url,
      imageUrl: newsletter.imageUrl,
      addedBy: {
        _id: newsletter.addedBy._id,
        name: newsletter.addedBy.name,
        email: newsletter.addedBy.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.rateNewsletter = async (req, res, next) => {
  try {
    const { newsletterId, review } = req.body;
    const rating = parseFloat(req.body.rating);
    const newReview = new Review({
      newsletterId,
      rating,
      review,
      name: req.user.name,
    });
    newReview.userId = req.user._id;
    // check if any review already exists by this user on this newsletter.
    const reviewAlreadyPosted = await Review.findOne({
      newsletterId: newsletterId,
      userId: req.user._id,
    });
    if (reviewAlreadyPosted) {
      const error = new Error(
        'You have already posted a reivew on this newsletter. You can either edit or delete it.'
      );
      error.statusCode = 409;
      next(error);
    } else {
      // save the review
      // push the review on the newsletter
      const findNewsletter = await Newsletter.findById(newsletterId);
      const newNewsletterRating =
        (findNewsletter.rating * findNewsletter.reviews.length + rating) /
        parseFloat(findNewsletter.reviews.length + 1);
      await newReview.save();
      await Newsletter.findOneAndUpdate(
        { _id: newsletterId },
        {
          $set: { rating: newNewsletterRating },
          $push: { reviews: newReview._id },
        },
        { new: true }
      );
      res.status(200).json({ message: 'Successfully posted you review' });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.editNewsletterRating = async (req, res, next) => {
  try {
    // change the overall rating of the newsletter.
    // update the rating.
    const { reviewId, newsletterId, review } = req.body;
    const rating = parseFloat(req.body.rating);
    const prevReview = await Review.findById(reviewId);
    const newsletter = await Newsletter.findById(newsletterId);
    // calculate the new rating
    let newNewsletterRating =
      newsletter.rating * parseFloat(newsletter.reviews.length) -
      prevReview.rating;
    newNewsletterRating += rating;
    newNewsletterRating /= parseFloat(newsletter.reviews.length);
    newsletter.rating = newNewsletterRating;
    prevReview.rating = rating;
    prevReview.review = review;
    await prevReview.save();
    await newsletter.save();
    res.status(200).json({ message: 'Successfully edited your review.' });
  } catch (err) {
    next(err);
  }
};

exports.deleteRating = async (req, res, next) => {
  try {
    // decrease the rating of the newsletter
    // remove the ratingId from newsletter.ratings
    // remove the rating
    const { reviewId, newsletterId } = req.body;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    const newsletter = await Newsletter.findById(newsletterId);
    newsletter.rating *= newsletter.reviews.length;
    newsletter.rating -= parseFloat(deletedReview.rating);
    newsletter.reviews.pull({ _id: reviewId });
    newsletter.rating /= parseFloat(newsletter.reviews.length);
    await newsletter.save();
    res.status(200).json({ message: 'Successfully deleted your review' });
  } catch (err) {
    next(err);
  }
};

exports.allReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user._id }).populate(
      'newsletterId'
    );
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};
