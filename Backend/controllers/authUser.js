import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../Authentication/generateToken.js"; // Make sure to import generateToken function

const authUser = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;

	const currUser = await User.findOne({ username });
	console.log(currUser);
	if (currUser && (await currUser.matchPassword(password, currUser))) {
		// Fix password comparison
		return res.json({
			_id: currUser._id,
			fullname: currUser.fullname,
			username: currUser.username,
			email: currUser.email,
			password: currUser.password, // Fix property name
			gender: currUser.gender,
			profilePic: currUser.profilePic,
			token: generateToken(currUser._id), // Assuming generateToken is properly defined
		});
	} else {
		return res.status(401).json({ message: "Invalid username or password" });
	}
});

export default authUser;
