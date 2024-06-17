// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import WP_noLogin from "./WP_noLogin";
import WP_Login from "./WP_Login";
// import { ChatState } from "../../Context/chatProvider";
export default function WelcomePage({ user }) {
	return (
		<div
			className="bg-cover bg-center h-[65vh] w-full flex justify-center items-center"
			style={{
				backgroundImage: "url('./chat_bg.webp')",
			}}
		>
			<div className="main-bg h-fit w-fit rounded-3xl flex flex-col items-center py-8 px-8">
				<h2 className="text-2xl text-white font-mono">
					{/* Welcome to{" "} */}
					<span className="text-5xl font-bold font-['Gugi','sans-serif']">
						CONNECTZ
					</span>
				</h2>
				<p className="font-light text-lg mt-2">Join communities.</p>
				<p className="text-center font-light text-lg mb-2">
					Chat,Share and Connect with like-minded individuals
				</p>
				{user ? <WP_Login /> : <WP_noLogin />}
			</div>
		</div>
	);
}
