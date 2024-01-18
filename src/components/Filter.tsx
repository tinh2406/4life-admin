import { ArrowDownward, ArrowUpward, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, TextField } from "@mui/material";
import { memo, useState } from "react";
import colors from "../assets/theme/base/colors";
import { useFilter } from "../context/filter";

const requestMap = {
	Name: "Name",
	Email: "Email",
	PhoneNumber: "Phone number"
};

export const RequestFilter = memo(({ visible }: { visible?: boolean }) => {
	const [timerId, setTimerId] = useState<any>();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { requestParams, setRequestParams } = useFilter();

	return (
		<Box
			pr={1}
			sx={{ flexGrow: 1, display: visible ? "flex" : "none", alignItems: "center", flexDirection: "row" }}
		>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="outlined"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDown />}
				sx={{
					color: colors.grey[600],
					marginRight: "0.5rem",

					width: 190,
					justifyContent: "left",
					textTransform: "none",
					borderColor: colors.grey[300],
					bgcolor: "rgba(255, 255, 255, 0.6)",
					":hover": {
						borderColor: colors.grey[400],
						color: colors.grey[700],
						bgcolor: "rgba(255, 255, 255)"
					}
				}}
				style={{
					padding: "12px 8px 12px 4px"
				}}
			>
				<div style={{ width: "100%", textAlign: "left" }}>
					{!!requestParams.SortBy && requestMap[requestParams.SortBy]}
				</div>
			</Button>
			{requestParams.IsDescending ? (
				<ArrowUpward
					fontSize="small"
					onClick={() => {
						if (setRequestParams) setRequestParams(state => ({ ...state, IsDescending: false }));
					}}
				/>
			) : (
				<ArrowDownward
					fontSize="small"
					onClick={() => {
						if (setRequestParams) setRequestParams(state => ({ ...state, IsDescending: true }));
					}}
				/>
			)}
			<TextField
				label="Search here"
				sx={{
					width: "100%",
					ml: 2,
					input: {
						color: colors.dark.main,
						zIndex: 1
					},
					fieldset: {
						bgcolor: "rgba(253, 253, 253, 0.6)",
						zIndex: 0
					}
				}}
				onChange={e => {
					if (timerId) clearInterval(timerId);

					setTimerId(
						setTimeout(() => {
							if (setRequestParams) setRequestParams(state => ({ ...state, Keyword: e.target.value }));
						}, 300)
					);
				}}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button"
				}}
			>
				<MenuItem
					onClick={() => {
						if (setRequestParams) setRequestParams(state => ({ ...state, SortBy: "Name" }));
						handleClose();
					}}
				>
					Name
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (setRequestParams) setRequestParams(state => ({ ...state, SortBy: "Email" }));
						handleClose();
					}}
				>
					Email
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (setRequestParams) setRequestParams(state => ({ ...state, SortBy: "PhoneNumber" }));
						handleClose();
					}}
				>
					Phone number
				</MenuItem>
			</Menu>
		</Box>
	);
});

