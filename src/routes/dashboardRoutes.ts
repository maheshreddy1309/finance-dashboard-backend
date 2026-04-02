import { Router } from "express";
import {
  getSummaryHandler,
  getCategoryBreakdownHandler,
  getRecentActivityHandler,
} from "../controllers/dashboardController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

router.get(
  "/summary",
  authenticate,
  authorize("VIEWER", "ANALYST", "ADMIN"),
  getSummaryHandler
);

router.get(
  "/category-breakdown",
  authenticate,
  authorize("VIEWER", "ANALYST", "ADMIN"),
  getCategoryBreakdownHandler
);

router.get(
  "/recent-activity",
  authenticate,
  authorize("VIEWER", "ANALYST", "ADMIN"),
  getRecentActivityHandler
);

export default router;