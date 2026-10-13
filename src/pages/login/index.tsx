import Card from "@mui/material/Card";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import {
	Alert,
	Box,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BasicLayout from "../../layouts/basic";
import GradientButton from "../../components/GradientButton";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaLogin } from "./schema";
import { memo, useState } from "react";
import { LoginData, login } from "./api/login";
import { useDispatch } from "react-redux";
import { login as dpLogin } from "../../store/auth/slice";
import colors from "../../assets/theme/base/colors";

const Login = memo(function Login() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string>();

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(SchemaLogin) });

	const onSubmit = async (data: LoginData) => {
		if (loading) return;
		setLoading(true);
		setError(undefined);
		try {
			const { token, user } = await login(data);
			dispatch(dpLogin({ token: token, user: user }));
		} catch {
			setError("The login details you provided are incorrect. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<BasicLayout image={bgImage}>
			<Card
				sx={{
					borderRadius: 3.5,
					boxShadow: "0 20px 40px rgba(0, 0, 0, 0.24)",
					overflow: "hidden"
				}}
			>
				<Box p={3.5}>
					<Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
						<Box
							component="img"
							src={logo}
							alt="4LIFE"
							sx={{
								height: 32,
								objectFit: "contain"
							}}
						/>
						<Box
							sx={{
								backgroundColor: "rgba(255, 56, 92, 0.1)",
								color: colors.primary.main,
								px: 1.25,
								py: 0.25,
								borderRadius: 1.5,
								fontSize: 12,
								fontWeight: "bold",
								letterSpacing: "0.05em",
								textTransform: "uppercase"
							}}
						>
							Admin Console
						</Box>
					</Box>

					<Typography variant="h6" fontWeight="bold" color="text.primary" mb={0.5}>
						Welcome Back
					</Typography>
					<Typography variant="caption" color="text.secondary" display="block" mb={2.5}>
						Sign in to access the 4LIFE operations and moderation dashboard.
					</Typography>

					{error && (
						<Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, fontSize: 13 }}>
							{error}
						</Alert>
					)}

					<Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
						<Box mb={2}>
							<TextField
								type="email"
								label="Email Address"
								fullWidth
								variant="outlined"
								{...register("email")}
								error={!!errors?.email}
								helperText={errors.email?.message}
								autoComplete="email"
							/>
						</Box>

						<Box mb={2.5}>
							<TextField
								type={showPassword ? "text" : "password"}
								label="Password"
								fullWidth
								variant="outlined"
								{...register("password")}
								error={!!errors?.password}
								helperText={errors.password?.message}
								autoComplete="current-password"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label={showPassword ? "Hide password" : "Show password"}
												onClick={() => setShowPassword(prev => !prev)}
												edge="end"
												size="small"
											>
												{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Box>

						<Box mt={3}>
							<GradientButton
								color={loading ? "secondary" : "primary"}
								type="submit"
								disabled={loading}
								sx={{ minHeight: 44, fontWeight: "bold" }}
							>
								{loading ? (
									<CircularProgress size={18} color="inherit" />
								) : (
									"Sign In"
								)}
							</GradientButton>
						</Box>
					</Box>
				</Box>
			</Card>
		</BasicLayout>
	);
});

export default Login;
