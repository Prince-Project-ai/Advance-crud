import { Router } from "express";
import userController from "../Controllers/User.controller.js";
import AuthMiddleware from "../Middlewares/Auth.middleware.js";

const router = Router();

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.signInUser);
router.get("/current-user", AuthMiddleware.verifyJWT, userController.currentUser);
router.post("/logout-user", AuthMiddleware.verifyJWT, userController.logoutUser);


export default router;