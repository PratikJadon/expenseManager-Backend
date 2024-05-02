const express = require("express");
const { addCost } = require("../controllers/costController");
const router = express.Router();

router.route("/add").post(addCost);

module.exports = router;
