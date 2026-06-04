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
        const allTeams = await TeamDatas.find().populate("members", "name email");
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

//to update team data with new member
async function updateTeamData(teamId, memberIds){
    try {
        const teamDataToUpdate = await TeamDatas.findByIdAndUpdate(teamId, 
            {
                $addToSet: {
                    members: { $each: memberIds }
                }
            },
            { new: true}).populate("members", "name email");
        return teamDataToUpdate;
    } catch (error) {
        throw error;
    }
};

router.post("/:teamId/add-member", authMiddleware, async(req, res) => {
    try {
        const { memberIds } = req.body;

        const updateTeam = await updateTeamData(req.params.teamId, memberIds);
        if (updateTeam) {
            res.status(201).json({ message: "Member added successfully", data: updateTeam });
        } else {
            res.status(404).json({ error: "Team not found" });
        }
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to add member" });
    }
});

//to delete team member
async function deleteTeamMember(teamId, memberId) {
    try {
        const deleteMember = await TeamDatas.findByIdAndUpdate(teamId, 
            {
                $pull: {
                    members: memberIds
                }
            },
        ).populate("members", "name email");
        return deleteMember;
    } catch (error) {
        throw error;
    }
};

router.delete("/:teamId/remove-member", authMiddleware, async (req, res) => {
    try {
        const { memberIds } = req.body;

        const deleteTeamMemberData = await deleteTeamMember(req.params.teamId, memberIds);

        if(deleteTeamMemberData){
            res.status(200).json({ message: "Member removed successfully", data: deleteTeamMemberData});
        } else {
            res.status(404).json({error: "Team not found"});
        }
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({error: "Failed to remove team member"});
    }
})

module.exports = router;