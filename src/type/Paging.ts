export type PagingParams<T> = {
	Keyword?: string;
	PageIndex?: number;
	PageSize?: number;
	IsDescending?: boolean;
	SortBy?: T;
};

export type PagingResponse<T> = {
	meta: {
		pageIndex: number;
		pageSize: number;
		totalPages: number;
		totalCount: number;
	};
	data: T[];
};
