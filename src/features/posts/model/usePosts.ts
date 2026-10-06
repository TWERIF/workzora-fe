import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getAllPosts,
    getLatestPosts,
    getPost,
    searchPosts,
} from "./api";
import { Post } from "./types";


export const postKeys = {
    all: (page: number, limit: number) => [
        "posts",
        page,
        limit,
    ],

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



export const usePostList = (
    page: number = 1,
    limit: number = 10,
) => {
    return useQuery({
        queryFn: () => getAllPosts(page, limit),
        queryKey: postKeys.all(page, limit),
    });
};



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
