import express from "express";
const router = express();

import { adminLogin } from "./../controllers/authController";
import {
    forgotPassword,
    login,
    logout,
    resetPassword,
    signup,
} from "../controllers/authController";

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").get(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

//admin routes
router.route("/auth/admin-login").post(adminLogin);

export default router;
