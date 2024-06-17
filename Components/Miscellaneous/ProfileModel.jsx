import React, { useState } from "react";
import { Modal, Button, Box, Typography, MenuItem, Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ChatState } from "../../Context/chatProvider";
import { useNavigate } from "react-router-dom";

const ProfileModel = ({ user, name, children }) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const nav = useNavigate();
	const profilePage = () => {
		nav("/profile");
	};
	// const { user } = ChatState();
	return (
		<>
			<MenuItem sx={{ color: "black" }} onClick={handleOpen}>
				{name}
			</MenuItem>
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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{user.username}
					</Typography>
					<Box className="profile-img-div">
						<img
							src={user.profilePic}
							alt={user.fullname}
							className="profile-img"
						/>
						{name == "Profile" && (
							<button className="profile-modal-btn" onClick={profilePage}>
								<EditIcon /> Profile
							</button>
						)}
					</Box>

					<Typography sx={{ fontSize: 20, marginTop: 2 }}>
						<b>Name:</b> {user.fullname}
					</Typography>
					<Typography sx={{ fontSize: 20 }}>
						<b>Email:</b> {user.email}
					</Typography>
					<Box className="profile-btn-div">
						<Button
							onClick={handleClose}
							className="main-bg"
							sx={{
								width: 12,
								justifyItems: "end",
								":hover": { background: "#000" },
							}}
						>
							CLOSE
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default ProfileModel;
