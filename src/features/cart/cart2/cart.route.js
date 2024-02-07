import express from "express";
import {
  addToCartController,
  getItems,
  removeFromCartController,
} from "../controller/cart.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.js";
const router = express.Router();

router.route("/").post(jwtAuth, addToCartController);
router.route("/").get(jwtAuth, getItems);
router.route("/:itemId").delete(jwtAuth, removeFromCartController);

export default router;
