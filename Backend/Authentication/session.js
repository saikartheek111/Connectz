import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoConnect from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
const secret = process.env.SECRET;
import dotenv from "dotenv";
dotenv.config();
// const dbUrl = "mongodb://127.0.0.1:27017/connectz";
const dbUrl = "mongodb+srv://connectzchathelpdesk:2V5balNZojCo4R3r@cluster0.h4vhu1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const store = mongoConnect.create({
	mongoUrl: dbUrl,
	crypto: {
		secret: secret,
	},
	touchAfter: 24 * 3600,
});
store.on("error", (err) => {
	console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
	store,
	secret: secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	},
};
export default { sessionOptions };
