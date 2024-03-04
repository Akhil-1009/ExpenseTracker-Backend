import express from "express";
import * as transaction from "../controllers/transaction.js";
// import { requireSignin } from "../middlewares/auth.js";

const router = express.Router();


router.post('/add-transaction', transaction.add);
router.post('/getall-transaction', transaction.getall);
router.post('/edit-transaction',transaction.editTransaction);
router.post('/delete-transaction',transaction.deleteTransaction);
export default router;