
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routers/index.js";
import kroutes from "./routers/assignments.js";
import express from "express";
import mongoose from "mongoose";

console.log("Hello from the backend!");

// config express app
dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("MongoDB connection error:", err));

// Enable CORS for all origins (for development). If you want to restrict,
// replace '*' with your frontend origin, e.g. 'http://localhost:5173'.
app.use(cors());
app.use(express.json());
app.use("/api", routes);
// app.use("/api", kroutes);

app.listen(PORT, () => { console.log(`Server running at ${PORT}`); });