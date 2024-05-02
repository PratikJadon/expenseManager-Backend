const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//User Schema
const costSchema = new mongoose.Schema({
  amount: { type: String },
  date: { type: Date, default: Date.now() },
  type: { type: String },
});

module.exports = mongoose.model("cost", costSchema);
