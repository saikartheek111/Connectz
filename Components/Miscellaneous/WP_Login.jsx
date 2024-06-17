import React from "react";
import { useNavigate } from "react-router-dom";
const WP_Login = () => {
	const nav = useNavigate();
	const redirectChats = () => {
		nav("/chats");
	};
	return (
		<div>
			<button
				className="border rounded-lg px-8 py-2 ml-4"
				onClick={redirectChats}
			>
				Start Chating
			</button>
		</div>
	);
};

export default WP_Login;
