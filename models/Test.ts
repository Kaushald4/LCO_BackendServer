import { ITestDocument, ITestModel, Question } from "./../types/test.d";
import mongoose, { ObjectId, Schema } from "mongoose";

const TestSchema = new Schema<ITestDocument, ITestModel>({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    introText: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    marks: {
        type: Number,
        required: true,
        trim: true,
    },
    questions: [
        {
            title: String,
            options: [
                {
                    title: String,
                    option: String,
                },
            ],
            answer: String,
        },
    ],
    poster: {
        imageUrl: String,
        imageId: String,
    },
    timeLimit: {
        type: Number,
        default: 0,
    },
    scheduledAt: {
        type: Date,
        default: new Date(),
    },
    numOfAttempts: {
        type: Number,
        required: true,
        default: 1,
    },
    marketPrice: Number,
    discountPercent: Number,
    discountedPrice: Number,
    validity: {
        type: Date,
    },
    isDailyTest: {
        type: Boolean,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
