import express from "express";
import { addQuestions, updateQuestions } from "./../controllers/testController";
import { createTest, getAllTests, getAllDailyTests } from "../controllers/testController";
import { isAdmin, isAuthenticated } from "./../middleware/auth";

const router = express.Router();

/*******************************************************************************
 * @Admin Routes
 *******************************************************************************/
router.route("/course/test").post(isAuthenticated, isAdmin, createTest);
router
    .route("/course/test/question/:testId")
    .post(isAuthenticated, isAdmin, addQuestions)
    .put(isAuthenticated, isAdmin, updateQuestions);

/**
 * @Public Routes
 */
router.route("/course/tests").get(getAllTests);
router.route("/course/daily/tests").get(getAllDailyTests);

export default router;
