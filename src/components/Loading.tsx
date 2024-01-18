import { CircularProgress } from "@mui/material";
import { memo } from "react";

export default memo(() => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<CircularProgress color="primary" />
		</div>
	);
});
