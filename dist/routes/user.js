"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
router.get("/auth/user", auth_1.isAuthenticated, userController_1.getAuthenticatedUser);
exports.default = router;
