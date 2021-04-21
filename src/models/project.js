const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerProject = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectImage: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },

  templateId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TEMPLATE",
    },
  ],
  projectStatus: {
    type: String,
    default: "uncompleted",
  },

} , {timestamps:true});

module.exports = mongoose.model("PROJECT", customerProject);
