import express from "express";
import { signup, login, logout, getMe, postImg } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);
router.post("/img", protectRoute, postImg);

export default router;