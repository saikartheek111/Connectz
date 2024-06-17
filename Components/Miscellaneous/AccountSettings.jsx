import React, { useContext, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import {
	Box,
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
} from "@mui/material";
import ProfileModel from "./ProfileModel";
import { Link, useNavigate } from "react-router-dom";
const AccountSettings = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { user, setUser } = ChatState();
	const nav = useNavigate();
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const logoutHandler = () => {
		localStorage.removeItem("userInfo");
		setUser(null);
		nav("/");
	};
	const loginHandler = () => {
		nav("/login");
	};
	return (
		<>
			<Tooltip title="Account settings">
				<IconButton aria-controls="profile-menu" onClick={handleClick}>
					{user ? (
						<img
							src={user.profilePic}
							className="w-8 h-8 pointer text-sm rounded-full"
						></img>
					) : (
						<Avatar className="w-8 h-8 pointer text-sm bg-white text-black"></Avatar>
					)}
				</IconButton>
			</Tooltip>
			<Menu
				id="profile-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{user && <ProfileModel user={user} name={"Profile"} />}
				{user ? (
					<MenuItem onClick={logoutHandler}>Logout</MenuItem>
				) : (
					<MenuItem onClick={loginHandler}>Login</MenuItem>
				)}
			</Menu>
		</>
	);
};

export default AccountSettings;
