"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.resetPassword = exports.forgotPassword = exports.logout = exports.signup = exports.login = void 0;
const catchAsyncError_1 = require("../utils/catchAsyncError");
const User_1 = require("../models/User");
const lcoError_1 = require("../utils/lcoError");
const sendJwtToken_1 = require("../utils/sendJwtToken");
const email_1 = __importDefault(require("../utils/email"));
const crypto_1 = __importDefault(require("crypto"));
exports.login = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User_1.User.findByEmail(email);
    if (!user) {
        return next(new lcoError_1.LCOError("Email Doesn't exit", 404));
    }
    const isValidPass = await user.isValidPassword(password);
    if (!isValidPass) {
        return next(new lcoError_1.LCOError("Invalid Password", 400));
    }
    (0, sendJwtToken_1.sendJwtToken)(user, res);
});
exports.signup = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User_1.User.findByEmail(email);
    if (user) {
        return next(new lcoError_1.LCOError("Email already exists!", 409));
    }
    let name = email.match(/([a-z 0-9]+\d?\@)/g);
    if (name) {
        name = name[0].replace("@", "");
    }
    user = await User_1.User.create({
        email,
        password,
        name,
    });
    (0, sendJwtToken_1.sendJwtToken)(user, res);
});
exports.logout = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    res.clearCookie("token", { expires: new Date(), httpOnly: true });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
});
exports.forgotPassword = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { email } = req.body;
    const user = await User_1.User.findByEmail(email);
    if (!user) {
        return next(new lcoError_1.LCOError("Email does not exists!", 404));
    }
    //generate password reset token
    const passResetToken = await user.genForgotPasswordToken();
    //send token to frontend
    const URL = `${req.protocol}://${req.get("host")}/api/v1/reset-password/${passResetToken}`;
    const mail = new email_1.default(user, URL);
    try {
        await user.save({ validateBeforeSave: false });
        await mail.sendForgotPassLink();
        return res.status(200).json({
            status: "success",
            message: "Password reset link sent successfully...",
        });
    }
    catch (e) {
        user.forgot_password_token = undefined;
        user.forgot_password_expire = undefined;
        user.pass_changed_at = undefined;
        await user.save({ validateBeforeSave: false });
    }
});
exports.resetPassword = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto_1.default.createHash("sha256").update(token).digest("hex");
    const user = await User_1.User.findOne({
        forgot_password_token: hashedToken,
        forgot_password_expire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new lcoError_1.LCOError("Token Expired or Invalid Token!", 401));
    }
    user.password = password;
    user.forgot_password_expire = undefined;
    user.forgot_password_token = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        message: "Password Changed Successfully",
    });
});
/**
 * -------------------------------- ADMIN -------------------------------------------
 */
exports.adminLogin = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { email, password } = req.body;
    let admin = await User_1.User.findAdminByEmail(email);
    if (!admin) {
        return next(new lcoError_1.LCOError("Email Doesn't exit", 404));
    }
    const isValidPass = await admin.isValidPassword(password);
    if (!isValidPass) {
        return next(new lcoError_1.LCOError("Invalid Password", 400));
    }
    (0, sendJwtToken_1.sendJwtToken)(admin, res);
});
