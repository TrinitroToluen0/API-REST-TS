import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            trim: true,
            enum: ["admin", "moderator", "user"],
            default: "user",
        },
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        image: {
            url: String,
            public_id: String,
        },
    },
    { versionKey: false }
);

export default mongoose.model("User", userSchema, "Users");
