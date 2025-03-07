import express from "express"
import cookieParser from "cookie-parser";
import UserRouter from "./Routes/User.router.js";
import errorHandler from "./Middlewares/errorHandler.js";
import cors from "cors";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use(express.json()); //for row data (json,etc)
app.use(express.urlencoded({ extended: true }));

//For Form Data (application/x-www-form-urlencoded)

/* const upload = multer(); // Memory storage, no file saving needed
app.use(upload.none()); // This ensures it handles text fields, not files
 */

app.use(cookieParser());

app.use("/api/v1/user", UserRouter);

app.get("/", (req, res) => {
    res.send("WELCOME BACK TO backend");
})

app.use(errorHandler);

export { app };

/* 
user API

[POST] http://localhost:12345/api/v1/user/sign-up
[POST] http://localhost:12345/api/v1/user/sign-in
[GET] http://localhost:12345/api/v1/user/current-user
[post] http://localhost:12345/api/v1/user/logout-user

*/