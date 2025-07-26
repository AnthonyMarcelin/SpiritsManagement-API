import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
	console.log("[AUTH] Vérification du token...");
	let token = req.cookies?.accessToken;

	if (!token && req.headers.authorization?.startsWith("Bearer")) {
		const [, bearerToken] = req.headers.authorization.split(" ");
		token = bearerToken;
	}

	if (!token) {
		console.log("[AUTH] Aucun token trouvé dans la requête !");
		return res.status(401).json({ message: "lost" });
	}

	try {
		const decoded = jwt.verify(token, jwtSecretKey);
		console.log("[AUTH] Token décodé :", decoded);

		if (!decoded.id || !decoded.email) {
			console.log("[AUTH] Token décodé mais id/email manquant !");
			return res.status(403).json({ message: "invalid token" });
		}

		if (typeof decoded.id !== "number" && typeof decoded.id !== "string") {
			console.log("[AUTH] id utilisateur non trouvé ou invalide !");
			return res.status(403).json({ message: "user ID not found or invalid" });
		}

		req.user = {
			id: Number(decoded.id),
			email: decoded.email,
			isAdmin: decoded.isAdmin,
			isVerified: decoded.isVerified || false // ✅ Utiliser la même typo que votre modèle
		};
		console.log("[AUTH] Utilisateur authentifié :", req.user);

		next();

	} catch (error) {
		console.log("[AUTH] Erreur lors de la vérification du token :", error);
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Expired token, please reconnect" });
		}
		return res.status(403).json({ message: "invalid token" });
	}
};

export default verifyToken;
