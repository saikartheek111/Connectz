import asyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const updateDescription = asyncHandler(async (req, res) => {
	const { chatId, description } = req.body;
	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			description,
		},
		{ new: true }
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!updatedChat) {
		res.status(404);
		throw new Error("Chat not found");
	} else {
		res.json(updatedChat);
	}
});

export default updateDescription;
