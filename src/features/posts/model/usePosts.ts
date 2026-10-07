import { useMutation, useQuery } from "@tanstack/react-query";
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
        queryFn: () => getAllPosts(query),
        queryKey: ["posts", query],
        placeholderData: (previous) => previous,
        enabled,
    });

export const usePopularPosts = () =>
    useQuery({ queryFn: getPopularPosts, queryKey: ["posts", "popular"], staleTime: 5 * 60 * 1000 });

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
    return useQuery({
        queryFn: getLatestPosts,
        queryKey: postKeys.latest,
    });
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
