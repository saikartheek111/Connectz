import mongoose from "mongoose";
import bcryptJs from "bcryptjs";
const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default:
				"https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcryptJs.genSalt(10);
	this.password = await bcryptJs.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword, user) {
	return await bcryptJs.compare(enteredPassword, user.password);
};
const User = mongoose.model("User", userSchema);
export default User;
