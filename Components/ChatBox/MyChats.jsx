import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Stack, Typography, ListItem, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import getSender from "../../Config/chatLogic";
import ChatLoading from "../Miscellaneous/ChatLoading";
import CommChatModal from "./CommChatModal";
import FetchChats from "./FetchChats";
import { useSocket } from "../../Context/socketProvider";

const MyChats = ({ fetchAgain }) => {
	const [loggedUser, setLoggedUser] = useState();
	const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
		ChatState();
	const [loadingChat, setLoadingChat] = useState(false);
	const [showMyChats, setShowMyChats] = useState(true);
	// console.log(chats);

	const fetchChats = async (userId) => {
		try {
			setLoadingChat(true);
			const config = {
				method: "GET",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const response = await fetch("http://127.0.0.1:3000/chat", config);
			if (!response.ok) {
				throw new Error("Failed to fetch chats");
			}
			const data = await response.json();
			// console.log(data);
			setChats(data);
		} catch (error) {
			toast.error("Error! fetching the chats");
		} finally {
			setLoadingChat(false);
		}
	};

	useEffect(() => {
		// setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
		const userInfoString = localStorage.getItem("userInfo");
		const userInfo = userInfoString ? JSON.parse(userInfoString) : {}; // Provide a default value of an empty object
		setLoggedUser(userInfo);
		fetchChats();
	}, [fetchAgain]);

	const handleMyChatsClick = () => {
		setShowMyChats(true);
	};

	const handleCommunitiesClick = () => {
		setShowMyChats(false);
	};

	return (
		<>
			<div
				className={`mychats-box sm:flex ${selectedChat ? "hidden" : "md:flex"}`}
			>
				<div className="mb-4">
					<Button
						// className="mychats-top-btn"
						className={`mychats-top-btn mr-3 ${showMyChats ? "shadow-lg" : ""}`}
						onClick={handleMyChatsClick}
						// variant={showMyChats ? "contained" : "outlined"}
					>
						My Chats
					</Button>
					<Button
						className={`mychats-top-btn ${!showMyChats ? "shadow-lg" : ""}`}
						onClick={handleCommunitiesClick}
						// variant={!showMyChats ? "contained" : "outlined"}
					>
						Communities
					</Button>
				</div>
				{!showMyChats && (
					<CommChatModal>
						<Button className="mychats-btn">
							New Community Chat <AddIcon />
						</Button>
					</CommChatModal>
				)}
				{showMyChats ? (
					<FetchChats
						chatFetch={chats.filter((chat) => !chat.isGroupChat)}
						loggedUser={loggedUser}
						loading={loadingChat}
						fetchAgain={fetchAgain}
						fetchChats={fetchChats}
					/>
				) : (
					<FetchChats
						chatFetch={chats.filter((chat) => chat.isGroupChat)}
						loggedUser={loggedUser}
						loading={loadingChat}
					/>
				)}
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>
		</>
	);
};

export default MyChats;
