import asyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;
	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName,
		},
		{ new: true }
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!updatedChat) {
		res.status(404);
		throw new Error("Chat not faund");
	} else {
		res.json(updatedChat);
	}
});

export default renameGroup;
