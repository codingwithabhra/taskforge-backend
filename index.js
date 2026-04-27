const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOption));

const { initialisedatabase } = require("./db/db.connect");
initialisedatabase();

// ---------------------------------------- FOR USER MODEL ----------------------------------------

const userRoutes = require("./routes/userRoutes"); // Import routes
app.use("/auth", userRoutes); // Use routes

// ---------------------------------------- FOR TEAM MODEL ----------------------------------------

const teamRoutes = require("./routes/teamRoutes"); // Import routes
app.use("/teams", teamRoutes); // Use routes

// ---------------------------------------- FOR TASK MODEL ----------------------------------------

const taskRoutes = require("./routes/taskRoutes"); // Import routes
app.use("/tasks", taskRoutes); // Use routes

// ---------------------------------------- FOR TAG MODEL -----------------------------------------

const tagRoutes = require("./routes/tagRoutes"); // Import routes
app.use("/tags", tagRoutes); // Use routes

// ---------------------------------------- FOR PROJECT MODEL ----------------------------------------

const projectRoutes = require("./routes/projectRoutes"); // Import routes
app.use("/projects", projectRoutes); // Use routes

// Test route
app.get("/", (req, res) => {
    res.send("TaskForge Backend Running 🚀");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
