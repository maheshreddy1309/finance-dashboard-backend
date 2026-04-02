import { Router } from "express";
import {
  createRecordHandler,
  getRecordsHandler,
} from "../controllers/recordController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { validate } from "../utils/validate";
import { createRecordSchema } from "../utils/schemas";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createRecordSchema),
  createRecordHandler
);

router.get("/", authenticate, authorize("ANALYST", "ADMIN"), getRecordsHandler);

export default router;