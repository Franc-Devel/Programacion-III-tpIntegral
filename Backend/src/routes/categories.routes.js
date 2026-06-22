import { Router } from "express";
const router = Router();

router.get("/categories", (req, res) => {
  res.json([{ id: 1, name: "Hardware PC" }]);
});

export default router;
