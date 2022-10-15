import express from "express";
const router = express();
import { getAuthenticatedUser } from "../controllers/userController";
import { isAuthenticated } from "../middleware/auth";

router.get("/auth/user", isAuthenticated, getAuthenticatedUser);

export default router;
