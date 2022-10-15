import { catchAsyncError } from "./../utils/catchAsyncError";
import jwt, { IJwtPayload } from "jsonwebtoken";
import { NextFunction, RequestX, Response } from "express";
import { LCOError } from "../utils/lcoError";
import { User } from "../models/User";

export const isAuthenticated = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        let token = req.cookies.token || req.headers.authorization?.replace("Bearer", "").trim();

        if (!token) {
            return next(new LCOError("Invalid token! Login again", 401));
        }

        const decoded = <IJwtPayload>jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new LCOError("User no longer exists!", 401));
        }

        const isUserChangedPassword = user.passwordChangedAfter(decoded.iat as number);

        if (isUserChangedPassword) {
            res.clearCookie("token", { expires: new Date(), httpOnly: true });
            return next(new LCOError("Password recently changed login again!", 401));
        }

        req.auth = user;
        return next();
    }
);

export const isAdmin = catchAsyncError(async (req: RequestX, res: Response, next: NextFunction) => {
    if (req.auth && req.auth.role === "admin") {
        return next();
    }
    return next(new LCOError("Access Denied", 401));
});
