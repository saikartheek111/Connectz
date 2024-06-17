import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSender } from "../../Config/chatLogic";
import ProfileModel from "../Miscellaneous/ProfileModel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import getSenderFull from "../Miscellaneous/getSenderFull";
import { TailSpin } from "react-loader-spinner";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import UpdateGroupChatModal from "../Miscellaneous/UpdateGroupChatModal";
import { Loop, Send } from "@mui/icons-material";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import { useSocket } from "../../Context/socketProvider";

const ENDPOINT = "http://127.0.0.1:3000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState("");
	const { socketConnected, setSocketConnected } = useSocket();
	const { user, selectedChat, setSelectedChat, notification, setNotification } =
		ChatState();

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", user);
		socket.on("connected", () => setSocketConnected(true));
	}, []);

	useEffect(() => {
		fetchMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on("message received", (newMessageReceived) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== newMessageReceived.chat._id
			) {
				if (!notification.includes(newMessageReceived)) {
					setNotification([newMessageReceived, ...notification]);
					setFetchAgain(!fetchAgain);
				}
			} else {
				setMessages([...messages, newMessageReceived]);
			}
		});
	});

	const sendMessage = async (e) => {
		if (newMessage) {
			try {
				const config = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						content: newMessage,
						chatId: selectedChat._id,
					}),
				};
				setNewMessage("");
				const response = await fetch("http://127.0.0.1:3000/message", config);
				const data = await response.json();
				socket.emit("new message", data);
				socket.emit("stop typing", selectedChat._id);
				setMessages([...messages, data]);
			} catch (error) {
				toast.error("Failed to send the message");
			}
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	const typingHandler = (event) => {
		setNewMessage(event.target.value);
	};

	const fetchMessages = async () => {
		if (!selectedChat) return;
		try {
			const config = {
				method: "GET",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			setLoading(true);
			const response = await fetch(
				`http://127.0.0.1:3000/message/${selectedChat._id}`,
				config
			);
			const data = await response.json();
			setMessages(data);
			setLoading(false);
			socket.emit("join chat", selectedChat._id);
		} catch (error) {
			toast.error("Failed to load messages");
		}
	};
	return (
		<Box className="h-[80vh] w-full">
			{/* {console.log(selectedChat)} */}
			{selectedChat ? (
				<>
					<Typography className="single-chat-text sm:text-base md:text-lg pb-3 px-2 w-full flex items-center justify-between">
						<ArrowBackIcon
							className="single-chat-back"
							onClick={() => setSelectedChat("")}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user, selectedChat.users, "username")}
								<ProfileModel
									user={getSenderFull(user, selectedChat.users)}
									name={<VisibilityIcon />}
								/>
							</>
						) : (
							<>
								{selectedChat.chatName.toUpperCase()}
								{
									<UpdateGroupChatModal
										fetchAgain={fetchAgain}
										setFetchAgain={setFetchAgain}
										fetchMessages={fetchMessages}
									/>
								}
							</>
						)}
					</Typography>
					<div className="flex flex-col justify-end p-3 bg-[#e8e8e8] w-full h-full rounded-lg overflow-auto">
						{loading ? (
							<div className="self-center m-auto">
								<TailSpin height={60} width={60} color="grey" />
							</div>
						) : (
							<div className="flex flex-col overflow-scroll">
								<ScrollableChat messages={messages} />
							</div>
						)}
						<div className="flex mt-3">
							<input
								type="text"
								placeholder="Write a Message"
								onKeyDown={handleKeyDown}
								className="p-2 px-4 rounded-full w-full outline-none"
								onChange={typingHandler}
								value={newMessage}
							/>
							<button
								className="ml-2 bg-white px-2 rounded-full"
								onClick={sendMessage}
							>
								<SendIcon sx={{ fontSize: 25 }} />
							</button>
						</div>
					</div>
				</>
			) : (
				<Box className="flex items-center justify-center h-full">
					<Typography className="text-lg">
						Click on a user or Community to start Chating
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default SingleChat;
