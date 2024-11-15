import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // Ensure the email is required
    unique: true, // Ensure the email is unique
    lowercase: true, // Automatically store emails in lowercase
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not supported", // Custom error message
    },
  },
});

const User = mongoose.model("User", userSchema); // Make sure the model name is capitalized (good convention)

export default User;
