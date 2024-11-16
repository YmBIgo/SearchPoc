import { useEffect, useState } from "react"
import { Box, Button, CircularProgress, List, ListItemButton, Tab, Tabs } from "@mui/material"
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
    const [chatGPTArticle, setChatGPTArticle] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentTab, setCurrentTab] = useState(0)

    const fetchUrl = async(url: string) => {
        if (!url) return
        const result = await fetch(endpoint + "?openUrl=" + encodeURIComponent(url))
        const textResult = await result.text()
        setUrlBody(DOMPurify.sanitize(textResult, { FORBID_TAGS : ['script', 'meta', 'a'] }))
    }
    const fetchArticle = async() => {
        setIsLoading(true)
        setChatGPTArticle("")
        const flattenSearch = thought?.searches?.map((cs) => {
            let url = cs.url
            if (cs.url.startsWith("https://chatgpt.com")) url = cs.snippet
            return `Keyword : 「${cs.keyword}」\nURL：${url}\nMemo：${cs.memo}`
        }).join(", ") ?? ""
        const body = JSON.stringify({ aiArticle: flattenSearch })
        const result = await fetch(endpoint, {
            method: "POST",
            body
        })
        let textResult = ""
        try {
            textResult = await result.text()
            const parsedTextResult = JSON.parse(textResult)
            textResult = parsedTextResult.value[0]
        } catch (e) {
            console.log(e)
        }
        setChatGPTArticle(textResult)
        setIsLoading(false)
    }
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue)
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
            <h1>Search History : {thought.purpose.title}</h1>
            <Button href="#chatGPT" variant="contained">Use ChatGPT to write article</Button>
            <br/><br/>
            <hr/>
            <h3>How to solve it?</h3>
            <Box sx={itemContent}>
                <Box sx={itemLeft}>
                    <p>
                        <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                        Search Keyword : {currentSearch?.keyword}
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
                                If you can not see page please click here
                            </a>
                        </Box>
                    }
                    <p>
                        <EditIcon sx={{mr: "10px",mb: "-5px"}}/>
                        memo : {currentSearch?.memo}
                    </p>
                </Box>
                <Box sx={itemRight}>
                    <p>websites you refer</p>
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
                                        title :
                                        {search.title}
                                    </Box>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Box>
            </Box>
            <hr/>
            <Box>
                <h3 id="chatGPT">Ask ChatGPT</h3>
                <Button variant="contained" onClick={fetchArticle}>
                    Use ChatGPT to write article
                </Button>
                <br/><br/>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="Display Mode"></Tab>
                    <Tab label="MarkDown Mode"></Tab>
                </Tabs>
                <Box sx={{border: "1px solid black", padding: "10px"}}>
                    {isLoading && <CircularProgress/>}
                    { currentTab === 0
                        ? <Markdown>{chatGPTArticle}</Markdown>
                        : <Box>
                                {chatGPTArticle.split("\n").map((text) => {
                                    return <>{text}<br/></>
                                })}
                            </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ThoughtComponent