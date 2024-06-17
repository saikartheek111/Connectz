import { useState } from "react";
import BtnContinue from "../Components/Miscellaneous/BtnContinue";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
import SignUp from "./Signup";
import { ChatState } from "../Context/chatProvider";
export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { user, setUser } = ChatState();
	const nav = useNavigate();
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleShow = () => setShow(!show);
	const onSubmit = async (data) => {
		setIsLoading(true);
		if (!data.username || !data.password) {
			toast.warn("Please enter all the details");
			setIsLoading(false);
			return;
		}
		try {
			const config = {
				method: "POST",
				headers: {
					"Content-type": "application/json", // Change content type to JSON
				},
				body: JSON.stringify(data), // Stringify the body
			};
			const response = await fetch("http://127.0.0.1:3000/user/login", config);
			const responseData = await response.json();
			// console.log(responseData);
			setIsLoading(false);
			if (response.ok) {
				localStorage.setItem("userInfo", JSON.stringify(responseData));
				toast.success("Login Successful");
				setUser(responseData);
				// setIsLoggedIn(true);
				setTimeout(() => {
					navigate("/");
				}, 2000);
			} else {
				toast.error(responseData.message || "Invalid username or password");
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error.stack);
			toast.error("Login Failed");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div
			className="main-body-div flex"
			style={{
				backgroundImage: `url('/enhanced.jpg')`, // Set background image URL here
				backgroundSize: "cover", // Cover the entire background
			}}
		>
			<div className="content-body-div">
				<h2 className="connectz-head">CONNECTZ</h2>
				<p className="text-md my-2">Log in to continue</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						{...register("username")}
						className="inp-box"
						placeholder="Enter your username"
					/>
					<input
						type={show ? "text" : "password"}
						{...register("password")}
						className="inp-box"
						placeholder="Password"
					/>
					{/* <i className="flex justify-end relative" onClick={handleShow}>
						{eye}
					</i> */}

					<br />
					<Button type="submit" className="btn-style main-bg hover:text-black">
						{isLoading ? "Loading" : "Continue"}
					</Button>
				</form>
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
				{/* <p className="text-sm mt-4 mb-2 text-gray-500">or continue with:</p>
				<button className="border-2 btn-style flex justify-center">
					<span>
						<img
							src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.541/google-logo.5867462c.svg"
							alt="Google"
							className="w-6 h-6 mr-2"
						/>
					</span>
					<span>Google</span>
				</button> */}
				<span className="mt-4 text-sm"> Don't you have an account?</span>
				<Link to="/signup" className="text-sm text-blue-900 hover:underline">
					Create an account
				</Link>
				<div className="mt-4 flex flex-col items-center border-t border-neutral-300 w-full">
					<h2 className="text-md text-sky-700 font-['Gugi','sans-serif'] mt-2">
						CONNECTZ
					</h2>
					<div className="">
						<a href="" className="text-xs mr-4">
							Privacy Policy
						</a>
						<a href="" className="text-xs">
							User Notice
						</a>
					</div>
				</div>
			</div>
			<div className="w-2/5 text-center relative bottom-48 left-24 rounded-xl p-4">
				<span className="font-sans text-4xl text-sky-700 font-bold">
					<span className="">Welcome Back to</span>{" "}
					<span className="connectz-head">CONNECTZ</span>{" "}
				</span>
				<p className="italic text-lg mt-4 text-sky-900">
					Welcome back to Connectz! We've missed your presence. Catch up with
					friends, explore new conversations, and make lasting connections.
					Let's continue where we left off!
				</p>
			</div>
		</div>
	);
}
