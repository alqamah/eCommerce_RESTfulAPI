//user

import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const router = express.Router();

router.post("/login",userController.signIn);
//router.post("/register",userController.signUp);
router.post('/register', (req, res)=>{
    userController.signUp(req, res)
});

router.use("/getall",userController.getAll);

export default router;