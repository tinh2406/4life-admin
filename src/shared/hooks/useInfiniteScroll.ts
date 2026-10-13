import { RefObject, useCallback, useEffect } from "react";

interface UseInfiniteScrollOptions {
	ref: RefObject<HTMLElement | null>;
	hasNextPage?: boolean;
	isFetching?: boolean;
	threshold?: number;
	onLoadMore: () => void;
}

export const useInfiniteScroll = ({
	ref,
	hasNextPage = true,
	isFetching = false,
	threshold = 50,
	onLoadMore
}: UseInfiniteScrollOptions) => {
	const handleScroll = useCallback(() => {
		const el = ref.current;
		if (!el) return;

		const isNearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
		if (isNearBottom && hasNextPage && !isFetching) {
			onLoadMore();
		}
	}, [ref, hasNextPage, isFetching, threshold, onLoadMore]);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		el.addEventListener("scroll", handleScroll);
		return () => el.removeEventListener("scroll", handleScroll);
	}, [ref, handleScroll]);

	return { handleScroll };
};
