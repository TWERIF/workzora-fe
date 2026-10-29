import { dehydrate, QueryClient, type DehydratedState } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const PREFETCH_TIMEOUT_MS = 4000;

export interface PrefetchedProps {
    dehydratedState: DehydratedState;
}

export const withTimeout = <T,>(promise: Promise<T>, ms = PREFETCH_TIMEOUT_MS): Promise<T | undefined> => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<undefined>((resolve) => {
        timer = setTimeout(() => resolve(undefined), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

export const createServerQueryClient = () =>
    new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 60 * 1000 } } });

export const isNotFoundError = (error: unknown) =>
    isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 400);

export type Loaded<T> = { notFound: true } | { notFound: false; data: T | undefined };

export const loadOrNotFound = async <T,>(promise: Promise<T>): Promise<Loaded<T>> => {
    try {
        return { notFound: false, data: await withTimeout(promise) };
    } catch (error) {
        if (isNotFoundError(error)) return { notFound: true };
        return { notFound: false, data: undefined };
    }
};

export const prefetch = async (client: QueryClient, tasks: Promise<unknown>[] = []): Promise<PrefetchedProps> => {
    await Promise.all(tasks.map((task) => withTimeout(task.catch(() => undefined))));
    const dehydratedState: DehydratedState = JSON.parse(JSON.stringify(dehydrate(client)));
    return { dehydratedState };
};
