import { useEffect, useState } from "react"
import { Box, CircularProgress, List, ListItemButton } from "@mui/material"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';

import { Thought, isThoughtArrayType } from "../../types/thought"
import { initLocalStorage } from "../../helper/localstorage"
import { SEARCH_THOUGHTS } from "../../const/localstorage"
import { useParams } from "react-router"
import Markdown from "react-markdown";

const container = {
    marginTop: "10px"
}
const searchResultItem = {
    display:"flex",
    flexFlow: "column",
    alignItems: "flex-start",
    gap: "5px",
    borderBottom: "1px solid #888",
    padding: "10px"
}

const ThoughtComponent = () => {
    const [thought, setThought] = useState<Thought | null>(null)
    const { id } = useParams<{[id: string]: string}>()
    useEffect(() => {
        try {
            const localStorageThoughtString = localStorage.getItem(SEARCH_THOUGHTS)
            if (!localStorageThoughtString) throw Error
            const localStorageThought = JSON.parse(localStorageThoughtString)
            if (!isThoughtArrayType(localStorageThought)) throw Error
            const currentThought = localStorageThought.find((lst: Thought) => lst.key === id)
            if (!currentThought) return
            setThought(currentThought)
        } catch(e) {
            initLocalStorage(SEARCH_THOUGHTS)
            console.log(e)
        }
    }, [])
    if (!thought) return <CircularProgress/>
    return (
        <Box sx={container}>
            <h1>検索足跡 : {thought.purpose.title}</h1>
            <h3>どうやって解決するの？</h3>
            <hr/>
            <List>
                {thought.searches.map((search) => {
                    return (
                        <ListItemButton sx={searchResultItem}>
                            <Box>
                                <InsertDriveFileIcon sx={{color: "#888", mr: "10px", mb: "-5px"}}/>
                                タイトル :
                                { search.url.startsWith("https://chatgpt.com")
                                    ? <>{search.title}</>
                                    : <a href={search.url} target="_blank">{search.title}</a>
                                }
                            </Box>
                            <Box>
                                <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                                検索キーワード : {search.keyword}
                            </Box>
                            <Box>
                                <EditIcon sx={{mr: "10px",mb: "-5px"}}/>
                                メモ : {search.memo}
                            </Box>
                            { search.url.startsWith("https://chatgpt.com") &&
                                <Box>
                                    <SchoolIcon sx={{mr: "10px",mb: "-5px"}}/>
                                    ChatGPT :
                                    <br/>
                                    <Markdown>{search.snippet}</Markdown>
                                </Box>
                            }
                        </ListItemButton>
                    )
                })}
            </List>
        </Box>
    )
}

export default ThoughtComponent