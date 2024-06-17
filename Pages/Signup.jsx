import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/chatProvider";
export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { user, setUser } = ChatState();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		setIsLoading(true);
		if (!data.fullname || !data.username || !data.password || !data.gender) {
			setIsLoading(false);
			toast.warn("Please enter all the details");
			return;
		}

		if (data.password !== data.confirmPassword) {
			setIsLoading(false);
			toast.warn("Passwords didn't match");
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
			const response = await fetch("http://127.0.0.1:3000/user/signup", config);
			const responseData = await response.json();
			console.log(responseData);
			if (response.ok) {
				toast.success("Registration Successful");
				try {
					const serializedData = JSON.stringify(responseData);
					localStorage.setItem(`userInfo`, serializedData);
					setUser(responseData);
				} catch (serializationError) {
					console.error("Serialization error:", serializationError);
				}
				setTimeout(() => {
					setIsLoading(false);
					navigate("/profile");
				}, 1000);
			} else {
				toast.error(responseData.message);
			}
		} catch (error) {
			console.log(error.stack);
			toast.error("Registration Failed");
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
				<p className="text-md my-2">Create an account with us</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						{...register("fullname")}
						className="inp-box"
						placeholder="Full Name"
					/>
					<input
						type="text"
						{...register("username")}
						className="inp-box"
						placeholder="Username"
					/>
					<input
						type="email"
						{...register("email")}
						className="inp-box"
						placeholder="Email"
					/>
					<div className="flex max-[420px]:flex-col lg:flex-row justify-between">
						<input
							type="password"
							{...register("password")}
							className="inp-box mr-1"
							placeholder="Password"
						/>
						<input
							type="password"
							{...register("confirmPassword")}
							className="inp-box"
							placeholder="Confirm Password"
						/>
					</div>
					<select {...register("gender")} defaultValue="" className="my-2 mx-2">
						<option value="" disabled hidden>
							Gender
						</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
					<Button
						type="submit"
						// isLoading={isLoading}
						className="btn-style main-bg hover:text-black"
					>
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
				<span className="mt-4 text-sm"> Already have an account</span>
				<Link to="/login" className="text-sm text-blue-900 hover:underline">
					Log in
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
					<span className="">Welcome to</span>{" "}
					<span className="connectz-head">CONNECTZ</span>{" "}
				</span>
				<p className="italic text-lg mt-4 text-sky-900">
					Step into a world of endless conversations and connections. Whether
					you're here to catch up with friends, meet new people, or simply share
					moments, we're thrilled to have you as part of our community.
				</p>
			</div>
		</div>
	);
}
