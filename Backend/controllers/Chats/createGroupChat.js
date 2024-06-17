import asyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name || !req.body.description) {
		return res.status(400).send({ message: "Please fill all the details" });
	}
	var users = JSON.parse(req.body.users);
	if (users.length < 2) {
		return res
			.status(400)
			.send("More than 2 users are required to form a group");
	}
	users.push(req.user);
	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			description: req.body.description,
			groupAdmin: req.user,
		});
		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");
		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400).send(error);
		throw new Error(error.message);
	}
});

export default createGroupChat;
