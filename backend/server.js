import express from "express";
import connectMongoDB from "./db/connection.js";
import cookieParser from "cookie-parser";

//routes imports.
import authRoutes from "./routes/authRoutes.js"
import wordRoutes from "./routes/wordRoutes.js"
import quoteRoutes from "./routes/quoteRoutes.js"
import exampleRoutes from "./routes/exampleRoutes.js"



//to use the process
import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//app instance
const app = express();
const PORT = process.env.PORT;


//_: middlewares
app.use(express.json({ limit: "10mb" })); // note: For Parsing req.body when it's sent as raw json
app.use(express.urlencoded({ limit: "10mb", extended: true })); // note: For Parsing req.body when it's sent as x-www-form-urlencoded
app.use(cookieParser());

//Routing
app.use('/auth', authRoutes);
app.use('/word', wordRoutes);
app.use('/example', exampleRoutes);
app.use('/quote', quoteRoutes);

app.listen(PORT, () => {

    console.log("server is running ...");

    //connecting to the database.
    connectMongoDB();
})

