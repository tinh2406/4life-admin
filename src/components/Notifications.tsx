import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { format } from "date-fns";
import { memo, useEffect, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import borders from "../assets/theme/base/borders";
import colors from "../assets/theme/base/colors";
import axiosInstance from "../constants/AxiosInstance";
import { PagingResponse } from "../type/Paging";
import { useNotify } from "../context/notify";
import { LazyLoadImage } from "react-lazy-load-image-component";
type NotifyType = {
	id: string;
	type: "RequestToMod";
	content: string;
	note: string;
	createdDate: string;
	avatar: string;
	userFrom: string;
};

const NotificationItem = memo(({ notify, isNew }: { notify: NotifyType; isNew: boolean }) => {
	const { removeNoti, last, addNoti } = useNotify();
	useEffect(() => {
		if (last < Date.parse(notify.createdDate)) {
			if (addNoti) addNoti(notify.id);
		}
	}, []);

	return (
		<MenuItem
			sx={({ transitions }) => ({
				display: "flex",
				alignItems: "center",
				width: "100%",
				color: colors.dark.main,
				backgroundColor: isNew ? "#e7faff" : colors.white.main,
				borderRadius: borders.borderRadius.md,
				transition: transitions.create("background-color", {
					easing: transitions.easing.easeInOut,
					duration: transitions.duration.standard
				}),

				"& *": {
					transition: "color 100ms linear"
				},

				"&:not(:last-child)": {
					mb: 1
				},

				"&:hover": {
					backgroundColor: colors.light.main,

					"& *": {
						color: colors.dark.main
					}
				}
			})}
		>
			<Box
				component={Link}
				to={notify.type === "RequestToMod" ? `/requests/${notify.userFrom}` : "#"}
				display="flex"
				flexDirection="row"
				sx={{ width: "100%" }}
				// alignItems="center"
				lineHeight={1}
				onClick={() => {
					if (removeNoti) removeNoti(notify.id);
				}}
			>
				<LazyLoadImage alt={"avt"} height={40} src={notify.avatar} width={40} />
				<Box sx={{ width: "100%", ml: 1 }}>
					<Typography fontWeight="regular" color={colors.dark.main} sx={{ fontSize: 14 }}>
						{notify.content}
					</Typography>
					<Typography align="right" sx={{ fontSize: 10 }} color={colors.text.main}>
						{format(Date.parse(notify.createdDate), "hh:mm dd:MM:yyyy")}
					</Typography>
					<Divider sx={{ mt: "4px", mb: 0 }} />
				</Box>
			</Box>
		</MenuItem>
	);
});

const Notifys = ({
	openMenu,
	close
}: {
	openMenu: (EventTarget & HTMLButtonElement) | undefined;
	close: () => void;
}) => {
	const { newNoti } = useNotify();
	const { data } = useInfiniteQuery<PagingResponse<NotifyType>, unknown, PagingResponse<NotifyType>>(
		["all-notifys"],
		async ({ pageParam = 1 }) => {
			return (
				await axiosInstance.get<PagingResponse<NotifyType>>("notifications", {
					params: {
						IsDescending: true,
						pageIndex: pageParam
					}
				})
			).data;
		},
		{
			getNextPageParam: lastPage => lastPage.meta.pageIndex + 1
		}
	);
	const notifys = useMemo(() => {
		if (!data?.pages) return [];
		const newData = data?.pages.flatMap(data => data.data);
		return newData;
	}, [data]);

	return (
		<Menu
			anchorEl={openMenu}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left"
			}}
			open={Boolean(openMenu)}
			onClose={close}
			sx={{ mt: 2, maxHeight: 500 }}
		>
			{notifys.map(i => (
				<NotificationItem isNew={newNoti.hasOwnProperty(i.id)} notify={i} key={i.id} />
			))}
		</Menu>
	);
};

export default memo(Notifys);
