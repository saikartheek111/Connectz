import express from "express";
import protect from "../middlewares/authMiddleware.js";
import sendMessage from "../controllers/Messages/sendMessage.js";
import allMessages from "../controllers/Messages/allMessages.js";
const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

export default router;
