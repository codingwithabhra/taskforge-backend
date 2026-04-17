const express = require("express");
const router = express.Router();

const TagsDatas = require("../model/tag.models");
const authMiddleware = require("../middleware/authMiddleware");

// to create new data
async function createNewTag(newData){
    try {
        const newTag = new TagsDatas(newData);
        const saveTag = await newTag.save();
        return saveTag; 
    } catch (error) {
        throw error;
    };
};

router.get("/", (req, res) => {
    res.send("Welcome to TAG MODEL");
});

router.post("/", authMiddleware, async(req, res) => {
    try {
        const createnewTag = await createNewTag(req.body);
        res.status(201).json({message: "Tag created successfully", data: createnewTag});
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({error: "Failed to create tag"});
    };
});

// to get all the data
async function getAllTags(){
    try {
        const allTags = await TagsDatas.find();
        return allTags;
    } catch (error) {
        throw error;
    };
};

router.get("/", authMiddleware, async (req, res) => {
    try {
        const allTags = await getAllTags();
        if(allTags.length !== 0){
            res.json(allTags);
        } else {
            res.status(404).json({message: "No tag found"});
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch tags from database" });
    }
});

module.exports = router;