export const UserFilter = memo(({ visible }: { visible?: boolean }) => {
	const [timerId, setTimerId] = useState<any>();
	const { userParams, setUserParams } = useFilter();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box pr={1} sx={{ flexGrow: 1, display: visible ? "flex" : "none", alignItems: "center" }}>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="outlined"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDown />}
				sx={{
					marginRight: "0.5rem",
					color: colors.grey[600],
					width: 160,
					justifyContent: "left",
					textTransform: "none",
					borderColor: colors.grey[300],
					bgcolor: "rgba(255, 255, 255, 0.6)",
					":hover": {
						borderColor: colors.grey[400],
						color: colors.grey[700],
						bgcolor: "rgba(255, 255, 255)"
					}
				}}
				style={{
					padding: "12px 8px 12px 4px"
				}}
			>
				<div style={{ width: "100%", textAlign: "left" }}>{userParams.Role}</div>
			</Button>
			{userParams.IsDescending ? (
				<ArrowUpward
					fontSize="small"
					onClick={() => {
						if (setUserParams) setUserParams(state => ({ ...state, IsDescending: false }));
					}}
				/>
			) : (
				<ArrowDownward
					fontSize="small"
					onClick={() => {
						if (setUserParams) setUserParams(state => ({ ...state, IsDescending: true }));
					}}
				/>
			)}
			<TextField
				label="Search here"
				sx={{
					width: "100%",
					ml: 2,
					input: {
						color: colors.dark.main,
						zIndex: 1
					},
					fieldset: {
						bgcolor: "rgba(253, 253, 253, 0.6)",
						zIndex: 0
					}
				}}
				onChange={e => {
					if (timerId) clearInterval(timerId);

					setTimerId(
						setTimeout(() => {
							if (setUserParams) setUserParams(state => ({ ...state, Keyword: e.target.value }));
						}, 300)
					);
				}}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button"
				}}
			>
				<MenuItem
					onClick={() => {
						if (setUserParams) setUserParams(state => ({ ...state, Role: "User" }));
						handleClose();
					}}
				>
					User
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (setUserParams) setUserParams(state => ({ ...state, Role: "Mod" }));
						handleClose();
					}}
				>
					Mod
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (setUserParams) setUserParams(state => ({ ...state, Role: "Admin" }));
						handleClose();
					}}
				>
					Admin
				</MenuItem>
			</Menu>
		</Box>
	);
});
export const LocationFilter = memo(({ visible }: { visible?: boolean }) => {
	const [timerId, setTimerId] = useState<any>();
	const { locationParams, setLocationParams } = useFilter();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box pr={1} sx={{ flexGrow: 1, display: visible ? "flex" : "none", alignItems: "center" }}>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="outlined"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDown />}
				sx={{
					marginRight: "0.5rem",
					color: colors.grey[600],
					width: 160,
					justifyContent: "left",
					textTransform: "none",
					borderColor: colors.grey[300],
					bgcolor: "rgba(255, 255, 255, 0.6)",
					":hover": {
						borderColor: colors.grey[400],
						color: colors.grey[700],
						bgcolor: "rgba(255, 255, 255)"
					}
				}}
				style={{
					padding: "12px 8px 12px 4px"
				}}
			>
				<div style={{ width: "100%", textAlign: "left" }}>{locationParams.SortBy}</div>
			</Button>
			{locationParams.IsDescending ? (
				<ArrowUpward
					fontSize="small"
					onClick={() => {
						if (setLocationParams) setLocationParams(state => ({ ...state, IsDescending: false }));
					}}
				/>
			) : (
				<ArrowDownward
					fontSize="small"
					onClick={() => {
						if (setLocationParams) setLocationParams(state => ({ ...state, IsDescending: true }));
					}}
				/>
			)}
			<TextField
				label="Search here"
				sx={{
					width: "100%",
					ml: 2,
					input: {
						color: colors.dark.main,
						zIndex: 1
					},
					fieldset: {
						bgcolor: "rgba(253, 253, 253, 0.6)",
						zIndex: 0
					}
				}}
				onChange={e => {
					if (timerId) clearInterval(timerId);

					setTimerId(
						setTimeout(() => {
							if (setLocationParams) setLocationParams(state => ({ ...state, Keyword: e.target.value }));
						}, 300)
					);
				}}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button"
				}}
			>
				<MenuItem
					onClick={() => {
						if (setLocationParams) setLocationParams(state => ({ ...state, SortBy: "City" }));
						handleClose();
					}}
				>
					City
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (setLocationParams) setLocationParams(state => ({ ...state, SortBy: "District" }));
						handleClose();
					}}
				>
					District
				</MenuItem>
			</Menu>
		</Box>
	);
});

const amenityMap = {
	Name: "Name",
	CreatedDate: "Create date"
};
export const AmenityFilter = memo(({ visible }: { visible?: boolean }) => {
	const [timerId, setTimerId] = useState<any>();
	const { amenityParams, setAmenityParams } = useFilter();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Box pr={1} sx={{ flexGrow: 1,display: visible ? "flex" : "none", alignItems: "center" }}>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="outlined"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDown />}
				sx={{
					marginRight: "0.5rem",
					color: colors.grey[600],
					width: 160,
					justifyContent: "left",
					textTransform: "none",
					borderColor: colors.grey[300],
					":hover": {
						borderColor: colors.grey[400],
						color: colors.grey[700],
						bgcolor: "rgba(255, 255, 255)"
					},
					bgcolor: "rgba(255, 255, 255, 0.6)"
				}}
				style={{
					padding: "12px 8px 12px 4px"
				}}
			>
				<div style={{ width: "100%", textAlign: "left" }}>
					{amenityParams.SortBy && amenityMap[amenityParams.SortBy]}
				</div>
			</Button>
			{amenityParams.IsDescending ? (
				<ArrowUpward
					fontSize="small"
					onClick={() => {
						if (setAmenityParams) setAmenityParams(state => ({ ...state, IsDescending: false }));
					}}
				/>
			) : (
				<ArrowDownward
					fontSize="small"
					onClick={() => {
						if (setAmenityParams) setAmenityParams(state => ({ ...state, IsDescending: true }));
					}}
				/>
			)}
			<TextField
				label="Search here"
				sx={{
					width: "100%",
					ml: 2,
					input: {
						color: colors.dark.main,
						zIndex: 1
					},
					fieldset: {
						bgcolor: "rgba(253, 253, 253, 0.6)",
						zIndex: 0
					}
				}}
				onChange={e => {
					if (timerId) clearInterval(timerId);

					setTimerId(
						setTimeout(() => {
							if (setAmenityParams) setAmenityParams(state => ({ ...state, Keyword: e.target.value }));
						}, 300)
					);
				}}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button"
				}}
			>
				<MenuItem
					onClick={() => {
						if (setAmenityParams) setAmenityParams(state => ({ ...state, SortBy: "Name" }));
						handleClose();
					}}
				>
					Name
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (setAmenityParams) setAmenityParams(state => ({ ...state, SortBy: "CreatedDate" }));
						handleClose();
					}}
				>
					Created date
				</MenuItem>
			</Menu>
		</Box>
	);
});
