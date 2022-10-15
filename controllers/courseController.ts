import mongoose from "mongoose";
import { ICourse } from "./../types/course.d";
import { isUniqueModule } from "./../utils/courseUtils";
import { NextFunction } from "express";
import { Response } from "express";
import { RequestX } from "express";
import { Course, Video } from "../models/Course";
import { LCOError } from "../utils/lcoError";
import { catchAsyncError } from "./../utils/catchAsyncError";

/**
 * ---------------------------------- ADMIN ROUTES ------------------------------------------------
 * **/
//TODO: move this into helper file
const parseCourseInformation = (course: ICourse) => {
    return <ICourse>{
        ...course,
        author: new mongoose.mongo.ObjectId(course.author),
    };
};

export const addNewCourse = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const course = await Course.create(parseCourseInformation(req.body));

        return res.status(200).json({ status: "success", data: course });
    }
);

export const addCourseModule = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const courseId = req.params.courseId;
        const { moduleName, moduleNo } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new LCOError("course dosen't exists", 404));
        }

        if (isUniqueModule(course, moduleName, moduleNo)) {
            course.modules.push({ moduleTitle: moduleName, moduleNo: moduleNo });
            await course.save({ validateBeforeSave: false });
            return res
                .status(200)
                .json({ status: "success", message: `${moduleName} added successfully...` });
        } else {
            return res
                .status(500)
                .json({ status: "error", message: `${moduleName} is already added!` });
        }
    }
);

export const getCourseByID = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const course = await Course.findById(req.params.courseId);
        return res.status(200).json({ status: "success", data: course });
    }
);

export const addCourseVideo = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const video = await Video.create(req.body);
        return res.status(200).json({ status: "success", data: video });
    }
);

export const getCouseVideos = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const videos = await Video.find({ courseId: req.params.courseId });
        return res.status(200).json({ status: "success", data: videos });
    }
);

export const updateCourse = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        Course.updateOne(
            { _id: req.params.courseId },
            { $set: req.body.data },
            { new: true },
            (err, updatedDoc) => {
                if (err) {
                    return next(new LCOError(err.message, 500));
                }
                return res.status(200).json({ status: "success", data: updatedDoc });
            }
        );
    }
);

export const deleteCourseModule = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { courseId, moduleId } = req.params;
        Course.updateOne(
            { _id: courseId },
            { $pull: { modules: { _id: moduleId } } },
            { new: true },
            (err, result) => {
                if (err) {
                    return next(new LCOError(err.message, 500));
                } else {
                    return res
                        .status(201)
                        .json({ status: "success", data: "module deleted successfully" });
                }
            }
        );
    }
);

/**
 * ---------------------------------- PUBLIC ROUTES ------------------------------------------------
 *
 * */
export const getAllCources = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const cources = await Course.find().populate("author teams");
        return res.status(200).json({ status: "success", data: cources });
    }
);
