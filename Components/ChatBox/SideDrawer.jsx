import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NotificationBadge, { Effect } from "react-notification-badge";
import { ToastContainer, toast } from "react-toastify";
import {
	Typography,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	MenuList,
	Button,
	Tooltip,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemButton,
	ListItemText,
	Skeleton,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/chatProvider";
import ProfileModel from "../Miscellaneous/ProfileModel";
import ChatLoading from "../Miscellaneous/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import AccountSettings from "../Miscellaneous/AccountSettings";
import getSender from "../../Config/chatLogic";

const SideDrawer = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const openMenu = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const nav = useNavigate();
	const {
		user,
		setUser,
		setSelectedChat,
		chats,
		setChats,
		notification,
		setNotification,
	} = ChatState();
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleSearch = async () => {
		if (!search) {
			toast.warn("Search is empty");
			return;
		}
		try {
			setLoading(true);
			const config = {
				method: "GET",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			try {
				const response = await fetch(
					`http://127.0.0.1:3000/user?search=${search}`,
					config
				);
				// console.log(response);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				// console.log(data);

				if (!data) {
					throw new Error("Empty response received from the server");
				}
				setSearchResult(data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Search not found");
		}
	};
	const accessChat = async (userId) => {
		try {
			setLoadingChat(true);
			const config = {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ userId }),
			};
			const response = await fetch("http://127.0.0.1:3000/chat", config);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			console.log(user.token);
			if (!chats.find((c) => c._id === data._id)) {
				setChats([data, ...chats]);
			}
			setSelectedChat(data);
			setLoadingChat(false);
			setOpen(false);
			setSearch("");
			setSearchResult([]);
		} catch (error) {
			toast.error("Error! fetching the chat");
		}
	};
	return (
		<>
			<Box className="flex justify-between items-center main-bg w-full px-2">
				<Tooltip title="Search Communities" placement="bottom">
					<Button onClick={toggleDrawer(true)}>
						<SearchIcon className="text-white" />
						<Typography
							textTransform="none"
							className="hidden md:flex px-2 text-white"
						>
							Search Users
						</Typography>
					</Button>
				</Tooltip>
				<Link to="/" className="connectz-head text-white text-xl">
					CONNECTZ
				</Link>
				<div className="flex">
					<Button
						className="text-white"
						style={{ position: "relative" }}
						id="basic-button"
						aria-controls={openMenu ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={openMenu ? "true" : undefined}
						onClick={handleClick}
					>
						<NotificationsIcon />
						<span style={{ position: "absolute", top: 5, right: 8 }}>
							<NotificationBadge
								count={notification.length}
								effect={Effect.SCALE}
							/>
						</span>
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={openMenu}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
							style: {
								minWidth: "150px",
								textAlign: "center",
								marginTop: 0,
								marginBottom: 0,
							},
						}}
					>
						<MenuList
							style={{ marginLeft: 2, padding: 2 }}
							onClose={handleClose}
						>
							{!notification.length && "No new Messages"}
							{notification.map((notif, index) => (
								<MenuItem
									key={`${notif._id}-${index}`}
									onClick={() => {
										setSelectedChat(notif.chat);
										setNotification(notification.filter((e) => e !== notif));
										handleClose;
									}}
									style={{ padding: "8px 16px", lineHeight: "1.5" }}
								>
									{notif.chat.isGroupChat
										? `New Message in ${notif.chat.chatName}`
										: `${getSender(user, notif.chat.users, "username")} :${
												notif.content.length > 20
													? notif.content.substring(0, 20) + "..."
													: notif.content
										  }`}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<AccountSettings />
				</div>
			</Box>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<Box sx={{ width: 270 }} role="presentation">
					<List>
						<ListItem className="">
							<SearchIcon sx={{ marginRight: 4 }} />
							Search Users
						</ListItem>
						<Box className="box-drawer">
							<input
								type="text"
								placeholder="Search Community"
								className="search-drawer"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button onClick={handleSearch}>
								<SearchIcon sx={{ color: "black" }} />
							</Button>
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
						</Box>
						<Box className="user-list-box">
							{loading ? (
								<ChatLoading />
							) : (
								searchResult?.map((user) => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() => accessChat(user._id)}
									/>
								))
							)}
						</Box>
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default SideDrawer;
