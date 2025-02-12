const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createWord,
  getAllWords,
  getSingleWord,
  updateWord,
  deleteWord,
  uploadImage,
  getTopicsData,
} = require("../controllers/wordController");

const { getSingleWordReviews } = require("../controllers/wordController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createWord)
  .get(getAllWords);

// router
//   .route('/uploadImage')
//   .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
  .route("/:id")
  .get(getSingleWord)
  .patch([authenticateUser, authorizePermissions("admin")], updateWord)
  .delete([authenticateUser, authorizePermissions("admin")], deleteWord);

// router.route('/:id/reviews').get(getSingleWordReviews);

// router.route("/topics").get(getTopicsData);

module.exports = router;
