import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  photo_url: { type: String, required: true },
  owner_id: { type: String, required: true },
});

export default mongoose.model("Expense", expenseSchema);
