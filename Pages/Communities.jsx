import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/chatProvider";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Miscellaneous/Footer";
import Navbar from "../Components/Miscellaneous/Navbar";
import { border } from "@chakra-ui/react";
const Communities = () => {
	const [communities, setCommunities] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user, selectedChat, setSelectedChat } = ChatState();
	const nav = useNavigate();
	const fetchCommunities = async () => {
		setLoading(true);
		const config = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		};
		try {
			const response = await fetch(
				"http://127.0.0.1:3000/chat/communities",
				config
			);
			if (!response.ok) {
				throw new Error("Failed to fetch communities");
			}
			const responseData = await response.json();
			setCommunities(responseData);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching communities:", error.message);
		} finally {
			setLoading(false);
		}
	};
	const handleJoinCommunity = async (community) => {
		if (community.users.find((u) => u._id === user._id)) {
			toast.warn("User already Exists!");
			return;
		}
		try {
			// setLoading(true);
			const config = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					chatId: community._id,
					userId: user._id,
				}),
			};
			const response = await fetch(
				`http://127.0.0.1:3000/chat/groupadd`,
				config
			);
			console.log("Token:", user.token);
			const data = await response.json();
			nav("/chats");
			setSelectedChat(data);
		} catch (error) {
			toast.error("Adding failed!");
		}
	};
	useEffect(() => {
		fetchCommunities();
	}, [user]);

	return (
		<div className="flex justify-center items-center h-full main-bg">
			{loading ? (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
					<TailSpin height={60} width={60} color="grey" />
				</div>
			) : (
				<Box className="mx-auto">
					<Navbar className="border-b-2"/>
					<Box className="mx-auto p-6 rounded-lg shadow-lg shadow-sky-500 w-1/2 my-6">
						<Typography className="text-3xl font-semibold text-center mb-4">
							Welcome to{" "}
							<span className="font-['Gugi','sans-serif']">CONNECTZ</span>
						</Typography>
						<Box className="">
							<Typography className="text-lg text-justify">
								As a new member, you now have access to a vibrant array of
								communities where you can engage, connect, and share with
								like-minded individuals from around the world. Explore our
								diverse range of communities covering topics from hobbies,
								interests, professional fields, to support groups and more. Join
								discussions, participate in events, and build meaningful
								connections within your chosen communities.
							</Typography>
							<Typography className="text-lg mt-4 text-justify">
								Get started by browsing through the list of available
								communities below and join the ones that resonate with you.
								We're excited to have you join our community network and look
								forward to seeing you thrive within our vibrant community
								ecosystem!
							</Typography>
							<Typography className="text-2xl font-bold text-center mt-2">
								Join now and start your Journey
							</Typography>
						</Box>
					</Box>
					<Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6 mx-auto w-full">
						{communities
							? communities.map((community) => (
									<Card key={community._id} className="comm-card-body">
										<CardContent>
											<Typography className="text-2xl text-sky-700">
												{community.chatName}
											</Typography>
											{/* Render other relevant community information here */}
											<Typography className="text-sm">
												<span className="font-bold">Admin:</span>{" "}
												{community.groupAdmin.fullname}
											</Typography>
											<Typography className="text-base mt-2">
												<span className="font-bold">Description:</span>{" "}
												{community.description}
											</Typography>
											<Button
												onClick={() => handleJoinCommunity(community)}
												className="bg-sky-700 text-white mt-2"
											>
												Join Community
											</Button>
										</CardContent>
									</Card>
							  ))
							: "There are no Communities in the Database. Please create one to start your journey with us."}
					</Box>
					<Footer />
				</Box>
			)}
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
};

export default Communities;
