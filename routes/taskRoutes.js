const express = require("express");
const router = express.Router();

const TaskDatas = require("../models/task.models");
const authMiddleware = require("../middleware/authMiddleware");

// to create new data
async function createNewTask(newData) {
    try {
        const newTask = new TaskDatas(newData);
        const saveTask = await newTask.save();
        return saveTask;
    } catch (error) {
        throw error;
    };
};

router.post("/", authMiddleware, async (req, res) => {
    try {
        const createnewTask = await createNewTask(req.body);
        res.status(201).json({ message: "Task created successfully", data: createnewTask });
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to create task" });
    };
});

// to get all the data
async function getAllTask() {
    try {
        const allTasks = await TaskDatas.find().populate("owners", "name email");
        return allTasks;
    } catch (error) {
        throw error;
    };
};

router.get("/", authMiddleware, async (req, res) => {
    try {
        const allTasks = await getAllTask();
        if (allTasks.length !== 0) {
            res.json(allTasks);
        } else {
            res.status(404).json({ message: "No task found" });
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch tasks from database" });
    }
});

// to update particular task
async function updateTaskStatus(taskId, dataToUpdate) {
    try {
        const updateData = await TaskDatas.findByIdAndUpdate(taskId, dataToUpdate, { new: true });
        return updateData;
    } catch (error) {
        throw error;
    }
};

router.post("/:taskId", authMiddleware, async (req, res) => {
    try {
        const updateTaskData = await updateTaskStatus(req.params.taskId, req.body);
        if (updateTaskData) {
            res.status(201).json({ message: "Task updated successfully", data: updateTaskData });
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to update task" });
    }
});

// to delete particular task
async function deleteTask(taskId) {
    try {
        const deletedTask = await TaskDatas.findByIdAndDelete(taskId);
        return deletedTask;
    } catch (error) {
        throw error;
    }
};

router.delete("/:taskId", authMiddleware, async (req, res) => {
    try {
        const deletedTaskData = await deleteTask(req.params.taskId);

        if (deletedTaskData) {
            res.status(200).json({
                message: "Task deleted successfully",
                data: deletedTaskData,
            });
        } else {
            res.status(404).json({
                error: "Task not found",
            });
        }
    } catch (error) {
        console.log("The error is - ", error);

        res.status(500).json({
            error: "Failed to delete task",
        });
    }
});

module.exports = router;