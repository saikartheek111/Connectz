import React from "react";

const isSameSender = (messages, m, i, userId) => {
	return (
		i < messages.length - 1 &&
		(messages[i + 1].sender._id !== m.sender._id ||
			messages[i + 1].sender._id === undefined) &&
		messages[i].sender._id !== userId
	);
};

export default isSameSender;
