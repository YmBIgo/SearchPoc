export type QueryType = {
    query: string;
    offset: number;
}

export class QueryBuilder {
    private query: QueryType;
    constructor() {
        this.query = {} as QueryType
    }
    setQuery(query: string) {
        this.query.query = query
    }
    setOffset(offset: number) {
        this.query.offset = offset
    }
    build() {
        return JSON.stringify(this.query)
    }
}