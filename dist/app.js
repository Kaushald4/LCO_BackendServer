"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const app = (0, express_1.default)();
exports.app = app;
//middlewares
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
//express middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//swagger docs
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const course_1 = __importDefault(require("./routes/course"));
const test_1 = __importDefault(require("./routes/test"));
app.use("/api/v1", auth_1.default);
app.use("/api/v1", user_1.default);
app.use("/api/v1", course_1.default);
app.use("/api/v1", test_1.default);
// Golbal Error Handler
app.use(errorController_1.default);
