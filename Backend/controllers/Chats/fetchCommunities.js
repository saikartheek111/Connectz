import asyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";
import User from "../../models/userModel.js";

const fetchCommunities = asyncHandler(async (req, res) => {
	try {
		// Remove the condition filtering chats based on user ID
		Chat.find({ isGroupChat: true })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await User.populate(results, {
					path: "latestMessage.sender",
					select: "fullname profilePic username",
				});

				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

export default fetchCommunities;
