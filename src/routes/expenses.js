import express from "express";
import {
  ADD_EXPENSE,
  GET_EXPENSES,
  DELETE_EXPENSE,
  GET_EXPENSE_BY_ID,
  GET_STATISTICS,
} from "../controllers/expenses.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/expenses", auth, ADD_EXPENSE);
router.get("/expenses", auth, GET_EXPENSES);
router.get("/expenses/statistics", auth, GET_STATISTICS);
router.get("/expenses/:id", auth, GET_EXPENSE_BY_ID);
router.delete("/expenses/:id", auth, DELETE_EXPENSE);

export default router;
