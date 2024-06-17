import jwt from "jsonwebtoken";

const generateToken = (id) => {
	return jwt.sign({ id }, "jwtsecretconnectztoken", { expiresIn: "30d" });
};

export default generateToken;
