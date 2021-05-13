const express = require('express'),
  router = express.Router(),
  authorize = require('../utils/middlewares/authorize');

const userController = require('../controllers/userController');

router.get('/get-info', authorize, userController.getInfo);

module.exports = router;
