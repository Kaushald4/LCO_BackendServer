"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = require("./../controllers/testController");
const testController_2 = require("../controllers/testController");
const auth_1 = require("./../middleware/auth");
const router = express_1.default.Router();
/*******************************************************************************
 * @Admin Routes
 *******************************************************************************/
router.route("/course/test").post(auth_1.isAuthenticated, auth_1.isAdmin, testController_2.createTest);
router
    .route("/course/test/question/:testId")
    .post(auth_1.isAuthenticated, auth_1.isAdmin, testController_1.addQuestions)
    .put(auth_1.isAuthenticated, auth_1.isAdmin, testController_1.updateQuestions);
/**
 * @Public Routes
 */
router.route("/course/tests").get(testController_2.getAllTests);
router.route("/course/daily/tests").get(testController_2.getAllDailyTests);
exports.default = router;
