import { SearchResult } from "../../types/searchResult";
import { ResponseMapper } from "./responseMapper";

const endpoint = "https://k47io3f7exao7prtrzaqqknx7y0nkqml.lambda-url.us-west-1.on.aws/"

export async function fetchOpenAi(openAi: string, message: string, query: string): Promise<SearchResult[]> {
    const body = JSON.stringify({openAi, message})
    const url = endpoint
    const response = await fetch(url, {method: "POST", body})
    const result = await response.json()
    const responseMapper = new ResponseMapper(result, query)
    const data = responseMapper.convert()
    return data
}