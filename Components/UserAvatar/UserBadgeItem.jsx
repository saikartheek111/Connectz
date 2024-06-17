import { Box, Avatar, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UserBadgeItem = ({ user, handleFunction }) => {
	// console.log(user);
	return (
		<Box className="grp-chat-user" onClick={handleFunction}>
			<Avatar
				src={user.profilePic}
				alt={user.fullname}
				sx={{ height: 30, width: 30, borderRadius: "50%", marginRight: 1 }}
			/>
			<Typography style={{ fontSize: 15 }}>{user.username}</Typography>
			<DeleteOutlineIcon sx={{ fontSize: 25, paddingLeft: 1 }} />
		</Box>
	);
};

export default UserBadgeItem;
