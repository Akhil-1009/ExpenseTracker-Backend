import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
 
import mongoose from "mongoose";
import authroutes from './routes/auth.js'
import transactionroutes from './routes/transaction.js';
 
const app = express();
const PORT = process.env.PORT || 8000;
//db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => console.log("db_connected")).catch((err) => console.log(err));

//middleware
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());
app.use('/api', authroutes);
app.use('/api',transactionroutes);



app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})