import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ChatState } from "../../Context/chatProvider";
import ChatLoading from "../Miscellaneous/ChatLoading";
import getSender from "../../Config/chatLogic";
import { Avatar } from "@mui/material";

const FetchChats = ({
	chatFetch,
	loggedUser,
	loading,
	children,
}) => {
	const { selectedChat, setSelectedChat } = ChatState();

	const formatTime = (timestamp) => {
		const date = new Date(timestamp);
		const currentDate = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const amOrPm = hours >= 12 ? "PM" : "AM";
		const formattedHours = hours % 12 || 12;

		// Check if the timestamp is from the previous day
		if (
			date.getDate() !== currentDate.getDate() ||
			date.getMonth() !== currentDate.getMonth() ||
			date.getFullYear() !== currentDate.getFullYear()
		) {
			// Return only the date
			return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		} else {
			// Return the time
			return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
		}
	};
	
	return (
		<Box className="mychats-chats">
			{chatFetch.length ? (
				<Stack
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						overflow: "scroll",
					}}
				>
					{chatFetch.map((chat) => (
						<Box
							className="mychats-chat-render"
							onClick={() => setSelectedChat(chat)}
							backgroundColor="#fff"
							border={selectedChat === chat ? "1px solid black" : "none"}
							key={chat._id}
						>
							<Box style={{ position: "absolute", top: 12, right: 6 }}>
								<Typography className="text-xs">
									{chat.latestMessage &&
										formatTime(chat.latestMessage.createdAt)}
								</Typography>
							</Box>
							{!chat.isGroupChat && (
								<Avatar
									src={getSender(loggedUser, chat.users, "profilePic")}
									alt={getSender(loggedUser, chat.users, "fullname")}
									sx={{
										height: 30,
										width: 30,
										borderRadius: "50%",
										marginRight: 1,
										marginTop: 1,
									}}
								/>
							)}
							<Box>
								<Box className="w-full flex justify-between items-start">
									<Typography className="text-green-800">
										{!chat.isGroupChat
											? getSender(loggedUser, chat.users, "username")
											: chat.chatName}
									</Typography>
									{/* <Typography className="text-sm">
										{formatTime(chat.latestMessage.updatedAt)}
									</Typography> */}
								</Box>
								<Typography className="truncate max-w-44 text-sm">
									{chat.latestMessage && chat.latestMessage.content}
								</Typography>
							</Box>
						</Box>
					))}
				</Stack>
			) : loading ? (
				<ChatLoading />
			) : (
				<Typography
					style={{
						display: "flex",
						placeContent: "center",
						alignItems: "center",
					}}
				>
					No chats present.
				</Typography>
			)}
		</Box>
	);
};

export default FetchChats;
