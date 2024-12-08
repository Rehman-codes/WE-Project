import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

export default app;
