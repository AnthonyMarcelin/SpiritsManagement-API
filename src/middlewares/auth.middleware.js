import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {

	let token = req.cookies?.accessToken;

	if (!token && req.headers.authorization?.startsWith("Bearer")) {
		const [, bearerToken] = req.headers.authorization.split(" ");
		token = bearerToken;
	}

	if (!token) {
		return res.status(401).json({ message: "lost" });
	}

	try {
		const decoded = jwt.verify(token, jwtSecretKey);

		if (!decoded.id || !decoded.email) {
			return res.status(403).json({ message: "invalid token" });
		}

		if (typeof decoded.id !== "number" && typeof decoded.id !== "string") {
			return res.status(403).json({ message: "user ID not found or invalid" });
		}

		req.user = {
			id: Number(decoded.id),
			email: decoded.email,
			isAdmin: decoded.isAdmin,
			isVerified: decoded.isVerified || false // ✅ Utiliser la même typo que votre modèle
		};

		next();

	} catch (error) {

		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Expired token, please reconnect" });
		}
		return res.status(403).json({ message: "invalid token" });
	}
};

export default verifyToken;
