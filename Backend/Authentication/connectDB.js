import mongoose from "mongoose";

const dbUrl =
	"mongodb+srv://connectzchathelpdesk:2V5balNZojCo4R3r@cluster0.h4vhu1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const dbUrl = "mongodb://127.0.0.1:27017/connectz";
const connectDB = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log(`MongoDB connected`);
	} catch (error) {
		console.log(`Error: ${error}`);
		process.exit();
		// ``;
	}
};
export default connectDB;
