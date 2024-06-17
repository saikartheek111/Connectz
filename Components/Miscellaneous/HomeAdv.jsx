export default function HomeAdv() {
	return (
		<div>
			<div className="flex">
				<div
					className="bg-cover bg-center h-[100vh] w-1/2 "
					style={{
						backgroundImage: "url('./chat_img.png')",
					}}
				></div>
				<div className="w-1/2 p-20 flex flex-col justify-center">
					<h2 className="text-4xl font-bold m-6">Key Advantages</h2>
					<div className="h-2/3 flex flex-col justify-around">
						<div className="bg-[#eeeaea25] p-6 rounded-3xl">
							<h2 className="text-lg font-bold">Real-time Chat</h2>
							<p className="text-md">
								Instantly message anyone or join group chats for a collaborative
								experience.
							</p>
						</div>
						<div className="bg-[#eeeaea25] p-6 rounded-3xl">
							<h2 className="text-lg font-bold">Rich Profiles</h2>
							<p className="text-md">
								Showcase your interests and personality with rich, customizable
								profiles.
							</p>
						</div>
						<div className="bg-[#eeeaea25] p-6 rounded-3xl">
							<h2 className="text-lg font-bold">Smart notifications</h2>
							<p className="text-md">
								Stay informed without being overwhelmed thanks to intellegent
								alert settings.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
