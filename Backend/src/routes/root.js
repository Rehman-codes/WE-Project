import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Root");
});

export default router;