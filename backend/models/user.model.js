import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profileImg: {
        type: String,
        default: ""
    },

    quotes: [{
        type: { type: mongoose.Schema.Types.ObjectId, ref: "Quote"},
    }]
    

},{timestamps:true})


//Creating the model.
const User = mongoose.model("User", userSchema);

//exporting the User model for use in other files.
export default User;