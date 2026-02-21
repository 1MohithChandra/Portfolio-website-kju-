require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);
console.log(".env loaded");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.log(" MongoDB Error:", err));

// Simple Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Contact API Route
app.post("/api/contact", async (req, res) => {
    try {
        const newMessage = new Contact(req.body);
        await newMessage.save();
        res.json({ message: " Message saved to database!" });
    } catch (err) {
        res.status(500).json({ error: " Failed to save message" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});

