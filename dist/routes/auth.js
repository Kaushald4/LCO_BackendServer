"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const authController_1 = require("./../controllers/authController");
const authController_2 = require("../controllers/authController");
router.route("/login").post(authController_2.login);
router.route("/signup").post(authController_2.signup);
router.route("/logout").get(authController_2.logout);
router.route("/forgot-password").post(authController_2.forgotPassword);
router.route("/reset-password/:token").post(authController_2.resetPassword);
//admin routes
router.route("/auth/admin-login").post(authController_1.adminLogin);
exports.default = router;
