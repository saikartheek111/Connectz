import React from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box, Avatar, Typography } from "@mui/material";
const UserListItem = ({ handleFunction, user }) => {
	return (
		<>
			<Box className="user-list-item" onClick={handleFunction}>
				<Avatar
					src={user.profilePic}
					alt={user.fullname}
					sx={{ height: 30, width: 30, borderRadius: "50%", marginRight: 1 }}
				/>
				<Box>
					<Typography className="user-list-text">{user.username}</Typography>
					<Typography className="user-list-text">
						{/* <b>Email: </b> */}
						{user.fullname}
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default UserListItem;
