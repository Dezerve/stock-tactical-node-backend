const express = require("express");
const router = express.Router();

router.post("/addAndContribute", addAndContributeController.createNewItem);

module.exports = router;
