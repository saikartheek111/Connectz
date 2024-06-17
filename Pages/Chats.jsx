import React, { useEffect, useState } from "react";
import Navbar from "../Components/Miscellaneous/Navbar";
import { ChatState } from "../Context/chatProvider";
import SideDrawer from "../Components/ChatBox/SideDrawer";
import MyChats from "../Components/ChatBox/MyChats";
import ChatBox from "../Components/ChatBox/ChatBox";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Chats = () => {
	const { user } = ChatState();
	const nav = useNavigate();
	// console.log(user);
	// useEffect(() => {
	// 	if (user === null) {
	// 		nav("/");
	// 	}
	// }, [user, nav]);
	const [chats, setChats] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);
	return (
		<div>
			<div className="w-full">{user && <SideDrawer />}</div>
			<Box className="flex justify-between w-100% p-4">
				{user && <MyChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			</Box>
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
	);
};

export default Chats;
