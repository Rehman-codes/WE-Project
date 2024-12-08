import express from "express";
import {
  createItem,
  getItems,
  deleteItem,
  updateItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/create", createItem);
router.get("/all", getItems);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

export default router;
