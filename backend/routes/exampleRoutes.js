import express from "express"

import protectRoute from "./../middleware/protectRoute.js"
import { getExamplesForWord, postExample, updateExample, deleteExample } from "../controllers/example.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getExamplesForWord) //get a certain words examples. id -> wordID
router.post("/create/:id", protectRoute, postExample); // id -> wordID
router.put("/update/:id", protectRoute, updateExample); //id->example
router.delete("/delete/:id", protectRoute, deleteExample);


export default router;