export type SearchResult = {
    keyword: string;
    resultIndex: number;
    title: string;
    url: string;
    snippet: string;
    searchAt?: number;
    cachedUrl?: string;
    memo?: string;
}