import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        image: {
            url: String,
            required: true,
            public_id: String,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { versionKey: false }
);

export default mongoose.model("Channel", channelSchema, "Channels");
