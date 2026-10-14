import { ArrowDownward, ArrowUpward, Search, Sort } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useFilter } from "../context/filter";

type SortOption<T extends string> = { value: T; label: string };
type FilterToolbarProps<T extends string> = {
	visible?: boolean;
	sortBy?: T;
	descending?: boolean;
	options: readonly SortOption<T>[];
	keyword?: string;
	role?: string;
	roleOptions?: readonly string[];
	placeholder: string;
	onSortChange: (value: T) => void;
	onDirectionChange: (descending: boolean) => void;
	onKeywordChange: (keyword: string) => void;
	onRoleChange?: (role: string) => void;
};

const FilterToolbar = <T extends string>({
	visible,
	sortBy,
	descending = false,
	options,
	keyword,
	role,
	roleOptions,
	placeholder,
	onSortChange,
	onDirectionChange,
	onKeywordChange,
	onRoleChange
}: FilterToolbarProps<T>) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const selectedLabel = options.find(option => option.value === sortBy)?.label ?? options[0]?.label ?? "Sắp xếp";
	useEffect(() => () => {
		if (timerRef.current) clearTimeout(timerRef.current);
	}, []);

	const handleSearchChange = (value: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => onKeywordChange(value), 300);
	};

	const handleSortChange = (event: SelectChangeEvent<T>) => {
		const selectedOption = options.find(option => option.value === event.target.value);
		if (selectedOption) onSortChange(selectedOption.value);
	};

	return (
		<Box sx={{ display: visible ? "flex" : "none", alignItems: "center", flexWrap: "wrap", gap: 0.5, width: "100%", minWidth: 0, p: 0.5, bgcolor: "#171719", border: "1px solid rgba(255,255,255,.07)", borderRadius: "8px" }}>
			<Box sx={{ display: "flex", alignItems: "center", minWidth: 0, flex: "0 0 auto", gap: 0.25 }}>
				<Sort sx={{ ml: 0.5, color: "#A6A5AE", fontSize: 18 }} />
				<Select
					value={sortBy ?? options[0]?.value ?? ""}
					onChange={handleSortChange}
					inputProps={{ "aria-label": `Sắp xếp theo ${selectedLabel}` }}
					displayEmpty
					sx={sortSelectSx}
					MenuProps={{ PaperProps: { sx: menuPaperSx } }}
				>
					{options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
				</Select>
				<Tooltip title={descending ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"}>
					<IconButton size="small" aria-label={descending ? "Đổi sang tăng dần" : "Đổi sang giảm dần"} onClick={() => onDirectionChange(!descending)} sx={directionButtonSx}>
						{descending ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
					</IconButton>
				</Tooltip>
			</Box>

			{roleOptions && role && onRoleChange && <>
				<Box sx={separatorSx} />
				<Select value={role} onChange={event => onRoleChange(event.target.value)} inputProps={{ "aria-label": "Lọc theo vai trò" }} sx={{ ...sortSelectSx, minWidth: 95 }} MenuProps={{ PaperProps: { sx: menuPaperSx } }}>
					{roleOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
				</Select>
			</>}

			<Box sx={{ ...separatorSx, display: { xs: "none", sm: "block" } }} />
			<TextField
				defaultValue={keyword ?? ""}
				placeholder={placeholder}
				aria-label={placeholder}
				size="small"
				variant="filled"
				InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start" sx={{ mt: "0 !important", mb: 0, height: 24, maxHeight: "none", display: "flex", alignItems: "center" }}><Search sx={{ color: "#92919B", fontSize: 18, display: "block" }} /></InputAdornment> }}
				sx={{
					flex: { xs: "1 1 100%", sm: "1 1 200px" },
					minWidth: { xs: 0, sm: 180 },
					"& .MuiFilledInput-root": { ...searchInputSx, alignItems: "center", minHeight: 38, py: 0 },
					"& .MuiFilledInput-input": { display: "flex", alignItems: "center", boxSizing: "border-box" }
				}}
				onChange={event => handleSearchChange(event.target.value)}
			/>
		</Box>
	);
};

const RequestFilter = memo(({ visible }: { visible?: boolean }) => {
	const { requestParams, setRequestParams } = useFilter();
	const options = [
		{ value: "Name", label: "Tên" },
		{ value: "Email", label: "Email" },
		{ value: "PhoneNumber", label: "Số điện thoại" }
	] as const;
	return <FilterToolbar visible={visible} options={options} sortBy={requestParams.SortBy} descending={requestParams.IsDescending} keyword={requestParams.Keyword} placeholder="Tìm yêu cầu..." onSortChange={value => setRequestParams?.(current => ({ ...current, SortBy: value }))} onDirectionChange={value => setRequestParams?.(current => ({ ...current, IsDescending: value }))} onKeywordChange={value => setRequestParams?.(current => ({ ...current, Keyword: value }))} />;
});

const UserFilter = memo(({ visible }: { visible?: boolean }) => {
	const { userParams, setUserParams } = useFilter();
	const options = [
		{ value: "Name", label: "Tên" },
		{ value: "Email", label: "Email" },
		{ value: "PhoneNumber", label: "Số điện thoại" }
	] as const;
	return <FilterToolbar visible={visible} options={options} sortBy={userParams.SortBy} descending={userParams.IsDescending} keyword={userParams.Keyword} role={userParams.Role} roleOptions={["User", "Mod", "Admin"]} placeholder="Tìm người dùng..." onSortChange={value => setUserParams?.(current => ({ ...current, SortBy: value }))} onDirectionChange={value => setUserParams?.(current => ({ ...current, IsDescending: value }))} onKeywordChange={value => setUserParams?.(current => ({ ...current, Keyword: value }))} onRoleChange={value => { if (value === "User" || value === "Mod" || value === "Admin") setUserParams?.(current => ({ ...current, Role: value })); }} />;
});

const LocationFilter = memo(({ visible }: { visible?: boolean }) => {
	const { locationParams, setLocationParams } = useFilter();
	const options = [
		{ value: "City", label: "Thành phố" },
		{ value: "District", label: "Quận / huyện" }
	] as const;
	return <FilterToolbar visible={visible} options={options} sortBy={locationParams.SortBy} descending={locationParams.IsDescending} keyword={locationParams.Keyword} placeholder="Tìm địa điểm..." onSortChange={value => setLocationParams?.(current => ({ ...current, SortBy: value }))} onDirectionChange={value => setLocationParams?.(current => ({ ...current, IsDescending: value }))} onKeywordChange={value => setLocationParams?.(current => ({ ...current, Keyword: value }))} />;
});

const AmenityFilter = memo(({ visible }: { visible?: boolean }) => {
	const { amenityParams, setAmenityParams } = useFilter();
	const options = [
		{ value: "Name", label: "Tên" },
		{ value: "CreatedDate", label: "Ngày tạo" }
	] as const;
	return <FilterToolbar visible={visible} options={options} sortBy={amenityParams.SortBy} descending={amenityParams.IsDescending} keyword={amenityParams.Keyword} placeholder="Tìm tiện ích..." onSortChange={value => setAmenityParams?.(current => ({ ...current, SortBy: value }))} onDirectionChange={value => setAmenityParams?.(current => ({ ...current, IsDescending: value }))} onKeywordChange={value => setAmenityParams?.(current => ({ ...current, Keyword: value }))} />;
});

const sortSelectSx = {
	minWidth: 116,
	color: "#E5E1E4",
	fontSize: 12,
	fontWeight: 550,
	borderRadius: "6px",
	"& .MuiSelect-select": { py: 0.85, pl: 1, pr: "28px !important" },
	"& .MuiOutlinedInput-notchedOutline": { border: 0 },
	"&:hover": { bgcolor: "#2A2A2C" },
	"&.Mui-focused": { bgcolor: "#2A2A2C" },
	"& .MuiSvgIcon-root": { color: "#92919B", fontSize: 19 }
};
const directionButtonSx = { color: "#B8B7C1", width: 32, height: 32, borderRadius: "6px", "&:hover": { bgcolor: "#2A2A2C", color: "#F7F7F8" } };
const separatorSx = { width: "1px", height: 22, bgcolor: "rgba(255,255,255,.1)", flexShrink: 0 };
const searchInputSx = {
	color: "#F7F7F8 !important",
	bgcolor: "#202024 !important",
	borderRadius: "6px",
	py: 0.05,
	"&:hover": { bgcolor: "#2A2A2C !important" },
	"&.Mui-focused": { bgcolor: "#202024 !important" },
	"& input": { color: "#F7F7F8 !important", WebkitTextFillColor: "#F7F7F8", py: "8px", fontSize: 12.5 },
	"& input::placeholder": { color: "#A6A5AE", opacity: 1 }
};
const menuPaperSx = { bgcolor: "#202024", color: "#E5E1E4", border: "1px solid rgba(255,255,255,.08)", borderRadius: "7px", "& .MuiMenuItem-root": { fontSize: 13, minHeight: 36, "&:hover, &.Mui-selected, &.Mui-selected:hover": { bgcolor: "rgba(88,101,242,.18)" } } };

export { RequestFilter, UserFilter, LocationFilter, AmenityFilter };
