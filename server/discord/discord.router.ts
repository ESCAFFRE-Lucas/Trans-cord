import express from "express"
import DiscordController from "./discord.controller";

const router = express.Router()

router.get("/", DiscordController.login)

export default router;