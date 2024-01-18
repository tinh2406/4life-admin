import { ChevronRight, Delete } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Card, Grid, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { memo, useMemo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DataTable, { GridColDefMe } from "../../components/DataTable";
import { useFilter } from "../../context/filter";
import { PagingResponse } from "../../type/Paging";
import { CollapseUser } from "./api/User";
import { getUsers } from "./api/getList";

type RowType = {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	avatar: string;
	block: JSX.Element;
	more: JSX.Element;
};

const Block = memo(({ id }: { id: string }) => {
	return (
		<Delete
			fontSize="small"
			onClick={() => {
				console.log("Delete id", id);
			}}
		/>
	);
});
const More = memo(({ id }: { id: string }) => {
	return (
		<Link to={id}>
			<ChevronRight fontSize="small" color="action" />
		</Link>
	);
});
const columns: GridColDefMe<RowType>[] = [
	{ field: "id", headerName: "Id", width: 60, align: "center" },
	{ field: "name", headerName: "Name", width: "40%", align: "left", type: "string" },
	{ field: "email", headerName: "Email", width: "50%", align: "left", type: "string" },
	{ field: "phoneNumber", headerName: "Phone number", width: "20%", align: "left", type: "string" },
	{ field: "more", headerName: "Detail", width: 90, align: "center" },
	{ field: "block", headerName: "Action", width: 90, align: "center" }
];

const Users = () => {
	const { userParams, setUserParams } = useFilter();

	const { data, isLoading } = useQuery<PagingResponse<CollapseUser>, unknown, PagingResponse<CollapseUser>>({
		queryKey: ["users", ...Object.values(userParams)],
		queryFn: () => getUsers(userParams),
		select(res) {
			const {
				meta: { pageIndex },
				data
			} = res;
			return {
				...res,
				data: data.map((user, index) => ({
					...user,
					index: index + 1 + pageIndex * 10 - 10
				}))
			};
		},
		keepPreviousData: true
	});

	const users: RowType[] = useMemo(() => {
		if (!data?.data) return [];

		return data.data.map(
			(user): RowType => ({
				...user,
				block: <Block id={user.id} />,
				more: <More id={user.id} />
			})
		);
	}, [data]);
	// const handleSearchChange = useCallback((searchTerm: string) => {
	// 	setUsersParams(state => ({ ...state, Role: searchTerm, PageIndex: 1 }));
	// }, []);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number): void => {
		if(setUserParams) setUserParams(state => {
			return { ...state, PageIndex: page };
		});

	};

	return (
		<Box pb={3}>
			<Grid container spacing={6}>
				<Grid item xs={12}>
					<Card>
						<Box pt={2}>
							<DataTable isLoading={isLoading} columns={columns} rows={users} />
							<Stack alignItems="center" m={1} spacing={2}>
								<Pagination
									count={data?.meta.totalPages || 0}
									onChange={handlePageChange}
									renderItem={item => (
										<PaginationItem
											slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
											{...item}
										/>
									)}
								/>
							</Stack>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Users;
