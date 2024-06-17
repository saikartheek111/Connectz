import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
export default function Communities() {
	let community = [
		{ label: "App Development", community_id: 1 },
		{ label: "Frontend", community_id: 2 },
		{ label: "Backend", community_id: 3 },
		{ label: "Full Stack", community_id: 4 },
		{ label: "AI-ML", community_id: 5 },
		{ label: "Data Science", community_id: 6 },
		{ label: "Cloud Computing", community_id: 7 },
		{ label: "Cyber Security", community_id: 8 },
		{ label: "Cyber Security", community_id: 9 },
	];
	return (
		<div>
			<Box
				sx={{ display: "flex", flexWrap: "wrap" }}
				className="flex-col w-fit"
			>
				<ul className="border border-sky-700 border-t-white max-h-60 grid grid-cols-2 overflow-scroll">
					{community.map((option) => (
						<Typography
							key={option.community_id}
							color="primary"
							onClick={() => handleInterestChange(option.community_id)}
							sx={{ m: 1 }}
							className="flex border border-transparent  hover:border hover:border-sky-700 p-2 static"
						>
							<li>
								<a href="">{option.label}</a>
							</li>
						</Typography>
					))}
				</ul>
			</Box>
		</div>
	);
}
