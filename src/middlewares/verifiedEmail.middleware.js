// verify if user has confirmed his email

const verifyEmailConfirmed = async (req, res, next) => {
	try {

		if (!req.user.isVerified) {
			return res.status(403).json({
				error: "Email not verified",
				message: 'Email must be verified before this action',
			});
		}

		next();

	} catch (error) {

		return res.status(500).json({
			error: error.message
		});
	}

};

export default verifyEmailConfirmed;
