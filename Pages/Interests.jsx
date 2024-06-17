import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const interestsOptions = [
	{ label: "App Development", value: "app" },
	{ label: "Frontend", value: "frontend" },
	{ label: "Backend", value: "backend" },
	{ label: "Full Stack", value: "fullstack" },
	{ label: "AI-ML", value: "ai-ml" },
	{ label: "Data Science", value: "ds" },
	{ label: "Cloud Computing", value: "cloud" },
	{ label: "UI-UX", value: "design" },
];

export default function Interests() {
	// const nav = useNavigate();
	const [selectedInterests, setSelectedInterests] = useState([]);

	const handleInterestChange = (interestValue) => {
		if (selectedInterests.includes(interestValue)) {
			setSelectedInterests(
				selectedInterests.filter((interest) => interest !== interestValue)
			);
		} else {
			setSelectedInterests([...selectedInterests, interestValue]);
		}
	};
	let contained = ["contained", "text-red-200"];
	return (
		<div className="main-body-div">
			<Box className="content-body-div">
				<Typography
					variant="p"
					gutterBottom
					className="text-2xl text-sky-700 font-sans"
				>
					Select your Interests
				</Typography>
				<Box sx={{ display: "flex", flexWrap: "wrap" }}>
					{interestsOptions.map((option) => (
						<Button
							key={option.value}
							variant={
								selectedInterests.includes(option.value)
									? "contained"
									: "outlined"
							}
							color="primary"
							onClick={() => handleInterestChange(option.value)}
							sx={{ m: 1 }}
						>
							{option.label}
						</Button>
					))}
				</Box>
				<button className="main-bg btn-style">Continue</button>
			</Box>
		</div>
	);
}
