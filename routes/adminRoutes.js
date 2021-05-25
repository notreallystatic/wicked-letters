const express = require('express'),
  router = express.Router(),
  authorize = require('../utils/middlewares/authorize'),
  authorizeAdmin = require('../utils/middlewares/authorizeAdmin');

const adminController = require('../controllers/adminController');

router.get('/home', authorize, authorizeAdmin, adminController.home);
router.post(
  '/add-category',
  authorize,
  authorizeAdmin,
  adminController.addCategory
);
router.post(
  '/add-newsletter',
  authorize,
  authorizeAdmin,
  adminController.addNewsletter
);
router.post(
  '/delete-category',
  authorize,
  authorizeAdmin,
  adminController.deleteCategory
);
router.post(
  '/delete-newsletter',
  authorize,
  authorizeAdmin,
  adminController.deleteNewsletter
);

module.exports = router;
