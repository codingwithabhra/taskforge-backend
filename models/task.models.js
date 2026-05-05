const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }, // Refers to Project model
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }, // Refers to Team model
    owners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        } // Refers to User model (owners)
    ],
    tags: [String], // Array of tags
    timeToComplete: {
        type: Date,
        required: true
    }, // Date by which the task should be completed
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed', 'Blocked'],
        // Enum for task status
        default: 'To Do',
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "medium"
    }
},
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;