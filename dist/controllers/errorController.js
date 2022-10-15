"use strict";
const lcoError_1 = require("../utils/lcoError");
const handleDBCastError = (err) => {
    const message = `Invalid ${err.path} ${err.value}`;
    return new lcoError_1.LCOError(message, 400);
};
const handleDublicateFieldError = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new lcoError_1.LCOError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new lcoError_1.LCOError(message, 400);
};
const handleJWTError = () => new lcoError_1.LCOError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = () => new lcoError_1.LCOError("Your token has expired! Please log in again.", 401);
const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith("/api/v1")) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
};
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith("/api/v1")) {
        // a.) operation, trusted error send error to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
    });
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || (0, lcoError_1.errorStatusEnumMap)(lcoError_1.ErrorStatus.error);
    if (process.env.NODE_ENV == "development") {
        sendErrorDev(err, req, res);
    }
    else if (process.env.NODE_ENV == "production") {
        let error = { ...err };
        error.message = err.message;
        if (error.name == "CastError")
            error = handleDBCastError(error);
        if (error.code === 11000)
            error = handleDublicateFieldError(error);
        if (error.name === "ValidationError")
            error = handleValidationErrorDB(error);
        if (error.name === "UnauthorizedError")
            error = handleJWTError();
        if (error.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        sendErrorProd(error, req, res);
    }
};
