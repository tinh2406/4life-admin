import { Check, Close } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { memo } from "react";
import { CollapseUser } from "../api/User";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { acceptMod } from "../api/acceptRequest";
import { denyMod } from "../api/denyRequest";
import { useNotify } from "../../../context/notify";

const UserCard = ({ user, active }: { user: CollapseUser; active: boolean }) => {
	const { removeRequest } = useNotify();
	const queryClient = useQueryClient();
	const acceptModMutation = useMutation({
		mutationFn: (id: string) => acceptMod(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["all-request-mod"]
			});
		}
	});
	const rejectModMutation = useMutation({
		mutationFn: (id: string) => denyMod(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["all-request-mod"]
			});
		}
	});

	return (
		<Card>
			{active && (
				<Box
					position={"absolute"}
					top={10}
					left={10}
					sx={{ background: "red", width: 5, height: 5, borderRadius: 5 }}
				/>
			)}
			<Link
				to={user.id}
				onClick={() => {
					if (removeRequest) removeRequest(user.id);
				}}
				style={{
					position: "absolute",
					width: "100%",
					height: "100%"
				}}
			/>
			<Box width="100%" display="flex" flexDirection="column" p={2} mt={2}>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Avatar
						src={user.avatar}
						sx={{
							width: "4rem",
							height: "4rem"
						}}
					/>
				</Box>
				<Box mb={1} lineHeight={0}>
					<Typography variant="h6" fontWeight="medium" textTransform="capitalize">
						{user.name}
					</Typography>
				</Box>
				<Box mb={1} lineHeight={0}>
					<Typography variant="caption" color="text">
						Phone number:&nbsp;&nbsp;&nbsp;
						<Typography variant="caption" fontWeight="medium" textTransform="capitalize">
							{user.phoneNumber || "Empty"}
						</Typography>
					</Typography>
				</Box>
				<Box mb={1} lineHeight={0} sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
					<Typography variant="caption" color="text">
						Email:&nbsp;&nbsp;&nbsp;
						<Typography variant="caption" fontWeight="medium">
							{user.email}diemtran
						</Typography>
					</Typography>
				</Box>
				<Box display="flex" mt={1} alignItems="center">
					<Button
						variant="text"
						color="error"
						onClick={() => {
							rejectModMutation.mutate(user.id);
						}}
					>
						<Close />
						&nbsp;Reject
					</Button>
					<Button
						variant="text"
						onClick={() => {
							acceptModMutation.mutate(user.id);
						}}
					>
						<Check />
						&nbsp;Accept
					</Button>
				</Box>
			</Box>
		</Card>
	);
};

export default memo(UserCard);
