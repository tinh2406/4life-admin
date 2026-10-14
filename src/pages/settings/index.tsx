import {
	Add,
	CheckCircleOutline,
	ContentCopy,
	DeleteSweep,
	Domain,
	History,
	Hub,
	IntegrationInstructions,
	NotificationsActive,
	Refresh,
	Save,
	Security,
	WarningAmber
} from "@mui/icons-material";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	FormControlLabel,
	IconButton,
	MenuItem,
	Snackbar,
	Switch,
	TextField,
	Tooltip,
	Typography
} from "@mui/material";
import { useRef, useState } from "react";

type SettingsSectionId = "organization" | "security" | "notifications" | "integrations" | "danger";
type SystemSettings = {
	platformName: string;
	adminEmail: string;
	timezone: string;
	language: string;
	currency: string;
	mfa: boolean;
	bruteForceLock: boolean;
	sessionTimeout: number;
	passwordLength: number;
	emergencyEmail: boolean;
	mobilePush: boolean;
	smsFallback: boolean;
	slaMinutes: number;
	maintenanceMode: boolean;
};

const initialSettings: SystemSettings = {
	platformName: "4LIFE Hospitality Platform",
	adminEmail: "admin@4life.vn",
	timezone: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
	language: "Tiếng Việt",
	currency: "VND (₫) & USD ($)",
	mfa: true,
	bruteForceLock: true,
	sessionTimeout: 120,
	passwordLength: 12,
	emergencyEmail: true,
	mobilePush: true,
	smsFallback: true,
	slaMinutes: 15,
	maintenanceMode: false
};

const sections: { id: SettingsSectionId; label: string; icon: typeof Domain }[] = [
	{ id: "organization", label: "Tổ chức", icon: Domain },
	{ id: "security", label: "Bảo mật & phiên", icon: Security },
	{ id: "notifications", label: "Thông báo", icon: NotificationsActive },
	{ id: "integrations", label: "Tích hợp", icon: Hub },
	{ id: "danger", label: "Vùng nguy hiểm", icon: WarningAmber }
];

