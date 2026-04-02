import { Router } from "express";
import { loginHandler } from "../controllers/authController";
import { validate } from "../utils/validate";
import { loginSchema } from "../utils/schemas";

const router = Router();

router.post("/login", validate(loginSchema), loginHandler);

export default router;