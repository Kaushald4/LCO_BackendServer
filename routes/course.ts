import {
    addNewCourse,
    addCourseModule,
    getCourseByID,
    addCourseVideo,
    getCouseVideos,
    updateCourse,
    getAllCources,
    deleteCourseModule,
} from "./../controllers/courseController";
import express from "express";
const router = express();
import { isAuthenticated, isAdmin } from "../middleware/auth";
import { validateCourseFields } from "../middleware/validators/courseValidator";

//@admin Route
router.route("/course/add").post(isAuthenticated, isAdmin, addNewCourse);
router.route("/course/add/module/:courseId").put(isAuthenticated, isAdmin, addCourseModule);
router.route("/course/add/video/:courseId").post(isAuthenticated, isAdmin, addCourseVideo);
router.route("/course/videos").get(isAuthenticated, isAdmin, getCouseVideos);
router.route("/course/update/:courseId").put(isAuthenticated, isAdmin, updateCourse);
router
    .route("/course/delete/:courseId/:moduleId")
    .delete(isAuthenticated, isAdmin, deleteCourseModule);

//@public routes
router.route("/course/:courseId").get(getCourseByID);
router.route("/courses").get(getAllCources);

export default router;
