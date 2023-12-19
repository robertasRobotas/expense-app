import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: false },
  owner_id: { type: String, required: true },
  creation_date: { type: Date, required: true },
});

export default mongoose.model("Expense", expenseSchema);
