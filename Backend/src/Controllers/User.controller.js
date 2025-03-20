import { User } from "../Models/User.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Middlewares/asyncHandler.js";

class userController {

    static cookieOptions() {
        return {
            httpOnly: true,
            secure: true,
            // sameSite: "None",
            // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }
    }

    static generateAccessTokenAndRefreshToken = async (userId, next) => {
        try {
            const user = await User.findById(userId);
            const newAccessToken = user.generateAccessToken();
            const newRefreshToken = user.generateRefreshToken();
            user.refreshToken = newRefreshToken;
            await user.save({ validateBeforeSave: false });
            return { newAccessToken, newRefreshToken };
        } catch (error) {
            next(error);
        }
    }

    static createUser = asyncHandler(async (req, res, next) => {
        const { userName, email, password, crmPassword } = req.body;

        if (!userName || !email || !password || !crmPassword) {
            return next(new ApiError(400, "Please fill in all the fields."));
        }

        if (password !== crmPassword) {
            return next(new ApiError(401, "Passwords do not match."));
        }

        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return next(new ApiError(409, "User with this username or email already exists."));
        }

        const newUser = await User.create({
            userName,
            email,
            password,
        });

        if (!newUser) {
            return next(new ApiError(500, "User registration failed."));
        }

        return res.status(201).json(new ApiResponse(201, "User registered successfully."));
    });


    static signInUser = asyncHandler(async (req, res, next) => {
        const { userNameEmail, password } = req.body;

        if (!(userNameEmail && password)) return next(new ApiError(400, "Please Fill all the Fields."));

        const isAuthenticated = await User.findOne({
            $or: [{ userName: userNameEmail }, { email: userNameEmail }],
        });

        if (!isAuthenticated) return next(new ApiError(401, "Invalid credentials."));

        const isValidPassword = await isAuthenticated.isPasswordCorrect(password);

        if (!isValidPassword) return next(new ApiError(401, "Invalid credentials."));

        const { newAccessToken, newRefreshToken } = await this.generateAccessTokenAndRefreshToken(isAuthenticated._id, next);

        const loggedUser = await User.findById(isAuthenticated._id).select("-password -refreshToken");


        res
            .status(200)
            .cookie("accessToken", newAccessToken, this.cookieOptions())
            .cookie("refreshToken", newRefreshToken, this.cookieOptions())
            .json(new ApiResponse(200, "User sign in successfully.", { loggedUser, newAccessToken, newRefreshToken }));
    });

    static currentUser = asyncHandler(async (req, res, next) => {
        const userData = await User.findById(req?.user?._id).select("-refreshToken -password");
        if (!userData) return next(new ApiError(404, "User not found."));
        res.status(200).json(new ApiResponse(200, "User found.", userData));
    });

    static logoutUser = asyncHandler(async (req, res, next) => {
        const userId = req?.user?._id;
        await User.findByIdAndDelete(userId);
        res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json(new ApiResponse(200, "User logged out successfully."));
    });
    static updateProfile = asyncHandler(async (req, res, next) => {
    });
}

export default userController;













