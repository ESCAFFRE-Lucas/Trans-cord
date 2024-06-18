import express from "express"
import UserController from "./user.controller";
import { checkAuth } from "../common/middleware";

const router = express.Router()

router.put("/edit-profile", checkAuth, UserController.editProfile)
router.get("/get-graph", checkAuth, UserController.getGraph)

export default router;