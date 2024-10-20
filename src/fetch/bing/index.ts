import { SearchResult } from "../../types/searchResult";
import { ResponseMapper } from "./responseMapper";

const endpoint = "https://k47io3f7exao7prtrzaqqknx7y0nkqml.lambda-url.us-west-1.on.aws/"

export async function fetchBing(query: string, offset: number = 0): Promise<SearchResult[]> {
    const url = endpoint + `?query=${query}&offset=${offset}`
    const response = await fetch(url, {method: "GET"})
    const result = await response.json()
    const responseMapper = new ResponseMapper(result, query)
    const data = responseMapper.convert()
    return data
}