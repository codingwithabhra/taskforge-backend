const express = require("express");
const router = express.Router();

const ProjectDatas = require("../model/project.models");
const authMiddleware = require("../middleware/authMiddleware");

// to create new data
async function createNewProject(newData){
    try {
        const newProject = new ProjectDatas(newData);
        const saveProject = await newProject.save();
        return saveProject; 
    } catch (error) {
        throw error;
    };
};

router.get("/", (req, res) => {
    res.send("Welcome to PROJECT MODEL");
});

router.post("/", authMiddleware, async(req, res) => {
    try {
        const createnewProject = await createNewProject(req.body);
        res.status(201).json({message: "Project created successfully", data: createnewProject});
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({error: "Failed to create project"});
    };
});

// to get all the data
async function getAllProjects(){
    try {
        const allProjects = await ProjectDatas.find();
        return allProjects;
    } catch (error) {
        throw error;
    };
};

router.get("/", authMiddleware, async (req, res) => {
    try {
        const allProjects = await getAllProjects();
        if(allProjects.length !== 0){
            res.json(allProjects);
        } else {
            res.status(404).json({message: "No project found"});
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch projects from database" });
    }
});

module.exports = router ;