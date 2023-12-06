import mongoose from "mongoose";
import ExpenseModel from "../models/expense.js";

const ADD_EXPENSE = async (req, res) => {
  const expense = new ExpenseModel({
    title: req.body.title,
    type: req.body.type,
    amount: req.body.amount,
    description: req.body.description,
    photo_url: req.body.photo_url,
    owner_id: req.body.owner_id,
  });

  const response = await expense.save();

  return res.status(200).json({ response: response });
};

const GET_EXPENSES = async (req, res) => {
  const expenses = await ExpenseModel.find();
  return res.status(200).json({ expenses: expenses });
};

const GET_EXPENSE_BY_ID = async (req, res) => {
  const expense = await ExpenseModel.findOne({ _id: req.params.id });
  return res.status(200).json({ expense: expense });
};

const DELETE_EXPENSE = async (req, res) => {
  const response = await ExpenseModel.deleteOne({ _id: req.params.id });
  return res.status(200).json({ response: response });
};

export { ADD_EXPENSE, GET_EXPENSES, DELETE_EXPENSE, GET_EXPENSE_BY_ID };