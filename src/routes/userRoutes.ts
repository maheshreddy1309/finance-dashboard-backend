import { Router } from "express";
import {
  createUserHandler,
  getUsersHandler,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN"), createUserHandler);
router.get("/", authenticate, authorize("ADMIN"), getUsersHandler);

export default router;