import * as yup from "yup";
export const SchemaLogin = yup.object({
	email: yup.string().email("Email must be a valid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			"Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
		)
		.min(6, "Password must be at least 6 characters long")
});
