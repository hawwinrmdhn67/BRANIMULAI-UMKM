import express from "express";
import {
  getAllUMKM,
  addUMKM,
  deleteUMKM,
  approveUMKM,
  rejectUMKM,
} from "../controllers/umkmController";

const router = express.Router();

router.get("/", getAllUMKM);
router.post("/", addUMKM);
router.delete("/:id", deleteUMKM);
router.put("/:id/approve", approveUMKM);
router.put("/:id/reject", rejectUMKM);

export default router;
