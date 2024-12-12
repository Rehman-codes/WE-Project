// External imports
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Internal imports
import connectDB from "./src/config/db.js";
import inspectionReportRoutes from "./src/routes/inspectionReportRoutes.js";
import contractRoutes from "./src/routes/contractRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import adjustmentRoutes from "./src/routes/adjustmentRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.use("/item", itemRoutes);
app.use("/adjustment", adjustmentRoutes);
app.use("/order", orderRoutes);
app.use("/supplier", supplierRoutes);
app.use("/contract", contractRoutes);
app.use("/inspectionReport", inspectionReportRoutes);
app.use("/", "Root");

export default app;
