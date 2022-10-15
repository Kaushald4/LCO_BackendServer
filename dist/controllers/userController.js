"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = void 0;
const catchAsyncError_1 = require("./../utils/catchAsyncError");
exports.getAuthenticatedUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    if (req.auth) {
        return res.status(200).json({ status: "success", data: req.auth });
    }
    else {
        return res.status(401).json({ status: "error", message: "Login Again!" });
    }
});