const SettingsPage = () => {
	const [settings, setSettings] = useState(initialSettings);
	const [savedSettings, setSavedSettings] = useState(initialSettings);
	const [activeSection, setActiveSection] = useState<SettingsSectionId>("organization");
	const [notice, setNotice] = useState("");
	const [noticeOpen, setNoticeOpen] = useState(false);
	const sectionRefs = useRef<Partial<Record<SettingsSectionId, HTMLElement | null>>>({});
	const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings);

	const updateSetting = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
		setSettings(current => ({ ...current, [key]: value }));
	};

	const handleSave = () => {
		setSavedSettings(settings);
		setNotice("Thay đổi được lưu trong phiên hiện tại. API cấu hình chưa được kết nối.");
		setNoticeOpen(true);
	};

	const handleRevert = () => {
		setSettings(savedSettings);
		setNotice("Đã hoàn tác về lần lưu gần nhất trong phiên này.");
		setNoticeOpen(true);
	};

	const handleSectionClick = (id: SettingsSectionId) => {
		setActiveSection(id);
		sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const handleCopyTenantId = async () => {
		try {
			await navigator.clipboard.writeText("4LIFE-VN-PROD-20128");
			setNotice("Đã sao chép mã mẫu vào clipboard.");
		} catch {
			setNotice("Không thể truy cập clipboard trong trình duyệt này.");
		}
		setNoticeOpen(true);
	};

	const setSectionRef = (id: SettingsSectionId) => (element: HTMLElement | null) => {
		sectionRefs.current[id] = element;
	};

	return (
		<Box sx={{ color: "#E5E1E4" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2, mb: 3, pb: 2.5, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
				<Box>
					<Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.25 }}>
						<Typography variant="h5" sx={{ color: "#F7F7F8", fontWeight: 700, letterSpacing: "-.025em" }}>Cài đặt hệ thống</Typography>
						<Chip size="small" label="Bản xem trước · v3.4.8" icon={<CheckCircleOutline />} sx={{ bgcolor: "rgba(53,237,126,.1)", color: "#6DE99A", borderRadius: "6px", "& .MuiChip-icon": { color: "inherit", fontSize: 15 } }} />
					</Box>
					<Typography variant="body2" sx={{ color: "#B8B7C1", maxWidth: 720, mt: 0.75 }}>
						Quản lý thông tin tổ chức, chính sách truy cập và các kết nối vận hành của 4LIFE.
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
					<Button onClick={handleRevert} disabled={!hasChanges} startIcon={<History />} sx={secondaryButtonSx}>Hoàn tác</Button>
					<Button onClick={handleSave} disabled={!hasChanges} startIcon={<Save />} sx={primaryButtonSx}>Lưu thay đổi</Button>
				</Box>
			</Box>

			<Alert severity="info" icon={false} sx={{ mb: 2.5, py: 0, bgcolor: "rgba(88,101,242,.09)", color: "#C9CCFF", border: "1px solid rgba(128,131,255,.2)", borderRadius: "8px", "& .MuiAlert-message": { py: 1 } }}>
				Đây là bản dựng giao diện với dữ liệu minh họa. Các thay đổi chỉ tồn tại trong phiên làm việc này.
			</Alert>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "230px minmax(0, 1fr)" }, alignItems: "start", gap: 2.5 }}>
				<Box component="nav" aria-label="Mục cài đặt" sx={{ position: { lg: "sticky" }, top: { lg: 16 }, display: "flex", flexDirection: { xs: "row", lg: "column" }, flexWrap: { xs: "wrap", lg: "nowrap" }, gap: 0.5, p: 0.75, bgcolor: "#171719", border: "1px solid rgba(255,255,255,.07)", borderRadius: "10px" }}>
					{sections.map(({ id, label, icon: Icon }) => (
						<Button key={id} onClick={() => handleSectionClick(id)} startIcon={<Icon />} aria-current={activeSection === id ? "location" : undefined} sx={{ justifyContent: "flex-start", px: 1.25, py: 1, minWidth: 0, color: activeSection === id ? "#C0C1FF" : "#B8B7C1", bgcolor: activeSection === id ? "#2A2A2C" : "transparent", borderRadius: "7px", whiteSpace: "nowrap", "&:hover": { bgcolor: "#2A2A2C", color: "#F7F7F8" }, "& .MuiButton-startIcon": { mr: 1, "& svg": { fontSize: 18 } } }}>
							{label}
						</Button>
					))}
					<Box sx={{ display: { xs: "none", lg: "block" }, mt: 1, p: 1.5, bgcolor: "#101012", borderRadius: "7px" }}>
						<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.25 }}>
							<Typography sx={eyebrowSx}>Trạng thái hệ thống</Typography>
							<Typography sx={{ color: "#6DE99A", fontSize: 11 }}>● Mẫu</Typography>
						</Box>
						<Metric label="CPU · Node 01" value="14.2%" progress={14} />
						<Metric label="Redis memory" value="1.18 / 4 GB" progress={30} />
					</Box>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 2.25, minWidth: 0 }}>
					<SettingsSection id="organization" refCallback={setSectionRef("organization")} title="Thông tin tổ chức" description="Hồ sơ hiển thị và thiết lập mặc định cho hệ sinh thái." icon={<Domain />}>
						<Box sx={fieldGridSx}>
							<SettingsField label="Tên nền tảng hiển thị"><TextField size="small" fullWidth value={settings.platformName} onChange={event => updateSetting("platformName", event.target.value)} /></SettingsField>
							<SettingsField label="Mã định danh tenant"><Box sx={{ display: "flex", gap: 0.75 }}><TextField size="small" fullWidth value="4LIFE-VN-PROD-20128" InputProps={{ readOnly: true }} sx={monoFieldSx} /><Tooltip title="Sao chép mã"><IconButton onClick={handleCopyTenantId} aria-label="Sao chép mã tenant" sx={smallIconButtonSx}><ContentCopy fontSize="small" /></IconButton></Tooltip></Box></SettingsField>
							<SettingsField label="Email quản trị IT"><TextField size="small" fullWidth type="email" value={settings.adminEmail} onChange={event => updateSetting("adminEmail", event.target.value)} /></SettingsField>
							<SettingsField label="Múi giờ"><TextField select size="small" fullWidth value={settings.timezone} onChange={event => updateSetting("timezone", event.target.value)}>{["(GMT+07:00) Bangkok, Hanoi, Jakarta", "(GMT+08:00) Singapore, Kuala Lumpur", "(GMT+09:00) Tokyo, Seoul", "(GMT+00:00) UTC"].map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}</TextField></SettingsField>
							<SettingsField label="Ngôn ngữ mặc định"><TextField select size="small" fullWidth value={settings.language} onChange={event => updateSetting("language", event.target.value)}>{["Tiếng Việt", "English", "한국어"].map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}</TextField></SettingsField>
							<SettingsField label="Đơn vị tiền tệ"><TextField size="small" fullWidth value={settings.currency} onChange={event => updateSetting("currency", event.target.value)} /></SettingsField>
						</Box>
						<SectionFooter>Giá trị khởi tạo từ nội dung tham khảo · Chưa đồng bộ máy chủ</SectionFooter>
					</SettingsSection>

					<SettingsSection id="security" refCallback={setSectionRef("security")} title="Bảo mật & kiểm soát phiên" description="Chính sách truy cập, xác thực và thời hạn phiên quản trị." icon={<Security />}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							<ToggleRow title="Bắt buộc xác thực đa yếu tố (MFA)" description="Yêu cầu lớp xác thực bổ sung cho tài khoản quản trị." checked={settings.mfa} onChange={value => updateSetting("mfa", value)} />
							<ToggleRow title="Tự khóa khi phát hiện brute-force" description="Tạm khóa sau nhiều lần đăng nhập thất bại liên tiếp." checked={settings.bruteForceLock} onChange={value => updateSetting("bruteForceLock", value)} />
							<Box sx={fieldGridSx}>
								<SettingsField label="Thời hạn phiên" helper="Tự hết hạn khi không hoạt động."><TextField type="number" size="small" value={settings.sessionTimeout} onChange={event => updateSetting("sessionTimeout", Number(event.target.value))} InputProps={{ endAdornment: <Typography sx={unitSx}>phút</Typography> }} /></SettingsField>
								<SettingsField label="Độ dài mật khẩu tối thiểu" helper="Đang hiển thị cấu hình mẫu."><TextField type="number" size="small" value={settings.passwordLength} onChange={event => updateSetting("passwordLength", Number(event.target.value))} InputProps={{ endAdornment: <Typography sx={unitSx}>ký tự</Typography> }} /></SettingsField>
							</Box>
							<Divider sx={{ borderColor: "rgba(255,255,255,.08)" }} />
							<Box>
								<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 1 }}>
									<Typography sx={fieldLabelSx}>Danh sách IP được phép</Typography>
									<Button size="small" startIcon={<Add />} onClick={() => { setNotice("Quản lý IP sẽ khả dụng khi kết nối API cấu hình."); setNoticeOpen(true); }} sx={{ color: "#C0C1FF", textTransform: "none" }}>Thêm IP</Button>
								</Box>
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}><IpChip address="118.69.182.0/24" label="Văn phòng Hà Nội" /><IpChip address="14.238.10.15" label="Chi nhánh TP.HCM" /></Box>
							</Box>
						</Box>
					</SettingsSection>

					<SettingsSection id="notifications" refCallback={setSectionRef("notifications")} title="Thông báo vận hành" description="Các kênh cảnh báo và ngưỡng phản hồi hiển thị theo cấu hình mẫu." icon={<NotificationsActive />}>
						<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 1 }}>
							<ChannelToggle title="Email khẩn cấp" description="Gửi cảnh báo sự cố ưu tiên cao." checked={settings.emergencyEmail} onChange={value => updateSetting("emergencyEmail", value)} />
							<ChannelToggle title="Thông báo đẩy" description="Kênh mobile push broadcast." checked={settings.mobilePush} onChange={value => updateSetting("mobilePush", value)} />
							<ChannelToggle title="SMS dự phòng" description="Fallback khi kênh chính quá tải." checked={settings.smsFallback} onChange={value => updateSetting("smsFallback", value)} />
						</Box>
						<Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1.5, p: 1.5, bgcolor: "#201f22", borderRadius: "7px" }}>
							<Box><Typography sx={fieldLabelSx}>Ngưỡng cảnh báo SLA</Typography><Typography sx={helperSx}>Thông báo khi yêu cầu chưa được tiếp nhận.</Typography></Box>
							<TextField type="number" size="small" value={settings.slaMinutes} onChange={event => updateSetting("slaMinutes", Number(event.target.value))} sx={{ width: 112 }} InputProps={{ endAdornment: <Typography sx={unitSx}>phút</Typography> }} />
						</Box>
					</SettingsSection>

					<SettingsSection id="integrations" refCallback={setSectionRef("integrations")} title="Tích hợp & dịch vụ bên thứ ba" description="Tình trạng minh họa, chưa được kiểm tra từ môi trường thực." icon={<IntegrationInstructions />} action={<Button size="small" startIcon={<Refresh />} onClick={() => { setNotice("Kiểm tra kết nối sẽ khả dụng khi API tích hợp được cấu hình."); setNoticeOpen(true); }} sx={{ color: "#C0C1FF", textTransform: "none" }}>Kiểm tra kết nối</Button>}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
							<IntegrationRow initials="OP" title="OnePay / VNPay Gateway" description="Khóa API: pk_live_••••••••9834" status="Chưa xác minh" color="#E3A5B1" />
							<IntegrationRow initials="SSO" title="Google Workspace SSO" description="Domain mẫu: @4life.vn" status="Chưa xác minh" color="#C0C1FF" />
							<IntegrationRow initials="IoT" title="Smartlock IoT Bridge" description="MQTT Broker · TLS 1.3" status="Chưa xác minh" color="#6DE99A" />
						</Box>
					</SettingsSection>

					<SettingsSection id="danger" refCallback={setSectionRef("danger")} title="Vùng nguy hiểm" description="Tác vụ ảnh hưởng diện rộng cần được kết nối backend và phân quyền trước khi sử dụng." icon={<WarningAmber />} tone="danger">
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
							<Box sx={dangerRowSx}>
								<Box><Typography sx={fieldLabelSx}>Xóa bộ nhớ đệm hệ thống</Typography><Typography sx={helperSx}>Tác vụ đang khóa vì chưa có API được kết nối.</Typography></Box>
								<Tooltip title="Chưa kết nối dịch vụ"><span><Button disabled startIcon={<DeleteSweep />} sx={{ color: "#F08F91", border: "1px solid rgba(237,66,69,.25)", textTransform: "none" }}>Xóa cache</Button></span></Tooltip>
							</Box>
							<Box sx={dangerRowSx}>
								<Box><Typography sx={fieldLabelSx}>Chế độ bảo trì</Typography><Typography sx={helperSx}>Bật bảo trì chỉ thay đổi bản xem trước trên trang này.</Typography></Box>
								<FormControlLabel sx={{ m: 0 }} control={<Switch checked={settings.maintenanceMode} onChange={event => updateSetting("maintenanceMode", event.target.checked)} color="error" />} label={<Typography sx={{ color: settings.maintenanceMode ? "#F08F91" : "#B8B7C1", fontSize: 13 }}>{settings.maintenanceMode ? "Bật" : "Tắt"}</Typography>} />
							</Box>
						</Box>
					</SettingsSection>
				</Box>
			</Box>

			<Snackbar open={noticeOpen} autoHideDuration={4500} onClose={() => setNoticeOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
				<Alert onClose={() => setNoticeOpen(false)} severity="info" variant="filled" sx={{ bgcolor: "#2A2A2C", color: "#F7F7F8" }}>{notice}</Alert>
			</Snackbar>
		</Box>
	);
};

