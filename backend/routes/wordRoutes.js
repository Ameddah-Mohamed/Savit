import express from "express"

import protectRoute from "./../middleware/protectRoute.js"
import { getAllWords, postWord, updateWord, deleteWord } from "../controllers/word.controller.js";


const router = express.Router();

router.get("/all", protectRoute, getAllWords); // current logged in user words.
router.post("/create", protectRoute, postWord);
router.put("/update/:id", protectRoute, updateWord);
router.delete("/delete/:id", protectRoute, deleteWord);

export default router;