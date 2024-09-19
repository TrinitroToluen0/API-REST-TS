import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    { versionKey: false }
);

export default mongoose.model("Message", messageSchema, "Messages");
