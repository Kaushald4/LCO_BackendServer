import { catchAsyncError } from "../utils/catchAsyncError";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { LCOError } from "../utils/lcoError";
import { sendJwtToken } from "../utils/sendJwtToken";
import Email from "../utils/email";
import crypto from "crypto";
import { IUserDocument } from "../types/user";

export const login = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user: IUserDocument | null = await User.findByEmail(email);

    if (!user) {
        return next(new LCOError("Email Doesn't exit", 404));
    }

    const isValidPass = await user.isValidPassword(password);

    if (!isValidPass) {
        return next(new LCOError("Invalid Password", 400));
    }

    sendJwtToken(user, res);
});

export const signup = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let user = await User.findByEmail(email);
    if (user) {
        return next(new LCOError("Email already exists!", 409));
    }

    let name = email.match(/([a-z 0-9]+\d?\@)/g);
    if (name) {
        name = name[0].replace("@", "");
    }

    user = await User.create({
        email,
        password,
        name,
    });

    sendJwtToken(user, res);
});

export const logout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token", { expires: new Date(), httpOnly: true });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
});

export const forgotPassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        const user = await User.findByEmail(email);

        if (!user) {
            return next(new LCOError("Email does not exists!", 404));
        }

        //generate password reset token
        const passResetToken = await user.genForgotPasswordToken();

        //send token to frontend
        const URL = `${req.protocol}://${req.get("host")}/api/v1/reset-password/${passResetToken}`;
        const mail = new Email(user, URL);

        try {
            await user.save({ validateBeforeSave: false });
            await mail.sendForgotPassLink();
            return res.status(200).json({
                status: "success",
                message: "Password reset link sent successfully...",
            });
        } catch (e) {
            user.forgot_password_token = undefined;
            user.forgot_password_expire = undefined;
            user.pass_changed_at = undefined;
            await user.save({ validateBeforeSave: false });
        }
    }
);

export const resetPassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;
        const { password } = req.body;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user: IUserDocument | null = await User.findOne({
            forgot_password_token: hashedToken,
            forgot_password_expire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new LCOError("Token Expired or Invalid Token!", 401));
        }
        user.password = password;
        user.forgot_password_expire = undefined;
        user.forgot_password_token = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({
            status: "success",
            message: "Password Changed Successfully",
        });
    }
);

/**
 * -------------------------------- ADMIN -------------------------------------------
 */
export const adminLogin = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        let admin: IUserDocument | null = await User.findAdminByEmail(email);

        if (!admin) {
            return next(new LCOError("Email Doesn't exit", 404));
        }

        const isValidPass = await admin.isValidPassword(password);

        if (!isValidPass) {
            return next(new LCOError("Invalid Password", 400));
        }

        sendJwtToken(admin, res);
    }
);
