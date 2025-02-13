const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createConversation,
  getAllConversations,
  getSingleConversation,
  updateConversation,
  deleteConversation,
} = require("../controllers/conversationController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createConversation)
  .get(getAllConversations);

router
  .route("/:id")
  .get(getSingleConversation)
  .patch([authenticateUser, authorizePermissions("admin")], updateConversation)
  .delete([authenticateUser, authorizePermissions("admin")], deleteConversation);

// router.route('/:id/reviews').get(getSingleConversationReviews);

module.exports = router;
