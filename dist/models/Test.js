"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TestSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
const Test = mongoose_1.default.model("Test", TestSchema);
exports.default = Test;
