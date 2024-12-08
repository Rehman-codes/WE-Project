import express from "express";
import {
  createOrder,
  getOrders,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getOrders);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);

export default router;
