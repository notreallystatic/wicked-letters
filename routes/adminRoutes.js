const express = require('express'),
  router = express.Router(),
  authorize = require('../utils/middlewares/authorize'),
  authorizeAdmin = require('../utils/middlewares/authorizeAdmin');

const adminController = require('../controllers/adminController');

router.get('/home', authorize, authorizeAdmin, adminController.home);
router.post(
  '/category',
  authorize,
  authorizeAdmin,
  adminController.addCategory
);
router.delete(
  '/category',
  authorize,
  authorizeAdmin,
  adminController.deleteCategory
);
router.post(
  '/newsletter',
  authorize,
  authorizeAdmin,
  adminController.addNewsletter
);
router.delete(
  '/newsletter',
  authorize,
  authorizeAdmin,
  adminController.deleteNewsletter
);

module.exports = router;
