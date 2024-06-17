import React from "react";
import { useNavigate } from "react-router-dom";
const WP_noLogin = () => {
	const nav = useNavigate();
	const redirectSignup = () => {
		nav("/signup");
	};
	const redirectLogin = () => {
		nav("/login");
	};
	return (
		<div className="mt-2 w-full flex justify-center">
			<button
				className="text-md px-4 py-2 rounded-lg bg-[#3b999e]"
				onClick={redirectSignup}
			>
				Create your profile
			</button>
			{/* <p className="mt-2">Or </p> */}
			<button
				className="border rounded-lg px-8 py-2 ml-4"
				onClick={redirectLogin}
			>
				Log In
			</button>
		</div>
	);
};

export default WP_noLogin;
