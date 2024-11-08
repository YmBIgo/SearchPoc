import { Purpose } from "./purpose";
import { SearchResult } from "./searchResult"

export type Thought = {
    key: string;
    searches: SearchResult[];
    purpose: Purpose;
    memo?: string;
    createdAt: number;
    updatedAt: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isThoughtArrayType (data: any) {
    if (!Array.isArray(data)) return false
    return data.every((d) => {
        const sortedObject = Object.keys(d).sort()
        return (
            sortedObject[0] === "createdAt" &&
            sortedObject[1] === "key" &&
            sortedObject[2] === "purpose" &&
            sortedObject[3] === "searches" &&
            sortedObject[4] === "updatedAt"
        )
    })
}