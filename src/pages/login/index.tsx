import {
	AlternateEmail,
	ArrowForward,
	Close,
	ContentCopy,
	DnsOutlined,
	EditOutlined,
	HelpOutline,
	LanOutlined,
	LockOutlined,
	ShieldOutlined,
	StorageOutlined,
	VerifiedUserOutlined,
	Visibility,
	VisibilityOff
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	InputAdornment,
	Tab,
	Tabs,
	TextField,
	Tooltip,
	Typography
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import logo from "../../assets/images/logo-white.png";
import BasicLayout from "../../layouts/basic";
import { login as dpLogin } from "../../store/auth/slice";
import { LoginData, login } from "./api/login";
import { SchemaLogin } from "./schema";
import {
	SERVER_MODES,
	ServerMode,
	getServerBaseUrl,
	getServerMode,
	setServerMode
} from "../../services/environment/serverMode";

const Login = memo(function Login() {
	const [activeMode, setActiveMode] = useState<ServerMode>(getServerMode());
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string>();

	// Help popup & Custom URL dialog state
	const [helpOpen, setHelpOpen] = useState(false);
	const [helpTab, setHelpTab] = useState<ServerMode>(activeMode);
	const [urlDialogOpen, setUrlDialogOpen] = useState(false);
	const [customUrlInput, setCustomUrlInput] = useState("");
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const dispatch = useDispatch();
	const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginData>({
		resolver: yupResolver(SchemaLogin),
		defaultValues: {
			email: SERVER_MODES[activeMode].adminGuide.email,
			password: activeMode === "mock" ? "admin123" : ""
		}
	});

	const modeConfig = SERVER_MODES[activeMode];
	const currentUrl = getServerBaseUrl(activeMode);

	useEffect(() => {
		if (activeMode === "mock") {
			setValue("email", "admin@4life.vn");
			setValue("password", "admin123");
		} else {
			setValue("email", "admin@4life.vn");
		}
	}, [activeMode, setValue]);

	const handleModeSwitch = (newMode: ServerMode) => {
		if (newMode === activeMode) return;
		setActiveMode(newMode);
		setHelpTab(newMode);
		setServerMode(newMode);

		const isSwitchingMockState =
			(activeMode === "mock" && newMode !== "mock") ||
			(activeMode !== "mock" && newMode === "mock");

		if (isSwitchingMockState) {
			toast.info(`Chuyển sang ${SERVER_MODES[newMode].name}. Tải lại trang...`);
			setTimeout(() => {
				window.location.reload();
			}, 500);
		} else {
			toast.success(`Đã chọn: ${SERVER_MODES[newMode].name}`);
		}
	};

	const handleQuickFill = () => {
		setValue("email", modeConfig.adminGuide.email);
		setValue("password", activeMode === "mock" ? "admin123" : "123456");
		toast.success(`Đã điền tài khoản cho chế độ ${modeConfig.shortName}`);
	};

	const handleCopyText = (text: string, fieldName: string) => {
		void navigator.clipboard.writeText(text);
		setCopiedField(fieldName);
		toast.info(`Đã sao chép!`);
		setTimeout(() => setCopiedField(null), 2000);
	};

	const handleSaveCustomUrl = () => {
		const trimmed = customUrlInput.trim();
		if (!trimmed) {
			toast.error("Vui lòng nhập URL hợp lệ.");
			return;
		}
		setServerMode(activeMode, trimmed);
		setUrlDialogOpen(false);
		toast.success(`Đã lưu URL cho ${modeConfig.shortName}`);
	};

	const onSubmit = async (data: LoginData) => {
		if (loading) return;
		setLoading(true);
		setError(undefined);
		try {
			const { token, user } = await login(data);
			dispatch(dpLogin({ token, user }));
		} catch {
			if (activeMode === "real") {
				setError("Không thể xác thực trên Server thực tế. Hãy kiểm tra xem tài khoản có Role = 'Admin' trong DB chưa.");
			} else if (activeMode === "fresh") {
				setError("Đăng nhập thất bại. Hãy chắc chắn bạn đã cập nhật Role = 'Admin' cho tài khoản trong Database mới.");
			} else {
				setError("Thông tin đăng nhập chưa chính xác. Vui lòng thử lại.");
			}
		} finally {
			setLoading(false);
		}
	};

	const activeHelpConfig = SERVER_MODES[helpTab];

	return (
		<BasicLayout image={bgImage}>
			<Box sx={{ width: "100%", maxWidth: 450, mx: "auto", py: { xs: 2, sm: 3 } }}>
				{/* Top Mode Selector Tabs */}
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: 0.6,
						p: 0.6,
						mb: 1.5,
						bgcolor: "rgba(10,12,16,.85)",
						border: "1px solid rgba(255,255,255,.09)",
						borderRadius: "9px",
						backdropFilter: "blur(16px)"
					}}
				>
					{(["real", "fresh", "mock"] as const).map(mode => {
						const isSelected = activeMode === mode;
						const cfg = SERVER_MODES[mode];
						return (
							<Box
								key={mode}
								component="button"
								type="button"
								onClick={() => handleModeSwitch(mode)}
								sx={{
									cursor: "pointer",
									border: "1px solid",
									borderColor: isSelected ? cfg.badgeBorder : "transparent",
									bgcolor: isSelected ? cfg.badgeBg : "transparent",
									color: isSelected ? "#fff" : "#929AA5",
									py: 0.75,
									px: 0.5,
									borderRadius: "6px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 0.6,
									fontSize: 11,
									fontWeight: isSelected ? 700 : 550,
									fontFamily: "inherit",
									transition: "all 140ms ease",
									"&:hover": {
										bgcolor: isSelected ? undefined : "rgba(255,255,255,.04)",
										color: "#fff"
									}
								}}
							>
								<Box
									sx={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										bgcolor: cfg.badgeColor,
										boxShadow: isSelected ? `0 0 8px ${cfg.badgeColor}` : "none",
										flexShrink: 0
									}}
								/>
								<Typography noWrap sx={{ fontSize: 11, fontWeight: "inherit", color: "inherit" }}>
									{cfg.shortName}
								</Typography>
							</Box>
						);
					})}
				</Box>

				{/* Login Card */}
				<Box
					sx={{
						overflow: "hidden",
						border: "1px solid rgba(255,255,255,.13)",
						bgcolor: "rgba(20,22,27,.94)",
						boxShadow: "0 28px 90px rgba(0,0,0,.52)",
						backdropFilter: "blur(24px)",
						borderRadius: "12px"
					}}
				>
					<Box sx={{ height: 3, background: `linear-gradient(90deg, ${modeConfig.badgeColor} 0%, #77A8FF 100%)` }} />

					<Box sx={{ p: { xs: 3, sm: 3.75 } }}>
						{/* Logo and Admin badge */}
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
							<Box
								component="img"
								src={logo}
								alt="4LIFE"
								sx={{ display: "block", width: 92, height: 32, objectFit: "contain", objectPosition: "left center" }}
							/>
							<Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.25, py: 0.6, border: "1px solid rgba(255,255,255,.08)", bgcolor: "#24262C", borderRadius: "5px" }}>
								<ShieldOutlined sx={{ fontSize: 14, color: modeConfig.badgeColor }} />
								<Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", color: "#C7CBD2" }}>
									ADMIN CONSOLE
								</Typography>
							</Box>
						</Box>

						<Typography component="h1" sx={{ fontSize: { xs: 23, sm: 26 }, lineHeight: 1.2, letterSpacing: "-.035em", fontWeight: 700, color: "#F4F5F7" }}>
							Đăng nhập quản trị
						</Typography>

						{/* Sub-header with Active Server URL & Tiny Help Link */}
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1, mt: 1, mb: 2.5 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
								<Typography noWrap sx={{ fontSize: 11.5, color: "#8E95A1", fontFamily: "monospace" }}>
									{currentUrl}
								</Typography>
								{activeMode !== "mock" && (
									<Tooltip title="Đổi URL server">
										<IconButton
											size="small"
											onClick={() => {
												setCustomUrlInput(currentUrl);
												setUrlDialogOpen(true);
											}}
											sx={{ color: "#787F8C", p: 0.25, "&:hover": { color: "#fff" } }}
										>
											<EditOutlined sx={{ fontSize: 13 }} />
										</IconButton>
									</Tooltip>
								)}
							</Box>

							{/* TINY HELP LINK */}
							<Box
								component="button"
								type="button"
								onClick={() => {
									setHelpTab(activeMode);
									setHelpOpen(true);
								}}
								sx={{
									background: "none",
									border: 0,
									cursor: "pointer",
									p: 0,
									display: "inline-flex",
									alignItems: "center",
									gap: 0.4,
									color: "#8FA0FF",
									fontSize: 11,
									fontWeight: 550,
									textDecoration: "underline",
									textUnderlineOffset: 3,
									fontFamily: "inherit",
									"&:hover": { color: "#BAC9FF" }
								}}
							>
								<HelpOutline sx={{ fontSize: 12.5 }} />
								Hướng dẫn tài khoản?
							</Box>
						</Box>

						{error && (
							<Alert
								severity="error"
								sx={{
									mb: 2.5,
									borderRadius: "6px",
									bgcolor: "rgba(248,81,73,.12)",
									color: "#FFB4AB",
									fontSize: 12,
									"& .MuiAlert-icon": { color: "#FF8C82" }
								}}
							>
								{error}
							</Alert>
						)}

						{/* Form */}
						<Box component="form" role="form" onSubmit={handleSubmit(onSubmit)} noValidate>
							<Typography component="label" htmlFor="login-email" sx={labelSx}>
								Email quản trị
							</Typography>
							<TextField
								id="login-email"
								type="email"
								placeholder="admin@4life.vn"
								fullWidth
								autoComplete="email"
								error={!!errors.email}
								helperText={errors.email?.message}
								{...register("email")}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AlternateEmail sx={fieldIconSx} />
										</InputAdornment>
									)
								}}
								sx={fieldSx}
							/>

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 0.75 }}>
								<Typography component="label" htmlFor="login-password" sx={labelSx}>
									Mật khẩu
								</Typography>
								<Typography sx={{ fontSize: 10, color: "#777F8B", letterSpacing: ".04em" }}>
									ROLE: ADMIN
								</Typography>
							</Box>
							<TextField
								id="login-password"
								type={showPassword ? "text" : "password"}
								placeholder={activeMode === "mock" ? "admin123" : "Nhập mật khẩu"}
								fullWidth
								autoComplete="current-password"
								error={!!errors.password}
								helperText={errors.password?.message}
								{...register("password")}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockOutlined sx={fieldIconSx} />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
												onClick={() => setShowPassword(v => !v)}
												edge="end"
												size="small"
												sx={{ color: "#8D949F" }}
											>
												{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
											</IconButton>
										</InputAdornment>
									)
								}}
								sx={fieldSx}
							/>

							{/* Submit Button */}
							<Button
								type="submit"
								fullWidth
								disabled={loading}
								endIcon={!loading && <ArrowForward sx={{ fontSize: 17 }} />}
								sx={{
									mt: 2.75,
									minHeight: 45,
									borderRadius: "6px",
									bgcolor: "#B61F43",
									color: "#FFF",
									textTransform: "none",
									fontSize: 13,
									fontWeight: 700,
									letterSpacing: ".01em",
									boxShadow: "0 5px 16px rgba(182,31,67,.22)",
									"&:hover": { bgcolor: "#CC294F", boxShadow: "0 7px 22px rgba(182,31,67,.3)" },
									"&.Mui-disabled": { bgcolor: "#6F2638", color: "#E4C7CE" }
								}}
							>
								{loading ? (
									<>
										<CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
										Đang xác thực...
									</>
								) : (
									`Đăng nhập (${modeConfig.shortName})`
								)}
							</Button>

							{/* Quick Fill Link */}
							<Box sx={{ textAlign: "center", mt: 1.5 }}>
								<Box
									component="button"
									type="button"
									onClick={handleQuickFill}
									sx={{
										background: "none",
										border: 0,
										cursor: "pointer",
										color: modeConfig.badgeColor,
										fontSize: 11.5,
										fontWeight: 600,
										fontFamily: "inherit",
										"&:hover": { textDecoration: "underline" }
									}}
								>
									⚡ Tự động điền tài khoản mẫu ({modeConfig.adminGuide.email})
								</Box>
							</Box>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 3, pt: 2, borderTop: "1px solid rgba(255,255,255,.08)" }}>
							<VerifiedUserOutlined sx={{ fontSize: 16, color: "#7D8794" }} />
							<Typography sx={{ fontSize: 10.5, color: "#8F96A1", lineHeight: 1.5 }}>
								Phiên đăng nhập được bảo vệ và mã hóa bằng JWT.
							</Typography>
						</Box>
					</Box>
				</Box>

				<Typography sx={{ mt: 2, textAlign: "center", fontSize: 10.5, color: "rgba(225,229,235,.5)", letterSpacing: ".025em" }}>
					© 2026 4LIFE Platform · Dành riêng cho quản trị viên
				</Typography>
			</Box>

			{/* ========================================================
			    HELP POPUP MODAL (Hướng dẫn tài khoản Admin cho 3 Mode)
			    ======================================================== */}
			<Dialog
				open={helpOpen}
				onClose={() => setHelpOpen(false)}
				maxWidth="sm"
				fullWidth
				PaperProps={{
					sx: {
						bgcolor: "#1a1b1f",
						color: "#f3f3f4",
						border: "1px solid rgba(255,255,255,.12)",
						borderRadius: "14px",
						boxShadow: "0 25px 60px rgba(0,0,0,0.7)"
					}
				}}
			>
				<DialogTitle
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						px: 3,
						pt: 2.5,
						pb: 1.5,
						borderBottom: "1px solid rgba(255,255,255,.08)"
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
						<Box
							sx={{
								width: 34,
								height: 34,
								borderRadius: "8px",
								bgcolor: "rgba(143,160,255,.14)",
								color: "#8FA0FF",
								display: "grid",
								placeItems: "center"
							}}
						>
							<HelpOutline sx={{ fontSize: 20 }} />
						</Box>
						<Box>
							<Typography sx={{ fontSize: 15, fontWeight: 700, color: "#f5f5f6" }}>
								Hướng dẫn tài khoản Admin
							</Typography>
							<Typography sx={{ fontSize: 11.5, color: "#8E95A1" }}>
								Chi tiết tài khoản, mật khẩu và cách cấp quyền theo từng môi trường
							</Typography>
						</Box>
					</Box>
					<IconButton
						onClick={() => setHelpOpen(false)}
						size="small"
						sx={{ color: "#8E95A1", "&:hover": { color: "#fff", bgcolor: "#26272c" } }}
					>
						<Close fontSize="small" />
					</IconButton>
				</DialogTitle>

				{/* 3 Tabs in Dialog */}
				<Box sx={{ borderBottom: "1px solid rgba(255,255,255,.08)", px: 3, pt: 1.5, bgcolor: "#141519" }}>
					<Tabs
						value={helpTab}
						onChange={(_, v) => setHelpTab(v as ServerMode)}
						sx={{
							minHeight: 38,
							"& .MuiTab-root": {
								textTransform: "none",
								fontSize: 12,
								fontWeight: 650,
								minHeight: 38,
								py: 0.5,
								px: 1.5,
								color: "#8E95A1",
								"&.Mui-selected": { color: SERVER_MODES[helpTab].badgeColor }
							},
							"& .MuiTabs-indicator": { bgcolor: SERVER_MODES[helpTab].badgeColor }
						}}
					>
						<Tab value="real" label="1. Server thực tế" icon={<LanOutlined sx={{ fontSize: 14 }} />} iconPosition="start" />
						<Tab value="fresh" label="2. Data mới Web Users" icon={<StorageOutlined sx={{ fontSize: 14 }} />} iconPosition="start" />
						<Tab value="mock" label="3. Mock Demo có sẵn" icon={<DnsOutlined sx={{ fontSize: 14 }} />} iconPosition="start" />
					</Tabs>
				</Box>

				<DialogContent sx={{ px: 3, py: 2.5 }}>
					{/* DB & Role Box */}
					<Box sx={{ mb: 2 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
							<Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#8E95A1", letterSpacing: ".05em" }}>
								DATABASE NGUỒN:
							</Typography>
							<Box
								sx={{
									fontSize: 9.5,
									fontWeight: 700,
									px: 0.75,
									py: 0.2,
									borderRadius: "4px",
									bgcolor: activeHelpConfig.badgeBg,
									color: activeHelpConfig.badgeColor,
									border: `1px solid ${activeHelpConfig.badgeBorder}`
								}}
							>
								{activeHelpConfig.badge}
							</Box>
						</Box>
						<Typography sx={{ fontSize: 12, color: "#CBD5E1", lineHeight: 1.5 }}>
							{activeHelpConfig.databaseInfo}
						</Typography>
					</Box>

					{/* Role requirement */}
					<Box
						sx={{
							p: 1.5,
							mb: 2,
							borderRadius: "8px",
							bgcolor: activeHelpConfig.badgeBg,
							border: `1px solid ${activeHelpConfig.badgeBorder}`
						}}
					>
						<Typography sx={{ fontSize: 10.5, fontWeight: 700, color: activeHelpConfig.badgeColor, mb: 0.35 }}>
							YÊU CẦU ROLE:
						</Typography>
						<Typography sx={{ fontSize: 12, color: "#F1F5F9", lineHeight: 1.5 }}>
							{activeHelpConfig.adminGuide.roleRequirement}
						</Typography>
					</Box>

					{/* Account Details Box */}
					<Box
						sx={{
							p: 1.5,
							mb: 2,
							borderRadius: "8px",
							bgcolor: "#141519",
							border: "1px solid rgba(255,255,255,.07)",
							display: "flex",
							flexDirection: "column",
							gap: 1
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Box>
								<Typography sx={{ fontSize: 10.5, color: "#787F8C" }}>Tài khoản gợi ý:</Typography>
								<Typography sx={{ fontSize: 12.5, fontWeight: 650, color: "#F3F4F6", fontFamily: "monospace" }}>
									{activeHelpConfig.adminGuide.email}
								</Typography>
							</Box>
							<Tooltip title="Sao chép email">
								<IconButton
									size="small"
									onClick={() => handleCopyText(activeHelpConfig.adminGuide.email, "email")}
									sx={{ color: copiedField === "email" ? "#34d399" : "#8E95A1" }}
								>
									<ContentCopy sx={{ fontSize: 14 }} />
								</IconButton>
							</Tooltip>
						</Box>

						<Divider sx={{ borderColor: "rgba(255,255,255,.05)" }} />

						<Box>
							<Typography sx={{ fontSize: 10.5, color: "#787F8C" }}>Mật khẩu:</Typography>
							<Typography sx={{ fontSize: 12, color: "#CBD5E1" }}>
								{activeHelpConfig.adminGuide.passwordHint}
							</Typography>
						</Box>
					</Box>

					{/* Step by step */}
					<Typography sx={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", mb: 0.75 }}>
						HƯỚNG DẪN THIẾT LẬP ADMIN:
					</Typography>
					<Box component="ul" sx={{ pl: 2.25, m: 0, mb: 2, color: "#CBD5E1", fontSize: 11.5, lineHeight: 1.65 }}>
						{activeHelpConfig.adminGuide.howToMakeAdmin.map((step, idx) => (
							<Box component="li" key={idx} sx={{ mb: 0.35 }}>
								{step}
							</Box>
						))}
					</Box>

					{/* SQL Snippet (nếu có) */}
					{activeHelpConfig.adminGuide.sqlSnippet && (
						<Box
							sx={{
								p: 1.25,
								mb: 1.5,
								bgcolor: "#0D0E11",
								border: "1px solid rgba(56,189,248,.3)",
								borderRadius: "6px"
							}}
						>
							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
								<Typography sx={{ fontSize: 9.5, color: "#38bdf8", fontWeight: 700, letterSpacing: ".05em" }}>
									LỆNH SQL CẤP ROLE ADMIN:
								</Typography>
								<Tooltip title="Sao chép SQL">
									<IconButton
										size="small"
										onClick={() => handleCopyText(activeHelpConfig.adminGuide.sqlSnippet || "", "sql")}
										sx={{ color: copiedField === "sql" ? "#34d399" : "#8E95A1", p: 0.25 }}
									>
										<ContentCopy sx={{ fontSize: 13 }} />
									</IconButton>
								</Tooltip>
							</Box>
							<Typography
								component="pre"
								sx={{
									m: 0,
									fontSize: 11,
									color: "#E2E8F0",
									fontFamily: "monospace",
									whiteSpace: "pre-wrap",
									wordBreak: "break-all"
								}}
							>
								{activeHelpConfig.adminGuide.sqlSnippet}
							</Typography>
						</Box>
					)}

					<Typography sx={{ fontSize: 11, color: "#8E95A1", fontStyle: "italic", mt: 1 }}>
						💡 {activeHelpConfig.adminGuide.specialNotes}
					</Typography>
				</DialogContent>

				<DialogActions sx={{ px: 3, pb: 2.5, pt: 1, borderTop: "1px solid rgba(255,255,255,.08)" }}>
					<Button
						variant="text"
						onClick={() => {
							setValue("email", activeHelpConfig.adminGuide.email);
							setValue("password", helpTab === "mock" ? "admin123" : "123456");
							setHelpOpen(false);
							toast.success(`Đã điền tài khoản vào form!`);
						}}
						sx={{ color: activeHelpConfig.badgeColor, textTransform: "none", fontSize: 12, fontWeight: 650 }}
					>
						Điền tài khoản này vào form
					</Button>
					<Button
						variant="contained"
						onClick={() => setHelpOpen(false)}
						sx={{ bgcolor: "#2A2D35", color: "#fff", textTransform: "none", fontSize: 12, "&:hover": { bgcolor: "#363A44" } }}
					>
						Đã hiểu & Đóng
					</Button>
				</DialogActions>
			</Dialog>

			{/* Custom URL Dialog */}
			<Dialog
				open={urlDialogOpen}
				onClose={() => setUrlDialogOpen(false)}
				maxWidth="xs"
				fullWidth
				PaperProps={{
					sx: {
						bgcolor: "#1a1b1f",
						color: "#f3f3f4",
						border: "1px solid rgba(255,255,255,.1)",
						borderRadius: "12px"
					}
				}}
			>
				<DialogTitle sx={{ fontSize: 15, fontWeight: 700, pb: 1 }}>
					Cấu hình URL Server ({modeConfig.shortName})
				</DialogTitle>
				<DialogContent sx={{ pt: 1 }}>
					<Typography sx={{ fontSize: 12, color: "#9CA3AF", mb: 2 }}>
						Chỉ định endpoint backend nếu máy chủ chạy ở port hoặc IP khác:
					</Typography>
					<TextField
						fullWidth
						value={customUrlInput}
						onChange={e => setCustomUrlInput(e.target.value)}
						placeholder="http://localhost:5000/api"
						size="small"
						sx={{
							"& .MuiOutlinedInput-root": {
								bgcolor: "#131417",
								color: "#fff",
								fontSize: 12.5,
								fontFamily: "monospace",
								"& fieldset": { borderColor: "rgba(255,255,255,.15)" }
							}
						}}
					/>
				</DialogContent>
				<DialogActions sx={{ p: 2, pt: 0 }}>
					<Button onClick={() => setUrlDialogOpen(false)} sx={{ color: "#9CA3AF", textTransform: "none" }}>
						Hủy
					</Button>
					<Button
						variant="contained"
						onClick={handleSaveCustomUrl}
						sx={{ bgcolor: "#B61F43", "&:hover": { bgcolor: "#CC294F" }, textTransform: "none", fontSize: 12.5 }}
					>
						Lưu cấu hình
					</Button>
				</DialogActions>
			</Dialog>
		</BasicLayout>
	);
});

const labelSx = { display: "block", mb: 0.75, fontSize: 12, fontWeight: 600, color: "#D9DCE2" };
const fieldIconSx = { fontSize: 17, color: "#858D99" };
const fieldSx = {
	"& .MuiFilledInput-root, & .MuiOutlinedInput-root": {
		minHeight: 44,
		borderRadius: "6px",
		bgcolor: "#22242A",
		color: "#F2F3F5",
		border: "1px solid #353840",
		transition: "border-color .16s ease, background-color .16s ease",
		"& fieldset": { border: 0 },
		"&:hover": { bgcolor: "#262930" },
		"&.Mui-focused": { bgcolor: "#262930", borderColor: "#789EFF", boxShadow: "0 0 0 1px #789EFF" },
		"&.Mui-error": { borderColor: "#F17676" },
		"& .MuiInputAdornment-root": { mt: "0 !important", alignSelf: "center" }
	},
	"& .MuiInputBase-input": { py: "11px", fontSize: 13, "&::placeholder": { color: "#777F8B", opacity: 1 } },
	"& .MuiFormHelperText-root": { mx: 0, mt: 0.5, fontSize: 11 },
	"& .MuiInputAdornment-positionStart": { mr: 1.25 }
};

export default Login;
