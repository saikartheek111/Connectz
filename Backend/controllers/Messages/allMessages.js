import asyncHandler from "express-async-handler";
import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
import Chat from "../../models/chatModel.js";
const allMessages = asyncHandler(async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId })
			.populate("sender", "fullname profilePic username")
			.populate("chat");

		res.json(messages);
	} catch (error) {
		res.status(400).send("Error in Fetching messages");
	}
});

export default allMessages;
