import asyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;
	// console.log(chatId, userId);
	const added = await Chat.findByIdAndUpdate(
		chatId,
		// { $push: { users: userId } },
		{ $addToSet: { users: userId } },
		{ new: true }
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!added) {
		res.status(404);
		throw new Error("Chat not faund");
	} else {
		res.json(added);
	}
});

export default addToGroup;
