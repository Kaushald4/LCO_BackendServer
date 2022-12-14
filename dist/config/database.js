"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lcoError_1 = require("../utils/lcoError");
const connectDB = async () => {
    return mongoose_1.default
        .connect(process.env.DB_URI, { dbName: "lcdb" })
        .then((ref) => {
        console.log("DB CONNECTED...");
        return ref;
    })
        .catch((err) => new lcoError_1.LCOError(err, 500));
};
exports.connectDB = connectDB;
