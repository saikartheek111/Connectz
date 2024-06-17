import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
// import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/chatProvider.jsx";
import { SocketProvider } from "./Context/socketProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<StyledEngineProvider injectFirst>
				<ChatProvider>
					<SocketProvider>
						<App />
					</SocketProvider>
				</ChatProvider>
			</StyledEngineProvider>
		</BrowserRouter>
	</React.StrictMode>
);
