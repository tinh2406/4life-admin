import Card from "@mui/material/Card";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import BasicLayout from "../../layouts/basic";
import GradientButton from "../../components/GradientButton";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaLogin } from "./schema";
import { useState } from "react";
import { LoginData, login } from "./api/login";
import { useDispatch } from "react-redux";
import { login as dpLogin } from "../../store/auth/slice";
function Login() {
	const [loading, setLoading] = useState(false);
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
		try {
			const { token, user } = await login(data);
			dispatch(dpLogin({ token: token, user: user }));
		} catch (error) {
			setError("The login details you provided are incorrect. Please try again!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<BasicLayout image={bgImage}>
			<Card
				sx={{
					borderRadius: 4
				}}
			>
				<Box pt={4} pb={3} px={3}>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<img
							src={logo}
							alt="4LIFE"
							style={{
								height: 30,
								marginBottom: 16
							}}
						/>
						<Typography fontWeight={600} fontSize={18} color="#ff385c">
							Admin
						</Typography>
					</Box>
					<Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
						<Box mb={2}>
							<TextField
								type="text"
								label="Email"
								fullWidth
								{...register("email")}
								error={!!errors?.email}
								helperText={errors.email?.message}
							/>
						</Box>
						<Box mb={2}>
							<TextField
								type="password"
								label="Password"
								fullWidth
								{...register("password")}
								error={!!errors?.password}
								helperText={errors.password?.message}
							/>
						</Box>
						<Box>
							<Typography fontSize={12} color={"orangered"}>
								{error}
							</Typography>
						</Box>
						<Box mt={3} mb={1}>
							<GradientButton color={loading?"secondary":"primary"} type="submit">
								{loading ? (
									<Box sx={{ display: "flex" }}>
										<CircularProgress size={16} color="inherit" />
									</Box>
								) : (
									"sign in"
								)}
							</GradientButton>
						</Box>
					</Box>
				</Box>
			</Card>
		</BasicLayout>
	);
}

export default Login;
