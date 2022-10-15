import { NextFunction } from "express";
import { Response } from "express";
import { RequestX } from "express";
import Test from "../models/Test";
import { catchAsyncError } from "../utils/catchAsyncError";
import { LCOError } from "../utils/lcoError";

/**
 * @Admin controllers
 */
export const createTest = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        let test = await Test.findOne({ title: req.body.title });
        if (test) {
            return res.status(409).json({
                status: "error",
                message: `Test with ${req.body.title} title already exists`,
            });
        }

        test = await Test.create(req.body);

        return res
            .status(201)
            .json({ status: "success", message: `${req.body.title} test created successfully...` });
    }
);
export const addQuestions = catchAsyncError(
    async (req: RequestX, res: Response, next: Function) => {
        const testId = req.params.testId;

        Test.updateOne(
            { _id: testId },
            { $push: { questions: req.body.questions } },
            { new: true },
            (err, result) => {
                if (err) {
                    return next(new LCOError(err.message, 500));
                }
                return res.status(201).json({ status: "success", message: "Added Successfully" });
            }
        );
    }
);
export const updateQuestions = catchAsyncError(
    async (req: RequestX, res: Response, next: Function) => {
        const { testId } = req.params;
        Test.updateOne(
            { _id: testId },
            { $set: { "questions.$[elem]": req.body } },
            { arrayFilters: [{ "elem._id": { $eq: req.body._id } }] },
            (err, result) => {
                if (err) {
                    return next(new LCOError(err.message, 500));
                }
                return res.status(201).json({
                    status: "success",
                    message: `${req.body.title} updated successfully...`,
                });
            }
        );
    }
);

/**
 * @Public controllers
 */
export const getAllTests = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const tests = await Test.find();

        return res.status(201).json({ status: "success", data: tests });
    }
);
export const getAllDailyTests = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        let tests = await Test.find({ isDailyTest: true }).populate("author");

        // removing all questions
        const testWithNoQuestions = tests.map((test: any) => {
            return {
                ...test._doc,
                questions: undefined,
            };
        });

        return res.status(201).json({ status: "success", data: testWithNoQuestions });
    }
);
