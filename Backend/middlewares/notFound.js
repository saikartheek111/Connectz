const notFound = (req, res, next) => {
	const error = new Error(`Page Not Found - ${req.originalUrl}`);
	res.status(400);
	next(error);
};
export default notFound;