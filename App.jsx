import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Interests from "./Pages/Interests";
import Home from "./Pages/Home";
import Navbar from "./Components/Miscellaneous/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./Pages/Chats";
import ChatProvider from "./Context/chatProvider.jsx";
import Profile from "./Pages/Profile.jsx";
import Communities from "./Pages/Communities.jsx";

function App() {
	return (
		<>
			{/* <ChatProvider> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/communities" element={<Communities />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
			{/* </ChatProvider> */}
		</>
	);
}

export default App;
