export type SearchResult = {
    keyword: string;
    resultIndex: number;
    title: string;
    url: string;
    snippet: string;
    searchAt?: number;
    memo?: string
}