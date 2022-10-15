import { Document } from "mongoose";

interface Option {
    option: string;
    title: string;
}
export interface Question {
    title: string;
    options: Array<Option>;
    answer: string;
}

interface ITestPoster {
    imageUrl: string;
    imageId: string;
}
export interface ITest {
    title: string;
    introText: string;
    description: string;
    marks: number;
    questions: Array<Question>;
    poster: ITestPoster;
    timeLimit: number;
    scheduledAt: Date;
    numOfAttempts: number;
    marketPrice: number;
    discountPercent: number;
    discountedPrice: number;
    validity: Date;
    isDailyTest: boolean;
    isFree: boolean;
    author: any;
}

//custom schema object methods to define on document
export interface ITestDocument extends ITest, Document {}

//custom methods to deine on Models itself
export interface ITestModel extends Model<ITestDocument> {}
