export type QueryType = {
    OpenAi: string;
    message: string;
}

export class QueryBuilder {
    private query: QueryType;
    constructor() {
        this.query = {} as QueryType
    }
    setOpenAi(openai: string) {
        this.query.OpenAi = openai
    }
    setMessage(message: string) {
        this.query.message = message
    }
    build() {
        return JSON.stringify(this.query)
    }
}