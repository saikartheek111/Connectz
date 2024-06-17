import asyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";
import User from "../../models/userModel.js";

const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;
	const removed = await Chat.findByIdAndUpdate(
		chatId,
		{ $pull: { users: userId } },
		{ new: true }
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!removed) {
		res.status(404);
		throw new Error("Chat not faund");
	} else {
		res.json(removed);
	}
});

export default removeFromGroup;
