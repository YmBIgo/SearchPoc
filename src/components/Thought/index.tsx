import { useEffect, useState } from "react"
import { Box, CircularProgress, List, ListItemButton } from "@mui/material"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import DOMPurify from "dompurify";

import { Thought, isThoughtArrayType } from "../../types/thought"
import { initLocalStorage } from "../../helper/localstorage"
import { SEARCH_THOUGHTS } from "../../const/localstorage"
import { useParams } from "react-router"
import Markdown from "react-markdown";
import { SearchResult } from "../../types/searchResult";

const container = {
    marginTop: "10px",
}
const itemContent = {
    display: "flex",
    gap: "3%"
}
const itemLeft = {
    width: "80%"
}
const itemRight = {
    width: "17%"
}
const searchResultItem = {
    display:"flex",
    flexFlow: "column",
    alignItems: "flex-start",
    gap: "5px",
    borderBottom: "1px solid #888",
    padding: "10px"
}

const endpoint = "https://k47io3f7exao7prtrzaqqknx7y0nkqml.lambda-url.us-west-1.on.aws/"


const ThoughtComponent = () => {
    const [thought, setThought] = useState<Thought | null>(null)
    const [currentSearch, setCurrentSearch] = useState<SearchResult>()
    const [urlBody, setUrlBody] = useState<string>("")
    const { id } = useParams<{[id: string]: string}>()
    const fetchUrl = async(url: string) => {
        if (!url) return
        const result = await fetch(endpoint + "?openUrl=" + encodeURIComponent(url))
        const textResult = await result.text()
        setUrlBody(DOMPurify.sanitize(textResult, { FORBID_TAGS : ['script', 'meta', 'a'] }))
    }
    useEffect(() => {
        try {
            const localStorageThoughtString = localStorage.getItem(SEARCH_THOUGHTS)
            if (!localStorageThoughtString) throw Error
            const localStorageThought = JSON.parse(localStorageThoughtString)
            if (!isThoughtArrayType(localStorageThought)) throw Error
            const currentThought = localStorageThought.find((lst: Thought) => lst.key === id)
            if (!currentThought) return
            setThought(currentThought)
            setCurrentSearch(currentThought.searches[0])
            fetchUrl(currentThought.searches[0].cachedUrl)
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
            <Box sx={itemContent}>
                <Box sx={itemLeft}>
                    <p>
                        <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                        検索キーワード : {currentSearch?.keyword}
                    </p>
                    { currentSearch?.url.startsWith("https://chatgpt.com")
                    ?
                        <Box>
                            <SchoolIcon sx={{mr: "10px",mb: "-5px"}}/>
                            ChatGPT :
                            <br/>
                            <Markdown>{currentSearch?.snippet}</Markdown>
                        </Box>
                    :   <Box>
                            <Box
                                id="fetchContent"
                                sx={
                                    {
                                        width:"100%",
                                        height:"350px",
                                        overflow: "scroll",
                                        border: "1px solid #CCC",
                                        padding: "10px"
                                    }
                                }
                            >
                                    <div dangerouslySetInnerHTML={{__html: urlBody}}/>
                            </Box>
                            <br/>
                            <a
                                href={currentSearch?.url}
                                target="_blank"
                            >
                                開かなかったり見えない場合はこちらをクリック
                            </a>
                        </Box>
                    }
                    <p>
                        <EditIcon sx={{mr: "10px",mb: "-5px"}}/>
                        メモ：{currentSearch?.memo}
                    </p>
                </Box>
                <Box sx={itemRight}>
                    <p>参考にしたウェブサイト</p>
                    <List>
                        {thought.searches.map((search) => {
                            return (
                                <ListItemButton
                                    sx={searchResultItem}
                                    onClick={() => {
                                        fetchUrl(search?.cachedUrl ?? "")
                                        setCurrentSearch(search)
                                    }}
                                >
                                    <Box>
                                        <InsertDriveFileIcon sx={{color: "#888", mr: "10px", mb: "-5px"}}/>
                                        タイトル :
                                        {search.title}
                                    </Box>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default ThoughtComponent