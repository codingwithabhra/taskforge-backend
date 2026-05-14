const express = require("express");
const router = express.Router();

const ProjectDatas = require("../models/project.models");
const authMiddleware = require("../middleware/authMiddleware");

// to create new data
async function createNewProject(newData) {
    try {
        const newProject = new ProjectDatas(newData);
        const saveProject = await newProject.save();
        return saveProject;
    } catch (error) {
        throw error;
    };
};

router.post("/", authMiddleware, async (req, res) => {
    try {
        const createnewProject = await createNewProject(req.body);
        res.status(201).json({ message: "Project created successfully", data: createnewProject });
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to create project" });
    };
});

// to get all the data
async function getAllProjects() {
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
        if (allProjects.length !== 0) {
            res.json(allProjects);
        } else {
            res.status(404).json({ message: "No project found" });
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch projects from database" });
    }
});

// to delete project by ID
async function deleteProjectById(projectId) {
    try {
        const deletedProject = await ProjectDatas.findByIdAndDelete(projectId);
        return deletedProject;
    } catch (error) {
        throw error;
    }
}

router.delete("/:projectId", authMiddleware, async (req, res) => {
    try {
        const deletedProject = await deleteProjectById(
            req.params.projectId
        );

        if (deletedProject) {
            res.status(200).json({
                message: "Project deleted successfully",
                data: deletedProject,
            });
        } else {
            res.status(404).json({
                message: "Project not found",
            });
        }
    } catch (error) {
        console.log("The error is - ", error);

        res.status(500).json({
            error: "Failed to delete project",
        });
    }
});

module.exports = router;