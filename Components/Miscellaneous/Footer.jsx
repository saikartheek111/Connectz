import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<Box className="p-2 flex flex-col justify-center items-center bg-[#303946]">
			<Typography className="text-lg font-['Gugi','sans-serif'] my-2">
				CONNECTZ
			</Typography>
			<Box className="flex gap-4">
				<a
					href={
						"https://mail.google.com/mail/?view=cm&to=connectz.chat.helpdesk@gmail.com&su=CONNECTZ"
					}
					target="_blank"
				>
					<img src="/gmail.png" alt="Gmail" className="h-8 w-8" />
				</a>
				<a
					href="https://www.linkedin.com/in/umarfarooq-shaik-093a7424a/"
					target="_blank"
				>
					<img src="/LinkedIn.png" alt="LinkedIn" className="h-8 w-8" />
				</a>
				<a href="https://github.com/farooq-8627" target="_blank">
					<img
						src="/github.png"
						alt="GitHub"
						className="h-8 w-8 bg-white rounded-full"
					/>
				</a>
			</Box>
			<Box className="flex gap-4 mt-2">
				<Link to={"/"} className="text-sm hover:underline">
					Privacy Policy
				</Link>
				<Link to={"/"} className="text-sm hover:underline">
					User Notice
				</Link>
			</Box>
		</Box>
	);
};

export default Footer;
