import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../Authentication/generateToken.js";
// import generateToken from "../Authentication/generateToken.js";
const registerUser = asyncHandler(async (req, res, next) => {
	const {
		fullname,
		username,
		email,
		password,
		confirmPassword,
		gender,
		profilePic,
	} = req.body;
	if (!fullname || !username || !email || !password || !gender) {
		return res.status(400).json({ message: "Please enter all the details" });
	}
	const userExists = await User.findOne({ username });
	if (userExists) {
		return res.status(400).json({ message: "Username already exists" });
	}
	if (password != confirmPassword) {
		return res.status(400).json({ message: "Password's doesn't match" });
	}
	const user = await User.create({
		fullname,
		username,
		email,
		password,
		gender: gender.toLowerCase(),
		profilePic,
	});
	if (user) {
		try {
			return res.status(201).json({
				_id: user._id,
				fullname: user.fullname,
				username: user.username,
				email: user.email,
				password: user.password,
				gender: user.gender,
				profilePic: user.profilePic,
				token: generateToken(user._id),
			});
		} catch (error) {
			return res.status(400).json("Login failed after registration");
		}
	} else {
		return res
			.status(400)
			.json({ message: "Registration failed! Please try again.." });
	}
});

export default registerUser;
