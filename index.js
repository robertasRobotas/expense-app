import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import expenseRouter from "./src/routes/expenses.js";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(expenseRouter);

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("err:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`App connected on port ${process.env.PORT}`);
});
