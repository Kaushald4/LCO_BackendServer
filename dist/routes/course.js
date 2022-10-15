"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courseController_1 = require("./../controllers/courseController");
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const auth_1 = require("../middleware/auth");
//@admin Route
router.route("/course/add").post(auth_1.isAuthenticated, auth_1.isAdmin, courseController_1.addNewCourse);
router.route("/course/add/module/:courseId").put(auth_1.isAuthenticated, auth_1.isAdmin, courseController_1.addCourseModule);
router.route("/course/add/video/:courseId").post(auth_1.isAuthenticated, auth_1.isAdmin, courseController_1.addCourseVideo);
router.route("/course/videos").get(auth_1.isAuthenticated, auth_1.isAdmin, courseController_1.getCouseVideos);
router.route("/course/update/:courseId").put(auth_1.isAuthenticated, auth_1.isAdmin, courseController_1.updateCourse);
router
    .route("/course/delete/:courseId/:moduleId")
    .delete(auth_1.isAuthenticated, auth_1.isAdmin, courseController_1.deleteCourseModule);
//@public routes
router.route("/course/:courseId").get(courseController_1.getCourseByID);
router.route("/courses").get(courseController_1.getAllCources);
exports.default = router;
