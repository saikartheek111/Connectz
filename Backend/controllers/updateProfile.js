import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const updateProfile = asyncHandler(async (req, res) => {
	try {
		// Extract the avatar URL from the request body
		const { profilePic } = req.body;

		// Assuming you have user authentication and have access to the user's ID
		const userId = req.user._id; // Example: req.user.id is the user's ID
		const user = await User.findByIdAndUpdate(
			userId,
			{ profilePic: profilePic },
			{ new: true }
		);
		if (!user) {
			return res.status(404).json("User not found");
		}
		// Return success response with updated user
		return res.status(201).json(user);
	} catch (error) {
		console.error("Error updating profile picture:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

export default updateProfile;
