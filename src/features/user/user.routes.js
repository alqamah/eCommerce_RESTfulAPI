import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const router = express.Router();

router.post("/signin",userController.signIn);
router.post("/signup",userController.signUp);
router.get("/getall",userController.getAll);

export default router;