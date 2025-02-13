import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    word_content: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["German", "English", "French", "Spanish","Arabic"], 
        required: true 
    },
    definition: { type: String, required: true },
    examples: [{ type: mongoose.Schema.Types.ObjectId, ref: "Example" }] // References to the Example model
    
}, {timestamps:true});

const Word = mongoose.model("Word", wordSchema);
export default Word;
