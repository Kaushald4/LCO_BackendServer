import { Response, RequestX, NextFunction } from "express";
import { catchAsyncError } from "./../utils/catchAsyncError";

export const getAuthenticatedUser = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        if (req.auth) {
            return res.status(200).json({ status: "success", data: req.auth });
        } else {
            return res.status(401).json({ status: "error", message: "Login Again!" });
        }
    }
);
