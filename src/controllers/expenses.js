import ExpenseModel from "../models/expense.js";

const ADD_EXPENSE = async (req, res) => {
  try {
    const expense = new ExpenseModel({
      title: req.body.title,
      type: req.body.type,
      amount: Number(req.body.amount),
      description: req.body.description,
      photo_url: req.body.photo_url,
      owner_id: req.body.userId,
      creation_date: new Date(),
    });

    const response = await expense.save();

    return res.status(201).json({ response: response });
  } catch (err) {
    console.log("ERR:", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_EXPENSES = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({
      owner_id: req.body.userId,
    }).sort({ creation_date: -1 });
    return res.status(200).json({ expenses: expenses });
  } catch (err) {
    console.log("ERR:", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_STATISTICS = async (req, res) => {
  try {
    const expenses = await ExpenseModel.aggregate([
      {
        $match: { owner_id: req.body.userId },
      },
      {
        $group: { _id: "$type", totalAmount: { $sum: "$amount" } },
      },
    ]);

    return res.status(200).json({ expenses: expenses });
  } catch (err) {
    console.log("ERR:", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_EXPENSE_BY_ID = async (req, res) => {
  const expense = await ExpenseModel.findOne({ _id: req.params.id });
  return res.status(200).json({ expense: expense });
};

const DELETE_EXPENSE = async (req, res) => {
  const response = await ExpenseModel.deleteOne({ _id: req.params.id });
  return res.status(200).json({ response: response });
};

export {
  ADD_EXPENSE,
  GET_EXPENSES,
  DELETE_EXPENSE,
  GET_EXPENSE_BY_ID,
  GET_STATISTICS,
};
