import express from 'express';
import { LikeController } from './like.controller.js';
// 2. Initialize Express router.
const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post("/", (req, res, next)=>{
    likeController.likeItem(req, res, next);
})

export default likeRouter;