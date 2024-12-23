import { SearchResult } from "../../types/searchResult";

export class ResponseMapper {
    private data;
    private keyword;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data: any, keyword: string) {
        this.data = data
        this.keyword = keyword
    }
    convert() {
        return Array.isArray(this.data?.value)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? this.data.value.map((d: any, index: number) => {
            return {
                keyword: this.keyword,
                resultIndex: index,
                title: String(d.name),
                url: String(d.url),
                cachedUrl: String(d.cachedPageUrl),
                snippet: String(d.snippet),
            }
        }) as SearchResult[]
        : []
    }
}