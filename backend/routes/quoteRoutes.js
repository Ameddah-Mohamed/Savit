import express from "express"

import protectRoute from "./../middleware/protectRoute.js"


const router = express.Router();

// router.get("/all", protectRoute, getUserQuotes); // current logged in user Quotes.
// router.post("/create", protectRoute, postQuote);
// router.put("/update/:id", protectRoute, updateQuote);
// router.delete("/delete/:id", protectRoute, deleteQuote);


export default router;