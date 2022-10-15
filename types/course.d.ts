import mongoose, { Document, Model, ObjectId } from "mongoose";

interface CoursePoster {
    imageUrl: string;
    imageId: string;
}

interface CourseModules {
    moduleNo: number;
    moduleTitle: string;
    tests?: number;
    trials?: number;
}

export interface ICourse {
    title: string;
    introText: string;
    description: string;
    poster: CoursePoster;
    validity: Date;
    discountedPrice: number;
    originalPrice: number;
    totalLessons: number;
    trialLessons: number;
    discountPercent: number;
    totalTests: number;
    author: any;
    isFree: boolean;
    modules: Array<CourseModules>;
    teams: any;
}

//custom schema object methods to define on document
export interface ICourseDocument extends ICourse, Document {}

//custom methods to deine on Models itself
export interface ICourseModel extends Model<ICourseDocument> {}
