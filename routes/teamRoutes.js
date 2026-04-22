const express = require("express");
const router = express.Router();

const TeamDatas = require("../models/team.models");
const authMiddleware = require("../middleware/authMiddleware"); // import

// to create new data
async function createNewTeam(newData){
    try {
        const newTeam = new TeamDatas(newData);
        const saveTeam = await newTeam.save();
        return saveTeam; 
    } catch (error) {
        throw error;
    };
};

// to create new team
router.post("/", authMiddleware, async(req, res) => {
    try {
        const createnewTeam = await createNewTeam(req.body);
        res.status(201).json({message: "Team created successfully", data: createnewTeam});
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({error: "Failed to create team"});
    };
});

// to get all the team
async function getAllTeam(){
    try {
        const allTeams = await TeamDatas.find();
        return allTeams;
    } catch (error) {
        throw error;
    };
};

router.get("/", authMiddleware, async (req, res) => {
    try {
        const allTeams = await getAllTeam();
        if(allTeams.length !== 0){
            res.json(allTeams);
        } else {
            res.status(404).json({message: "No team found"});
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch teams from database" });
    }
});

module.exports = router;