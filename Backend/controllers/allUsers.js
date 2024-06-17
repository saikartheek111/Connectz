import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
const allUsers = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ username: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
					{ fullname: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {};

	const users = await User.find(keyword).find({
		_id: { $ne: req.user._id },
	});
	res.send(users);
});
export default allUsers;
