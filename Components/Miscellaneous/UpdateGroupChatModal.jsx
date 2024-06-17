import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Modal, Button, Box, Typography } from "@mui/material";
import { ChatState } from "../../Context/chatProvider";
import { toast } from "react-toastify";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [groupChatName, setGroupChatName] = useState("");
	const [description, setDescription] = useState("");
	const [renameLoading, setRenameLoading] = useState(false);
	const { user, selectedChat, setSelectedChat } = ChatState();

	useEffect(() => {
		if (selectedChat) {
			setGroupChatName(selectedChat.chatName);
			setDescription(selectedChat.description);
		}
	}, [selectedChat]);

	const handleAddUser = async (user1) => {
		if (selectedChat.users.find((u) => u._id === user1._id)) {
			toast.warn("User already Exists!");
			return;
		}
		// if (selectedChat.groupAdmin._id !== user._id) {
		// 	toast.error("Only Admin can add Users");
		// 	return;
		// }
		try {
			setLoading(true);
			const config = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					chatId: selectedChat._id,
					userId: user1._id,
				}),
			};
			const response = await fetch(
				`http://127.0.0.1:3000/chat/groupadd`,
				config
			);
			const data = await response.json();
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (error) {
			toast.error("Adding failed!");
			setLoading(false);
		}
	};
	const handleRemove = async (user1) => {
		if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
			toast.error("Only Admins can remove users");
			return;
		}
		try {
			setLoading(true);
			const config = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					chatId: selectedChat._id,
					userId: user1._id,
				}),
			};
			const response = await fetch(
				`http://127.0.0.1:3000/chat/groupremove`,
				config
			);
			const data = await response.json();
			user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			fetchMessages();
			setLoading(false);
		} catch (error) {
			toast.error("Removing Failed!");
			setLoading(false);
		}
	};
	const handleRename = async () => {
		if (!groupChatName) return;
		try {
			setRenameLoading(true);
			const config = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					chatId: selectedChat._id,
					chatName: groupChatName,
				}),
			};
			const response = await fetch("http://127.0.0.1:3000/chat/rename", config);
			const data = await response.json();
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (error) {
			toast.error("Renaming failed!");
			setRenameLoading(false);
		}
		setGroupChatName("");
	};
	const handleUpdateDescription = async () => {
		if (!description) {
			toast.warn("Please enter a description.");
			return;
		}

		try {
			const config = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					chatId: selectedChat._id,
					description: description,
				}),
			};
			const response = await fetch(
				"http://127.0.0.1:3000/chat/updateDescription",
				config
			);
			const data = await response.json();
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
		} catch (error) {
			toast.error("Failed to update description.");
		}
	};
	const handleSearch = async (query) => {
		setLoading(true);
		setSearch(query);
		if (!query) {
			toast.warn("Add >2 users");
			return;
		}
		try {
			const config = {
				method: "GET",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const response = await fetch(
				`http://127.0.0.1:3000/user?search=${search}`,
				config
			);
			const data = await response.json();
			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast.error("Failed to load the Search Results");
			setLoading(false);
		}
	};
	return (
		<>
			<Button sx={{ color: "black" }} onClick={handleOpen}>
				<VisibilityIcon />
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					className="profile-box"
					sx={{ transform: "translate(-50%, -50%)" }}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ fontSize: 32, marginBottom: 1 }}
						className="profile-box-head"
					>
						{selectedChat.chatName.toUpperCase()}
					</Typography>
					<div className="grp-chat-user-box">
						{selectedChat.users.map((u) => (
							<UserBadgeItem
								key={u._id}
								user={u}
								handleFunction={() => handleRemove(u)}
							/>
						))}
					</div>
					<Box className="update-grp-name-inp">
						<input
							type="text"
							placeholder="Chat Name"
							className="search-drawer"
							sx={{ width: "full" }}
							value={groupChatName}
							onChange={(e) => setGroupChatName(e.target.value)}
						/>
						<Button
							onClick={handleRename}
							className="main-bg"
							sx={{ ":hover": { background: "#000" }, paddingX: 2 }}
						>
							Update
						</Button>
					</Box>
					<Box className="update-grp-desc-inp">
						<textarea
							type="text"
							rows={3}
							placeholder="Description"
							className="search-drawer"
							sx={{ width: "full" }}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button
							onClick={handleUpdateDescription}
							className="main-bg update-grp-update"
							sx={{
								":hover": { background: "#000" },
								paddingX: 2,
								height: "auto",
							}}
						>
							Update
						</Button>
					</Box>
					{/* <form className="grp-modal-form"> */}
					<input
						type="text"
						onChange={(e) => handleSearch(e.target.value)}
						className="inp-box"
						style={{ marginBottom: 6 }}
						placeholder="Add Users to your Community"
					/>
					{/* </form> */}
					{loading ? (
						<div>Loading</div>
					) : (
						<Box sx={{ overflow: "scroll" }}>
							{searchResult.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => handleAddUser(user)}
								/>
							))}
						</Box>
					)}
					<div className="profile-btn-div">
						<Button
							onClick={() => handleRemove(user)}
							sx={{
								color: "white",
								backgroundColor: "red",
								justifyItems: "end",
								":hover": { color: "red" },
							}}
						>
							Leave Group
						</Button>
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default UpdateGroupChatModal;
