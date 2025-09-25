import express from "express";
import { createNotes, getAllNotes } from "../controllers/note-controler.js";

const noteRouter = express.Router();

noteRouter.get("/notes", getAllNotes);

noteRouter.post("/notes", createNotes);

export default noteRouter;
