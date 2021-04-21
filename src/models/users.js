const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlenght: 8,
    },
    phone: {
      type: String,
      required: true,
    },
    project: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PROJECT",
      },
    ],
    role: {
      type: String,
      default: "none",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("USER", user);
