const express = require('express'),
  router = express.Router(),
  authorize = require('../utils/middlewares/authorize');

const userController = require('../controllers/userController');

router.get('/get-info', authorize, userController.getInfo);
router.get('/categories', userController.categories);
router.get('/categories/:id', userController.showCategory);
router.get('/newsletter/:id', userController.showNewsletter);
router.post('/rate-newsletter', authorize, userController.rateNewsletter);
router.put('/rate-newsletter', authorize, userController.editNewsletterRating);
router.delete('/rate-newsletter', authorize, userController.deleteRating);
router.get('/reviews', authorize, userController.allReviews);

module.exports = router;
