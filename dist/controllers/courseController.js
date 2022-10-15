"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCources = exports.deleteCourseModule = exports.updateCourse = exports.getCouseVideos = exports.addCourseVideo = exports.getCourseByID = exports.addCourseModule = exports.addNewCourse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseUtils_1 = require("./../utils/courseUtils");
const Course_1 = require("../models/Course");
const lcoError_1 = require("../utils/lcoError");
const catchAsyncError_1 = require("./../utils/catchAsyncError");
/**
 * ---------------------------------- ADMIN ROUTES ------------------------------------------------
 * **/
//TODO: move this into helper file
const parseCourseInformation = (course) => {
    return {
        ...course,
        author: new mongoose_1.default.mongo.ObjectId(course.author),
    };
};
exports.addNewCourse = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const course = await Course_1.Course.create(parseCourseInformation(req.body));
    return res.status(200).json({ status: "success", data: course });
});
exports.addCourseModule = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const courseId = req.params.courseId;
    const { moduleName, moduleNo } = req.body;
    const course = await Course_1.Course.findById(courseId);
    if (!course) {
        return next(new lcoError_1.LCOError("course dosen't exists", 404));
    }
    if ((0, courseUtils_1.isUniqueModule)(course, moduleName, moduleNo)) {
        course.modules.push({ moduleTitle: moduleName, moduleNo: moduleNo });
        await course.save({ validateBeforeSave: false });
        return res
            .status(200)
            .json({ status: "success", message: `${moduleName} added successfully...` });
    }
    else {
        return res
            .status(500)
            .json({ status: "error", message: `${moduleName} is already added!` });
    }
});
exports.getCourseByID = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const course = await Course_1.Course.findById(req.params.courseId);
    return res.status(200).json({ status: "success", data: course });
});
exports.addCourseVideo = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const video = await Course_1.Video.create(req.body);
    return res.status(200).json({ status: "success", data: video });
});
exports.getCouseVideos = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const videos = await Course_1.Video.find({ courseId: req.params.courseId });
    return res.status(200).json({ status: "success", data: videos });
});
exports.updateCourse = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    Course_1.Course.updateOne({ _id: req.params.courseId }, { $set: req.body.data }, { new: true }, (err, updatedDoc) => {
        if (err) {
            return next(new lcoError_1.LCOError(err.message, 500));
        }
        return res.status(200).json({ status: "success", data: updatedDoc });
    });
});
exports.deleteCourseModule = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { courseId, moduleId } = req.params;
    Course_1.Course.updateOne({ _id: courseId }, { $pull: { modules: { _id: moduleId } } }, { new: true }, (err, result) => {
        if (err) {
            return next(new lcoError_1.LCOError(err.message, 500));
        }
        else {
            return res
                .status(201)
                .json({ status: "success", data: "module deleted successfully" });
        }
    });
});
/**
 * ---------------------------------- PUBLIC ROUTES ------------------------------------------------
 *
 * */
exports.getAllCources = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const cources = await Course_1.Course.find().populate("author teams");
    return res.status(200).json({ status: "success", data: cources });
});
