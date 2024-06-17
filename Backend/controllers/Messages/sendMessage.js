import asyncHandler from "express-async-handler";
import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
import Chat from "../../models/chatModel.js";
const sendMessage = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body;
	if (!content || !chatId) {
		console.log("Invalid data passed into request");
		return res.status(400).send("Invalid data passed into request");
	}
	var newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);

		message = await message.populate("sender", "fullname profilePic");
		message = await message.populate("chat");
		message = await User.populate(message, {
			path: "chat.users",
			select: "fullname profilePic username",
		});

		await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message,
		});
		res.json(message);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default sendMessage;
