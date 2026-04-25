const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserDatas = require("../models/user.models");

// to create new data
async function createNewUser(newData) {
    try {
        //Checking if email already exists
        const existingUser = await UserDatas.findOne({ email: newData.email });
        if (existingUser) {
            throw new Error("Email already registered");
        };

        //Hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newData.password, saltRounds);

        // Replacing plain password
        newData.password = hashedPassword;

        //Saving new user
        const newUser = new UserDatas(newData);
        const saveUser = await newUser.save();
        return saveUser;
    } catch (error) {
        throw error;
    };
};

router.get("/", (req, res) => {
    res.send("Welcome to USER MODEL");
});


//Sign up route
router.post("/signup", async (req, res) => {
    try {
        const createnewUser = await createNewUser(req.body);
        res.status(201).json({ message: "User created successfully", data: createnewUser });
    } catch (error) {
        if (error.message === "Email already registered") {
            return res.status(400).json({ error: error.message });
        }
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to create user" });
    };
});

// to get all the data
async function getAllUser() {
    try {
        const allUsers = await UserDatas.find();
        return allUsers;
    } catch (error) {
        throw error;
    };
};

router.get("/users", async (req, res) => {
    try {
        const allUsers = await getAllUser();
        if (allUsers.length !== 0) {
            res.json(allUsers);
        } else {
            res.status(404).json({ message: "No user found" });
        };
    } catch (error) {
        console.log("The error is - ", error);
        res.status(500).json({ error: "Failed to fetch users from database" });
    }
});

//Log in route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finding user
        const user = await UserDatas.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        };

        //Comparing password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        };

        //Generating JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed" });
    }
})

module.exports = router; //