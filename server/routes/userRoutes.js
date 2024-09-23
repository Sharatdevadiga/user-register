import express from "express";
import { register, getAllUsers } from "../controller/user.js";

const UserRouter = express.Router();
UserRouter.post("/registerAddress", register);
UserRouter.get("/users", getAllUsers);

export default UserRouter;
