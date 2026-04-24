const mongoose = require('mongoose');


// Project Schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, // Project names must be unique

    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    }, // Optional field for project details

    deadline: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["inprogress", "completed"],
      default: "inprogress"
    }
},
    {
        timestamps: true,
    });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;