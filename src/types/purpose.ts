import { SearchResult } from "./searchResult";

export type Purpose = {
    key: string;
    title: string;
    searchResult: SearchResult[];
    updatedAt: number;
    createdAt: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPurposeArrayType (data: any) {
    if (!Array.isArray(data)) return false
    return data.every((d) => {
        const sortedObject = Object.keys(d).sort()
        return(
            sortedObject[0] === "createdAt" &&
            sortedObject[1] === "key" &&
            sortedObject[2] === "searchResult" &&
            sortedObject[3] === "title" &&
            sortedObject[4] === "updatedAt"
        )
    })
}