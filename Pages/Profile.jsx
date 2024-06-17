import React, { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { ChatState } from "../Context/chatProvider";
import { useNavigate } from "react-router-dom";
const Profile = () => {
	const { user } = ChatState();
	const nav = useNavigate();
	const defaultAvatar =
		"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1060&t=st=1714870441~exp=1714871041~hmac=0e70ff13314fce1be72e355124653ea13ee310fb17b8e2d61111a4e7e56fd930";
	// const firstAvatar = user && user.profilePic ? user.profilePic : defaultAvatar;
	const [selectedAvatar, setSelectedAvatar] = useState(user.profilePic);

	const handleAvatarSelection = (avatarUrl) => {
		setSelectedAvatar(avatarUrl);
	};

	const updateAvatarInDatabase = async (profilePic) => {
		try {
			console.log("updateAvatar", profilePic);
			const config = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ profilePic }),
			};
			const response = await fetch(
				"http://127.0.0.1:3000/user/updateProfile",
				config
			);
			const responseData = await response.json();
			if (responseData.profilePic) {
				user.profilePic = responseData.profilePic;
				setSelectedAvatar(responseData.profilePic);
			} else {
				console.error("Failed to update avatar in the database");
			}
			nav("/");
		} catch (error) {
			console.error("Error updating avatar in the database:", error);
		}
	};

	const predefinedAvatars = [
		"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1060&t=st=1714870441~exp=1714871041~hmac=0e70ff13314fce1be72e355124653ea13ee310fb17b8e2d61111a4e7e56fd930",
		"https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?t=st=1714870473~exp=1714874073~hmac=18b891cdabfce59bd4e8bcd45fa85d09c8599a44c621ff2ef4c4d01be145c83d&w=1060",
		"https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100164.jpg?t=st=1714870509~exp=1714874109~hmac=a3d839f10731236b8585bb830c5981754d58e37504b98eb72593a5e566abfba4&w=1060",
		"https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100206.jpg?t=st=1714871404~exp=1714875004~hmac=41f278024d023253717fa700db67272adb748a00eb26a86273fb12ae255a8f23&w=1060",
		"https://img.freepik.com/premium-vector/referee-icon-flat-vector-football-soccer-card-judge_98396-43926.jpg?w=1060",
		"https://img.freepik.com/premium-photo/anime-style-image-man-red-kimono-standing-courtyard-generative-ai_902338-35116.jpg?w=1380",
		"https://img.freepik.com/premium-photo/cute-handsome-anime-boy_675932-409.jpg?w=1060",
		"https://img.freepik.com/premium-photo/close-up-person-wearing-jacket-generative-ai_902338-1331.jpg?w=826",
		"https://img.freepik.com/premium-photo/sad-boy-rain_882954-1017.jpg?w=2000",
		"https://img.freepik.com/premium-photo/character-anime-is-character-from-film_979262-519.jpg?w=826",
	];

	return (
		<div
			className="flex justify-center items-center h-screen"
			style={{
				backgroundImage: `url('/bg-img-3.jpg')`, // Set background image URL here
				backgroundSize: "cover", // Cover the entire background
			}}
		>
			<div className="flex flex-col w-1/2 justify-center items-center shadow-xl p-3 bg-[#e7e0e0] rounded-lg">
				<h2 className="text-3xl text-[#222831c7] mb-2">Choose Profile Photo</h2>
				{selectedAvatar && (
					<div>
						<img
							src={selectedAvatar}
							alt="Selected Avatar"
							className="selected-avatar h-80 w-80 rounded-full bg-cover shadow-lg"
						/>
						<h3 className="text-center mt-2">Profile Photo</h3>
					</div>
				)}
				<div className="flex overflow-scroll gap-4 mt-4">
					{predefinedAvatars.map((avatar, index) => (
						<img
							key={index}
							src={avatar}
							alt={`Avatar ${index + 1}`}
							onClick={() => handleAvatarSelection(avatar)}
							className={`${
								selectedAvatar === avatar ? "selected-avatar" : "avatar"
							} h-20 w-20 rounded-full bg-cover`}
						/>
					))}
				</div>
				<button
					className="w-fit p-2 bg-[#222831] text-white rounded-md mt-2"
					onClick={() => updateAvatarInDatabase(selectedAvatar)}
				>
					SAVE
				</button>
			</div>
		</div>
	);
};

export default Profile;
