const validateRegister = (email, password, firstName, lastName) => {
	let errors = {};
	if (!email || !password || !firstName || !lastName) {
		errors.message = "All fields are required";
	}
	// TODO: CHECK FOR MORE VALIDATIONS

	return {
		valid: Object.keys(errors).length === 0,
		errors,
	};
};

const validateLogin = (email, password) => {
	let errors = {};
	if (!email || !password) {
		errors.message = "Email and password are required";
	}
	// TODO: CHECK FOR MORE VALIDATIONS

	return {
		valid: Object.keys(errors).length === 0,
		errors,
	};
};

module.exports = { validateRegister, validateLogin };
