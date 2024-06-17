export const getSender = (loggedUser, users, property) => {
	if (!loggedUser || !users || !Array.isArray(users) || users.length < 2) {
		return "Unknown Sender";
	}

	const sender = users.find((user) => user && user._id !== loggedUser._id);
	return sender ? sender[property] : "Unknown Sender";
};

export default getSender;
