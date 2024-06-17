import React from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box } from "@mui/material";
import SingleChat from "./SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const { selectedChat } = ChatState();
	return (
		<div
			className={`chatbox-box ${
				selectedChat ? "sm:flex md:flex" : "hidden md:flex"
			} md:w-full sm:w-full`}
		>
			<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</div>
	);
};

export default ChatBox;
