import { AlternateEmail, ArrowForward, LockOutlined, ShieldOutlined, VerifiedUserOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import logo from "../../assets/images/logo-white.png";
import BasicLayout from "../../layouts/basic";
import { login as dpLogin } from "../../store/auth/slice";
import { LoginData, login } from "./api/login";
import { SchemaLogin } from "./schema";

const Login = memo(function Login() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string>();
	const dispatch = useDispatch();
	const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: yupResolver(SchemaLogin) });

	const onSubmit = async (data: LoginData) => {
		if (loading) return;
		setLoading(true);
		setError(undefined);
		try {
			const { token, user } = await login(data);
			dispatch(dpLogin({ token, user }));
		} catch {
			setError("Thông tin đăng nhập chưa chính xác. Vui lòng thử lại.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<BasicLayout image={bgImage}>
			<Box sx={{ width: "100%", maxWidth: 440, mx: "auto", py: { xs: 2, sm: 4 } }}>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1.5, py: 1, mb: 1.5, border: "1px solid rgba(255,255,255,.09)", bgcolor: "rgba(10,12,16,.76)", backdropFilter: "blur(16px)" }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
						<Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#53D6A0", boxShadow: "0 0 10px rgba(83,214,160,.55)" }} />
						<Typography sx={{ fontSize: 10, letterSpacing: ".13em", color: "#C2C8D1", fontWeight: 700 }}>HỆ THỐNG QUẢN TRỊ</Typography>
					</Box>
					<Typography sx={{ fontSize: 10, letterSpacing: ".08em", color: "#929AA5" }}>SECURE ACCESS</Typography>
				</Box>

				<Box sx={{ overflow: "hidden", border: "1px solid rgba(255,255,255,.13)", bgcolor: "rgba(20,22,27,.94)", boxShadow: "0 28px 90px rgba(0,0,0,.52)", backdropFilter: "blur(24px)" }}>
					<Box sx={{ height: 3, background: "linear-gradient(90deg, #55D6A2 0%, #77A8FF 100%)" }} />
					<Box sx={{ p: { xs: 3, sm: 4 } }}>
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
							<Box component="img" src={logo} alt="4LIFE" sx={{ display: "block", width: 92, height: 32, objectFit: "contain", objectPosition: "left center" }} />
							<Box sx={{ display: "inline-flex", alignItems: "center", gap: .75, px: 1.25, py: .7, border: "1px solid rgba(255,255,255,.08)", bgcolor: "#24262C", color: "#C7CBD2" }}>
								<ShieldOutlined sx={{ fontSize: 14, color: "#8EB2FF" }} />
								<Typography sx={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em" }}>ADMIN CONSOLE</Typography>
							</Box>
						</Box>

						<Typography component="h1" sx={{ fontSize: { xs: 25, sm: 28 }, lineHeight: 1.2, letterSpacing: "-.035em", fontWeight: 700, color: "#F4F5F7" }}>Đăng nhập quản trị</Typography>
						<Typography sx={{ mt: 1, mb: 3.5, fontSize: 13, lineHeight: 1.65, color: "#A6ABB5" }}>Truy cập hệ thống điều hành, phân tích dữ liệu và kiểm duyệt 4LIFE.</Typography>

						{error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: "6px", bgcolor: "rgba(248,81,73,.12)", color: "#FFB4AB", "& .MuiAlert-icon": { color: "#FF8C82" } }}>{error}</Alert>}
						<Box component="form" role="form" onSubmit={handleSubmit(onSubmit)} noValidate>
							<Typography component="label" htmlFor="login-email" sx={labelSx}>Email quản trị</Typography>
							<TextField
								id="login-email" type="email" placeholder="admin@4life.vn" fullWidth autoComplete="email" error={!!errors.email} helperText={errors.email?.message}
								{...register("email")}
								InputProps={{ startAdornment: <InputAdornment position="start"><AlternateEmail sx={fieldIconSx} /></InputAdornment> }}
								sx={fieldSx}
							/>

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2.5, mb: 1 }}>
								<Typography component="label" htmlFor="login-password" sx={labelSx}>Mật khẩu</Typography>
								<Typography sx={{ fontSize: 10, color: "#777F8B", letterSpacing: ".04em" }}>TRUY CẬP CÓ BẢO MẬT</Typography>
							</Box>
							<TextField
								id="login-password" type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" fullWidth autoComplete="current-password" error={!!errors.password} helperText={errors.password?.message}
								{...register("password")}
								InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlined sx={fieldIconSx} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShowPassword(value => !value)} edge="end" size="small" sx={{ color: "#8D949F" }}>{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment> }}
								sx={fieldSx}
							/>

							<Button type="submit" fullWidth disabled={loading} endIcon={!loading && <ArrowForward sx={{ fontSize: 18 }} />} sx={{ mt: 3, minHeight: 46, borderRadius: "6px", bgcolor: "#B61F43", color: "#FFF", textTransform: "none", fontSize: 13, fontWeight: 700, letterSpacing: ".01em", boxShadow: "0 5px 16px rgba(182,31,67,.22)", "&:hover": { bgcolor: "#CC294F", boxShadow: "0 7px 22px rgba(182,31,67,.3)" }, "&.Mui-disabled": { bgcolor: "#6F2638", color: "#E4C7CE" } }}>
								{loading ? <><CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />Đang xác thực...</> : "Đăng nhập vào hệ thống"}
							</Button>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 3.5, pt: 2.5, borderTop: "1px solid rgba(255,255,255,.08)" }}>
							<VerifiedUserOutlined sx={{ fontSize: 16, color: "#7D8794" }} />
							<Typography sx={{ fontSize: 10, color: "#8F96A1", lineHeight: 1.5 }}>Phiên đăng nhập được bảo vệ và mã hóa an toàn.</Typography>
						</Box>
					</Box>
				</Box>
				<Typography sx={{ mt: 2, textAlign: "center", fontSize: 10, color: "rgba(225,229,235,.56)", letterSpacing: ".025em" }}>© 2026 4LIFE Platform · Dành riêng cho quản trị viên</Typography>
			</Box>
		</BasicLayout>
	);
});

const labelSx = { display: "block", mb: 1, fontSize: 12, fontWeight: 600, color: "#D9DCE2" };
const fieldIconSx = { fontSize: 17, color: "#858D99" };
const fieldSx = {
	"& .MuiFilledInput-root, & .MuiOutlinedInput-root": { minHeight: 46, borderRadius: "6px", bgcolor: "#25272D", color: "#F2F3F5", border: "1px solid #353840", transition: "border-color .16s ease, background-color .16s ease", "&:before, &:after": { display: "none" }, "&:hover": { bgcolor: "#292C32" }, "&.Mui-focused": { bgcolor: "#292C32", borderColor: "#789EFF" }, "&.Mui-error": { borderColor: "#F17676" }, "& .MuiInputAdornment-root": { mt: "0 !important", alignSelf: "center" } },
	"& .MuiInputBase-input": { py: "12px", fontSize: 13, "&::placeholder": { color: "#777F8B", opacity: 1 } },
	"& .MuiFormHelperText-root": { mx: 0, mt: .75, fontSize: 11 },
	"& .MuiInputAdornment-positionStart": { mr: 1.25 }
};

export default Login;
