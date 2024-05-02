const { StatusCodes } = require("http-status-codes");
const CustomError = require("../middleware/CustomError");
const costModel = require("../models/costModel");

// Register User
exports.addCost = async (req, res) => {
  const [amount, type, date] = req.body;
  const newData = { amount, type };
  if (date) newData["date"] = date;

  await costModel.save(newData);
  res.StatusCodes(StatusCodes.OK).json("Expense is added.");
};
