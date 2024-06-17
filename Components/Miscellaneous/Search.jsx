export default function Search() {
	return (
		<div className="search flex items-center bg-white text-sky-700 flex-row-reverse md:w-1/3  rounded-full">
			<button className="absolute p-2">
				<SearchIcon />
			</button>
			<input
				type="text"
				name="search"
				id=""
				placeholder="Search"
				className="p-2 w-full rounded-full border-2 placeholder:text-[#a1a1aa] font-normal "
			/>
		</div>
	);
}
