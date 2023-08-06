const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    senderUsername: {
      type: String,
      required: true,
    },
    receiverUsername: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      default: "text",
      enum: ["text", "image"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
