import { Link } from "react-router-dom";
export default function HomeText() {
	return (
		<div>
			<div className="flex flex-col m-16">
				<p className="text-3xl text-[#3b999e] font-bold">Uniting Communities</p>
				<div className="flex">
					<h2 className="text-6xl font-bold">Communication Made Easy</h2>
					<p className="text-2xl font-thin mt-8">
						Our user-friendly interface lets you dive into discussions
						effortlessly.
					</p>
				</div>
			</div>
			<div className="p-24">
				<h2 className="text-7xl font-bold">Engagement Simplified</h2>
				<ol className="grid divide-y p-12">
					<li className="home-li">
						<div className="home-li-num">1</div>
						<div className="w-3/5">
							<Link to={"/communities"} className="home-li-link">
								Choose Interests
							</Link>
							<p className="home-li-p">
								Select from various topics to tailor your chat rooms to your
								passions.
							</p>
						</div>
					</li>
					<li className="home-li">
						<div className="home-li-num">2</div>
						<div className="w-3/5">
							<Link to={"/profile"} className="home-li-link">
								Customize Profile
							</Link>
							<p className="home-li-p">
								Set up your profile with customizable avatars and bio to express
								yourself.
							</p>
						</div>
					</li>
					<li className="home-li">
						<div className="home-li-num">3</div>
						<div className="w-3/5">
							<Link to={"/chats"} className="home-li-link">
								Start Chatting
							</Link>
							<p className="home-li-p">
								Engage in conversations, share ideas or make new friends
								instantly.
							</p>
						</div>
					</li>
				</ol>
			</div>
		</div>
	);
}
