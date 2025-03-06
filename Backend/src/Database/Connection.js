import mongoose from "mongoose";
import { DATABASE_NAME } from "../Constant.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DATABASE_NAME}`);
        console.log("CONNECTION SUCCESSFULLY. 💀💀💀💀💀💀");
    } catch (error) {
        console.error("ERROR IN CONNECTING MONGODB 💀💀💀💀 : ", error);
        process.exit(1);
    }
}