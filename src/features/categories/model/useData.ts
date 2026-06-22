import { useQuery } from '@tanstack/react-query';
import { findAll, findOne, searchCategories } from './http';

export const CATEGORY_KEYS = {
    all: ['categories'] as const,

    lists: () => [...CATEGORY_KEYS.all, 'list'] as const,
    list: (params: { page: number; limit: number }) =>
        [...CATEGORY_KEYS.lists(), params] as const,

    searches: () => [...CATEGORY_KEYS.all, 'search'] as const,
    search: (params: {
        search: string;
        page: number;
        limit: number;
    }) => [...CATEGORY_KEYS.searches(), params] as const,

    details: () => [...CATEGORY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...CATEGORY_KEYS.details(), id] as const,
};

export const useCategoriesList = (
    params: { page: number; limit: number } = {
        page: 1,
        limit: 20,
    },
) => {
    return useQuery({
        queryKey: CATEGORY_KEYS.list(params),
        queryFn: () => findAll(params),
        placeholderData: (previousData) => previousData,
    });
};

export const useCategoriesSearch = (
    params: {
        search: string;
        page: number;
        limit: number;
    },
) => {
    return useQuery({
        queryKey: CATEGORY_KEYS.search(params),
        queryFn: () => searchCategories(params),
        enabled: !!params.search.trim(),
        placeholderData: (previousData) => previousData,
    });
};

export const useCategoryDetail = (id: string) => {
    return useQuery({
        queryKey: CATEGORY_KEYS.detail(id),
        queryFn: () => findOne(id),
        enabled: !!id,
    });
};