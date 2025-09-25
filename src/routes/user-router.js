import express from "express";
import { createUser, getAllUsers } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);

export default userRouter;
