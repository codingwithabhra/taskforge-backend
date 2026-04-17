const express = require("express");
const router = express.Router();

const TaskDatas = require("../models/task.models");

// to create new data
async function createNewTask(newData){
    try {
        const newTask = new TaskDatas(newData);
        const saveTask = await newTask.save();
        return saveTask; 
    } catch (error) {
        throw error;
    };
};

router.get("/", (req, res) => {
    res.send("Welcome to TASK MODEL");
});

router.post("/", async(req, res) => {
    try {
        const createnewTask = await createNewTask(req.body);
        res.status(201).json({message: "Task created successfully", data: createnewTask});
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({error: "Failed to create task"});
    };
});

// to get all the data
async function getAllTask(){
    try {
        const allTasks = await TaskDatas.find();
        return allTasks;
    } catch (error) {
        throw error;
    };
};

router.get("/", async (req, res) => {
    try {
        const allTasks = await getAllTask();
        if(allTasks.length !== 0){
            res.json(allTasks);
        } else {
            res.status(404).json({message: "No task found"});
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch tasks from database" });
    }
});

module.exports = router;