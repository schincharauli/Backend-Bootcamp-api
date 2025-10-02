import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);

userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUser);
userRouter.post("/login", loginUser);

export default userRouter;
