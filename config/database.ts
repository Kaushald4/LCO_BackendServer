import mongoose from "mongoose";
import { LCOError } from "../utils/lcoError";

const connectDB = async () => {
    return mongoose
        .connect(process.env.DB_URI as string, { dbName: "lcdb" })
        .then((ref) => {
            console.log("DB CONNECTED...");
            return ref;
        })
        .catch((err) => new LCOError(err, 500));
};

export { connectDB };
