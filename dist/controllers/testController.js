"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDailyTests = exports.getAllTests = exports.updateQuestions = exports.addQuestions = exports.createTest = void 0;
const Test_1 = __importDefault(require("../models/Test"));
const catchAsyncError_1 = require("../utils/catchAsyncError");
const lcoError_1 = require("../utils/lcoError");
/**
 * @Admin controllers
 */
exports.createTest = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    let test = await Test_1.default.findOne({ title: req.body.title });
    if (test) {
        return res.status(409).json({
            status: "error",
            message: `Test with ${req.body.title} title already exists`,
        });
    }
    test = await Test_1.default.create(req.body);
    return res
        .status(201)
        .json({ status: "success", message: `${req.body.title} test created successfully...` });
});
exports.addQuestions = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const testId = req.params.testId;
    Test_1.default.updateOne({ _id: testId }, { $push: { questions: req.body.questions } }, { new: true }, (err, result) => {
        if (err) {
            return next(new lcoError_1.LCOError(err.message, 500));
        }
        return res.status(201).json({ status: "success", message: "Added Successfully" });
    });
});
exports.updateQuestions = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { testId } = req.params;
    Test_1.default.updateOne({ _id: testId }, { $set: { "questions.$[elem]": req.body } }, { arrayFilters: [{ "elem._id": { $eq: req.body._id } }] }, (err, result) => {
        if (err) {
            return next(new lcoError_1.LCOError(err.message, 500));
        }
        return res.status(201).json({
            status: "success",
            message: `${req.body.title} updated successfully...`,
        });
    });
});
/**
 * @Public controllers
 */
exports.getAllTests = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const tests = await Test_1.default.find();
    return res.status(201).json({ status: "success", data: tests });
});
exports.getAllDailyTests = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    let tests = await Test_1.default.find({ isDailyTest: true }).populate("author");
    // removing all questions
    const testWithNoQuestions = tests.map((test) => {
        return {
            ...test._doc,
            questions: undefined,
        };
    });
    return res.status(201).json({ status: "success", data: testWithNoQuestions });
});
