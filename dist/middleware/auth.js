"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const catchAsyncError_1 = require("./../utils/catchAsyncError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lcoError_1 = require("../utils/lcoError");
const User_1 = require("../models/User");
exports.isAuthenticated = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization?.replace("Bearer", "").trim();
    if (!token) {
        return next(new lcoError_1.LCOError("Invalid token! Login again", 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = await User_1.User.findById(decoded.id);
    if (!user) {
        return next(new lcoError_1.LCOError("User no longer exists!", 401));
    }
    const isUserChangedPassword = user.passwordChangedAfter(decoded.iat);
    if (isUserChangedPassword) {
        res.clearCookie("token", { expires: new Date(), httpOnly: true });
        return next(new lcoError_1.LCOError("Password recently changed login again!", 401));
    }
    req.auth = user;
    return next();
});
exports.isAdmin = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    if (req.auth && req.auth.role === "admin") {
        return next();
    }
    return next(new lcoError_1.LCOError("Access Denied", 401));
});
