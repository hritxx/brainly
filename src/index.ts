import express from "express";
import { Jwt } from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const app = express();

app.post("/api/v1/signup", (req, res) => {});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

console.log("Server is running on port 5000");

app.listen(8080);
