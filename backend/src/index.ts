import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/user.model.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";

const app = express();
app.use(express.json());
dotenv.config();

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(401).json({ message: "Username already exists" });
    } else {
      const newUser = await User.create({
        username: username,
        password: password,
      });

      res
        .status(200)
        .json({ name: newUser.username, password: newUser.password });
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error in signup route ${error.message}` });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign(password, process.env.JWT_SECRET!);
      res.status(201).json({ token });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
