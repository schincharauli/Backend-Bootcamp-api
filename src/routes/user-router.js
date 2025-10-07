import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { createMulterImageConfigs } from "../helpers/multer-config.js";

const userRouter = express.Router();

const upload = createMulterImageConfigs("public/images");

userRouter.get("/users", getAllUsers);
userRouter.post("/users", upload.single("avatar"), createUser);

userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUser);
userRouter.post("/login", loginUser);

export default userRouter;
