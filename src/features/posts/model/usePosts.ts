import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { PostListQuery } from "./types-paginated-posts";
import {
    addPostView,
    getAllPosts,
    getPopularPosts,
    subscribeToBlog,
    unsubscribeFromBlog,
    getLatestPosts,
    getPost,
    searchPosts,
} from "./api";
import { Post } from "./types";


export const postKeys = {
    one: (id: string) => [
        "post",
        id,
    ],

    latest: [
        "latest-posts",
    ],

    search: (searchTerm: string) => [
        "posts-search",
        searchTerm,
    ],
};

export const postQueries = {
    latest: () => queryOptions({ queryKey: postKeys.latest, queryFn: getLatestPosts }),
    list: (query: PostListQuery) => queryOptions({ queryKey: ["posts", query], queryFn: () => getAllPosts(query) }),
    popular: () => queryOptions({ queryKey: ["posts", "popular"], queryFn: getPopularPosts, staleTime: 5 * 60 * 1000 }),
};


export const usePost = (idOrSlug?: string, initialPost?: Post) => {
    const {
        data: post,
        isLoading: isLoadingPost,
    } = useQuery<Post | undefined>({
        queryFn: () => getPost(idOrSlug!),
        queryKey: postKeys.one(idOrSlug!),
        enabled: !!idOrSlug,
        initialData: initialPost,
        retry: false,
    });


    return {
        post,
        isLoadingPost,

    };
};



export const usePostList = (query: PostListQuery, enabled = true) =>
    useQuery({
        ...postQueries.list(query),
        placeholderData: (previous) => previous,
        enabled,
    });

export const usePopularPosts = () =>
    useQuery(postQueries.popular());

export const usePostView = (id?: string) => {
    const counted = useRef<string | null>(null);
    useEffect(() => {
        if (!id || counted.current === id) return;
        counted.current = id;
        addPostView(id).catch(() => undefined);
    }, [id]);
};

export const useBlogSubscription = () => useMutation({ mutationFn: subscribeToBlog });

export const useUnsubscribe = () => useMutation({ mutationFn: unsubscribeFromBlog });

export const useLatestPosts = () => {
    return useQuery(postQueries.latest());
};



export const useSearchPosts = (
    searchTerm: string,
) => {
    return useQuery({
        queryFn: () => searchPosts(searchTerm),
        queryKey: postKeys.search(searchTerm),
        enabled: !!searchTerm.trim(),
    });
};
