import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        quote_content: { type: String, required: true }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote; // Export the model for use in other files
