import React from "react";
import { Box, Skeleton } from "@mui/material";
const ChatLoading = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 10,
			}}
		>
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
			<Skeleton variant="rounded" height={50} width={"100%"} />
		</div>
	);
};

export default ChatLoading;
