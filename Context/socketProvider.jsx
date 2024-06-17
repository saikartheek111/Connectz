// SocketContext.js
import React, { createContext, useContext, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
	const socket = io("http://127.0.0.1:3000");
	const [socketConnected, setSocketConnected] = useState(false);
	// const [isTyping, setIsTyping] = useState(false);
	// const [typing, setTyping] = useState(false);
	var selectedChatCompare;

	return (
		<SocketContext.Provider
			value={{
				socket,
				socketConnected,
				setSocketConnected,
				// isTyping,
				// setIsTyping,
				// typing,
				// setTyping,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
