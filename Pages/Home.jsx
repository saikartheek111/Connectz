import { useEffect, useState } from "react";
import HomeAdv from "../Components/Miscellaneous/HomeAdv";
import HomeText from "../Components/Miscellaneous/HomeText";
import Navbar from "../Components/Miscellaneous/Navbar";
import WelcomePage from "../Components/Miscellaneous/WelcomePage";
import { ChatState } from "../Context/chatProvider";
import { ToastContainer } from "react-toastify";
import Footer from "../Components/Miscellaneous/Footer";
export default function Home() {
	const { user } = ChatState();

	return (
		<div className="bg-[#222831] text-white">
			<Navbar />
			<WelcomePage user={user} />
			<HomeText />
			<HomeAdv />
			<Footer />
		</div>
	);
}
