import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			trim: true,
			default:
				"Hi everyone! This community is for members to chat in topic-based groups and get important announcements",
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
