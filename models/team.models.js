const mongoose = require('mongoose');

// Team Schema
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, // Team names must be unique
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
},
    {
        timestamps: true,
    });

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;