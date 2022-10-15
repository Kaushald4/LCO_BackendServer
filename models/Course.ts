import { ICourseDocument, ICourseModel } from "./../types/course.d";
import mongoose, { ObjectId, Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const VideoSchema = new Schema({
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

const CourseSchema = new Schema<ICourseDocument, ICourseModel>({
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
        default: new Date(
            new Date().getFullYear() + 2,
            new Date().getMonth(),
            new Date().getDate()
        ),
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
        type: Array<ObjectId>,
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

const Course = mongoose.model("Course", CourseSchema);
const Video = mongoose.model("Video", VideoSchema);

export { Course, Video };
