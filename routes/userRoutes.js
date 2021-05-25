const express = require('express'),
  router = express.Router(),
  authorize = require('../utils/middlewares/authorize');

const userController = require('../controllers/userController');

router.get('/get-info', authorize, userController.getInfo);
router.post('/rate-newsletter', authorize, userController.rateNewsletter);
router.put('/rate-newsletter', authorize, userController.editNewsletterRating);
router.delete('/rate-newsletter', authorize, userController.deleteRating);

module.exports = router;
