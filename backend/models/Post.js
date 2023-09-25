const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    file: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = model("post", PostSchema);

module.exports = PostModel
