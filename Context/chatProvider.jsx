import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	// const [user, setUser] = useState(null); // Initialize user state with null
	const [user, setUser] = useState();
	const [selectedChat, setSelectedChat] = useState();
	const [chats, setChats] = useState([]);
	const [notification, setNotification] = useState([]);
	const nav = useNavigate();

	useEffect(() => {
		const userInfoString = localStorage.getItem("userInfo");
		try {
			const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
			if (userInfo !== null) {
				setUser(userInfo); // Set user state only if userInfo is not null
			} else {
				nav("/"); // Navigate to home if userInfo is null
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<ChatContext.Provider
			value={{
				user,
				setUser,
				selectedChat,
				setSelectedChat,
				chats,
				setChats,
				notification,
				setNotification,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => {
	return useContext(ChatContext);
};

export default ChatProvider;
