import express from "express";
import cors from "cors";
import { studentRouter } from "./routes/students.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/students", studentRouter);

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
