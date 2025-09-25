import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import noteRouter from "./routes/note-routes.js";
import dotenv from "dotenv";
import connectToDataBase from "./config/database.js";
import userRouter from "./routes/user-router.js";

dotenv.config();
connectToDataBase();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(4444);

app.use("/api", noteRouter);
app.use("/api", userRouter);
