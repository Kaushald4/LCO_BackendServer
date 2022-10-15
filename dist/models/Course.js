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
exports.Video = exports.Course = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const VideoSchema = new mongoose_1.Schema({
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    moduleId: {
        type: ObjectId,
        ref: "Course.modules",
        required: true,
    },
    videoUrl: {
        video: String,
        videoId: String,
    },
    videoNo: Number,
});
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        maxlength: [80, "course title must be less than 80 char"],
        required: [true, "please provide course title"],
        trim: true,
        lowercase: true,
    },
    introText: {
        type: String,
        maxlength: [450, "intro text must be less than 450 char"],
        required: [true, "please provide course intro text"],
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        maxlength: [5000, "description must be less than 1000 char"],
        required: [true, "please provide course description"],
        trim: true,
        lowercase: true,
    },
    poster: {
        imageUrl: String,
        imageId: String,
    },
    validity: {
        type: Date,
        default: new Date(new Date().getFullYear() + 2, new Date().getMonth(), new Date().getDate()),
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    discountPercent: {
        type: Number,
        default: 0,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    totalLessons: {
        type: Number,
        default: 0,
    },
    trialLessons: {
        type: Number,
    },
    totalTests: {
        type: Number,
    },
    author: {
        type: ObjectId,
        ref: "User",
    },
    teams: {
        type: (Array),
        ref: "User",
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    modules: {
        type: [
            {
                moduleNo: Number,
                moduleTitle: String,
                tests: {
                    type: Number,
                    default: 0,
                },
                trials: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        required: true,
    },
});
const Course = mongoose_1.default.model("Course", CourseSchema);
exports.Course = Course;
const Video = mongoose_1.default.model("Video", VideoSchema);
exports.Video = Video;
