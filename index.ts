import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./config/database";

connectDB();

const server = app.listen(process.env.PORT, () =>
    console.log(`Server is running at port ${process.env.PORT}`)
);

process.on("uncaughtException", (err: any) => {
    console.log("UNCAUGHT EXCEPTION! 🔥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

process.on("unhandledRejection", (err: any) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("💥 Process terminated!");
    });
});
