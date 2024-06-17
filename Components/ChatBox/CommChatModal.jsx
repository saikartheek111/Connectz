import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import { Modal, Button, Box, Typography, MenuItem } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
const CommChatModal = ({ children }) => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm();
	const [open, setOpen] = useState(false);
	const [groupChatName, setGroupChatName] = useState("");
	const [description, setDescription] = useState(
		"Hi everyone! This community is for members to chat in topic-based groups and get important announcements."
	);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user, chats, setChats } = ChatState();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
		}
	};
	const handleGroup = (selectedUser) => {
		if (selectedUsers.includes(selectedUser)) {
			toast.warn("User already exists");
			return;
		}
		setSelectedUsers([...selectedUsers, selectedUser]);
	};
	const handleSubmit = async () => {
		if (!groupChatName || !selectedUsers || !description) {
			toast.warn("Please fill all the details");
			return;
		}

		try {
			const config = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
					name: groupChatName,
					description: description,
				}),
			};
			const response = await fetch("http://127.0.0.1:3000/chat/group", config);
			const data = await response.json();
			setChats([data, ...chats]);
			setOpen(false);
			toast.success("New Community Created");
		} catch (error) {
			toast.error("Failed to create your Community");
		}
	};
	const handleDelete = (delUser) => {
		setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
	};

	return (
		<div>
			<Button className="mychats-btn" onClick={handleOpen}>
				New Community Chat <AddIcon />
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ overflow: "scroll" }}
			>
				<Box
					className="profile-box"
					sx={{ transform: "translate(-50%, -50%)" }}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ fontSize: 28 }}
					>
						Create Community Chat
					</Typography>
					<Box className="grp-modal-body">
						<form onSubmit={handleSubmit} className="grp-modal-form">
							<input
								type="text"
								onChange={(e) => setGroupChatName(e.target.value)}
								className="inp-box"
								placeholder="Community name"
							/>
						</form>
						<form onSubmit={handleSubmit} className="grp-modal-form">
							<textarea
								rows={3}
								onChange={(e) => setDescription(e.target.value)}
								className="inp-box"
								value={description}
								placeholder="Description"
							/>
						</form>
						<form onSubmit={handleSubmit} className="grp-modal-form">
							<input
								type="text"
								onChange={(e) => handleSearch(e.target.value)}
								className="inp-box"
								style={{ marginBottom: 6 }}
								placeholder="Add Users to your Community"
							/>
						</form>
						<div className="grp-chat-user-box">
							{selectedUsers.map((u) => (
								<UserBadgeItem
									key={u._id}
									user={u}
									handleFunction={() => handleDelete(u)}
								/>
							))}
						</div>
						{loading ? (
							<div>Loading</div>
						) : (
							searchResult?.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => handleGroup(user)}
								/>
							))
						)}
					</Box>
					<div className="profile-btn-div">
						<Button
							onClick={handleSubmit}
							className="main-bg"
							sx={{
								// width: 12,
								justifyItems: "start",
								":hover": { background: "#000" },
							}}
						>
							Create
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default CommChatModal;
