import { Typography, Button, Box, Tooltip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import AccountSettings from "../Miscellaneous/AccountSettings";
export default function Navbar() {
	return (
		<>
			<div className="w-full main-bg flex items-center justify-between  px-4 border-b border-zinc-600">
				<div className="flex w-1/5 items-center">
					<Typography sx={{ display: { xs: "none", md: "flex" } }}>
						<a
							display={"md"}
							href="/"
							className="text-lg text-white font-['Gugi','sans-serif'] mr-8"
						>
							CONNECTZ
						</a>
					</Typography>
				</div>
				<div className="flex w-1/3 items-center justify-evenly">
					<Link to="/chats" className="nav-btn">
						Start Chatting
					</Link>
				</div>
				<div className="flex w-1/5 justify-end items-center">
					<Link to="/communities" className="text-sm text-white mr-2">
						Join the Conversation
					</Link>
					<AccountSettings />
				</div>
			</div>
		</>
	);
}