const SettingsSection = ({ id, refCallback, title, description, icon, action, tone, children }: { id: SettingsSectionId; refCallback: (element: HTMLElement | null) => void; title: string; description: string; icon: React.ReactNode; action?: React.ReactNode; tone?: "danger"; children: React.ReactNode }) => (
	<Box component="section" ref={refCallback} id={`settings-${id}`} sx={{ scrollMarginTop: 20, bgcolor: "#1C1B1D", border: `1px solid ${tone === "danger" ? "rgba(237,66,69,.28)" : "rgba(255,255,255,.08)"}`, borderRadius: "10px", overflow: "hidden" }}>
		<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5, p: { xs: 1.75, sm: 2.25 }, borderBottom: "1px solid rgba(255,255,255,.07)", bgcolor: tone === "danger" ? "rgba(237,66,69,.06)" : "transparent" }}>
			<Box sx={{ display: "flex", gap: 1.25, minWidth: 0 }}>
				<Avatar variant="rounded" sx={{ width: 34, height: 34, bgcolor: tone === "danger" ? "rgba(237,66,69,.12)" : "rgba(88,101,242,.12)", color: tone === "danger" ? "#F08F91" : "#C0C1FF", "& svg": { fontSize: 19 } }}>{icon}</Avatar>
				<Box><Typography sx={{ color: tone === "danger" ? "#F08F91" : "#F7F7F8", fontSize: 15, fontWeight: 650 }}>{title}</Typography><Typography sx={{ color: "#A6A5AE", fontSize: 12.5, mt: 0.35 }}>{description}</Typography></Box>
			</Box>
			{action}
		</Box>
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 1.75, sm: 2.25 } }}>{children}</Box>
	</Box>
);

