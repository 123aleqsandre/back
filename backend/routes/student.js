import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

export const studentRouter = express.Router();

studentRouter.post("/add", async (req, res) => {
    const {
        first_name, last_name, email, phone,
        class_name, region, username, password
    } = req.body;

    if (!email.includes("@")) return res.status(400).json({error: "Invalid email"});
    if (phone.length < 6) return res.status(400).json({error: "Invalid phone"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO students 
        (first_name, last_name, email, phone, class, region, username, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [first_name, last_name, email, phone, class_name, region, username, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).json({error: err});
            res.json({message: "Student added successfully!"});
        }
    );
});