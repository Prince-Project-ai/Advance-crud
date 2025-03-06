import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./Database/Connection.js";
const PORT = process.env.PORT || 5555;

connectDB();

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});
