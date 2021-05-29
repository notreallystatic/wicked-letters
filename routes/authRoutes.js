const express = require('express'),
  router = express.Router(),
  authorize = require('../utils/middlewares/authorize');

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authorize, authController.logout);
router.get('/refresh-access-token', authController.refreshAccessToken);
router.get('/resendToken', authController.resendToken);
router.get('/emailConfirmation/:token', authController.emailConfirmation);

module.exports = router;