const SettingsField = ({ label, helper, children }: { label: string; helper?: string; children: React.ReactNode }) => (
	<Box sx={{ display: "flex", flexDirection: "column", gap: 0.7, minWidth: 0 }}>
		<Typography sx={fieldLabelSx}>{label}</Typography>{children}{helper && <Typography sx={helperSx}>{helper}</Typography>}
	</Box>
);

const ToggleRow = ({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) => (
	<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, px: 1.5, py: 1.25, bgcolor: "rgba(42,42,44,.55)", borderRadius: "7px" }}>
		<Box><Typography sx={fieldLabelSx}>{title}</Typography><Typography sx={helperSx}>{description}</Typography></Box>
		<Switch checked={checked} onChange={event => onChange(event.target.checked)} inputProps={{ "aria-label": title }} />
	</Box>
);

const ChannelToggle = ({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) => (
	<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1.25, p: 1.5, minHeight: 132, bgcolor: "rgba(42,42,44,.5)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "8px" }}>
		<Switch checked={checked} onChange={event => onChange(event.target.checked)} inputProps={{ "aria-label": title }} sx={{ alignSelf: "flex-end", mr: -1 }} />
		<Box><Typography sx={fieldLabelSx}>{title}</Typography><Typography sx={{ ...helperSx, mt: 0.3 }}>{description}</Typography></Box>
	</Box>
);

const IntegrationRow = ({ initials, title, description, status, color }: { initials: string; title: string; description: string; status: string; color: string }) => (
	<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, p: 1.25, bgcolor: "rgba(42,42,44,.45)", borderRadius: "7px" }}>
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}><Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: "#101012", color, fontSize: 11, fontWeight: 700 }}>{initials}</Avatar><Box sx={{ minWidth: 0 }}><Typography sx={fieldLabelSx}>{title}</Typography><Typography noWrap sx={{ ...helperSx, fontFamily: "monospace" }}>{description}</Typography></Box></Box>
		<Chip size="small" label={status} sx={{ bgcolor: "#2A2A2C", color: "#B8B7C1", fontSize: 10.5, borderRadius: "5px" }} />
	</Box>
);

