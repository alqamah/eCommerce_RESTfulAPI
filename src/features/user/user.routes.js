
//user

import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const router = express.Router();

//router.post("/login",userController.signIn);
router.post('/signin', (req, res)=>{ //signin is working, login is not
    userController.signIn(req, res)
});
//router.post("/register",userController.signUp);
router.post('/signup', (req, res)=>{
    userController.signUp(req, res)
});

router.use("/getall",userController.getAll);

export default router;
