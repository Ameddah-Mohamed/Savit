import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
    word: { type: mongoose.Schema.Types.ObjectId, ref: "Word", required: true },
    sentence: { type: String, required: true },
    translation: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Example = mongoose.model("Example", exampleSchema);
export default Example;