const IpChip = ({ address, label }: { address: string; label: string }) => (
	<Chip label={`${address} · ${label}`} size="small" sx={{ bgcolor: "#2A2A2C", color: "#D8D7DF", fontFamily: "monospace", borderRadius: "6px", "& .MuiChip-label": { px: 1.25 } }} />
);

const Metric = ({ label, value, progress }: { label: string; value: string; progress: number }) => (
	<Box sx={{ mb: 1.25 }}><Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}><Typography sx={{ color: "#B8B7C1", fontSize: 10.5 }}>{label}</Typography><Typography sx={{ color: "#E5E1E4", fontSize: 10.5, fontFamily: "monospace" }}>{value}</Typography></Box><Box sx={{ height: 4, bgcolor: "#353437", borderRadius: 4 }}><Box sx={{ width: `${progress}%`, height: "100%", bgcolor: "#8083FF", borderRadius: 4 }} /></Box></Box>
);

const SectionFooter = ({ children }: { children: React.ReactNode }) => <Box sx={{ mx: { xs: -1.75, sm: -2.25 }, mb: { xs: -1.75, sm: -2.25 }, px: { xs: 1.75, sm: 2.25 }, py: 1, borderTop: "1px solid rgba(255,255,255,.06)", bgcolor: "rgba(14,14,16,.45)" }}><Typography sx={{ color: "#A6A5AE", fontSize: 11 }}>{children}</Typography></Box>;

const fieldGridSx = { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1.75 };
const fieldLabelSx = { color: "#DEDEE3", fontSize: 12.5, fontWeight: 550 };
const helperSx = { color: "#B8B7C1", fontSize: 11.5, lineHeight: 1.5 };
const eyebrowSx = { color: "#A6A5AE", fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" as const };
const unitSx = { color: "#A6A5AE", fontSize: 11, whiteSpace: "nowrap" as const };
const smallIconButtonSx = { borderRadius: "6px", bgcolor: "#2A2A2C", color: "#D8D7DF", "&:hover": { bgcolor: "#353437" } };
const monoFieldSx = { "& input": { color: "#C0C1FF", fontFamily: "monospace", fontSize: 12 } };
const primaryButtonSx = { px: 1.5, py: 0.9, bgcolor: "#ff385c", color: "#fff", borderRadius: "7px", textTransform: "none", "&:hover": { bgcolor: "#e02f50" }, "&.Mui-disabled": { color: "#777782", bgcolor: "#2A2A2C" } };
const secondaryButtonSx = { px: 1.5, py: 0.9, color: "#D8D7DF", bgcolor: "#202024", borderRadius: "7px", textTransform: "none", "&:hover": { bgcolor: "#2A2A2C" }, "&.Mui-disabled": { color: "#777782" } };
const dangerRowSx = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, p: 1.5, bgcolor: "rgba(42,42,44,.48)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "7px" };

export default SettingsPage;
