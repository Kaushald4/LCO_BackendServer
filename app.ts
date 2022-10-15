import express from "express";
import cors = require("cors");
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";

import globalErrorHandler from "./controllers/errorController";
const app = express();

//middlewares
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(morgan("dev"));

//express middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger docs
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
import AuthRoute from "./routes/auth";
import UserRoute from "./routes/user";
import CourseRoute from "./routes/course";
import TestRoute from "./routes/test";

app.use("/api/v1", AuthRoute);
app.use("/api/v1", UserRoute);
app.use("/api/v1", CourseRoute);
app.use("/api/v1", TestRoute);

// Golbal Error Handler
app.use(globalErrorHandler);

export { app };
