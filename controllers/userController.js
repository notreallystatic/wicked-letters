const User = require('../models/User'),
  Review = require('../models/Review'),
  Newsletter = require('../models/Newsletter');

exports.getInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    res.status(200).json({ message: userInfo });
  } catch (err) {
    next(err);
  }
};

exports.rateNewsletter = async (req, res, next) => {
  try {
    const { newsletterId, review } = req.body;
    const rating = parseInt(req.body.rating);
    const newReview = new Review({ newsletterId, rating, review });
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
      await newReview.save();
      // push the review on the newsletter
      const findNewsletter = await Newsletter.findById(newsletterId);
      await Newsletter.findOneAndUpdate(
        { _id: newsletterId },
        {
          $set: { rating: findNewsletter.rating + rating },
          $push: { reviews: newReview._id },
        },
        { new: true }
      );
      res.status(200).json({ message: 'Successfully posted you review' });
    }
  } catch (err) {
    next(err);
  }
};

exports.editNewsletterRating = async (req, res, next) => {
  try {
    // change the overall rating of the newsletter.
    // update the rating.
    const { reviewId, newsletterId, review } = req.body;
    const rating = parseInt(req.body.rating);
    const prevReview = await Review.findById(reviewId);
    const newsletter = await Newsletter.findById(newsletterId);
    newsletter.rating = newsletter.rating - prevReview.rating + rating;
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
    newsletter.rating -= deletedReview.rating;
    newsletter.reviews.pull({ _id: reviewId });
    await newsletter.save();
    res.status(200).json({ message: 'Successfully deleted your review' });
  } catch (err) {
    next(err);
  }
};
