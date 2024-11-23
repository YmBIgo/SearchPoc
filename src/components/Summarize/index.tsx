import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import {
    Box,
    Checkbox,
    CircularProgress,
    List,
    ListItemButton,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField,
    Tooltip,
    TextareaAutosize
} from "@mui/material"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { SEARCH_PURPOSES, SEARCH_THOUGHTS } from "../../const/localstorage"
import { initLocalStorage } from "../../helper/localstorage"
import { Purpose, isPurposeArrayType } from "../../types/purpose"
import { Thought, isThoughtArrayType } from "../../types/thought"
import { SearchResult } from "../../types/searchResult";
import { UUIDGeneratorNode2 } from "../../helper/random";

const container = {
    display: "flex",
    flexFlow: "row",
    gap: "2%",
    marginBottom: "10px"
}
const containerSection = {
    display: "flex",
    flexFlow: "column",
    border: "1px solid black",
    width: "49%",
    padding: "0px 15px 10px",
    height: "calc(100vh - 250px)",
    overflow: "scroll",
    borderRadius: "10px"
}
const searchHistoryListItem = {
    borderBottom: "1px solid #888",
    gap: "15px"
}
const searchHistoryListItemRight = {
    display:"flex",
    flexFlow: "column",
    alignItems: "flex-start",
    gap: "10px"
}
const searchResultItem = {
    display:"flex",
    flexFlow: "column",
    alignItems: "flex-start",
    gap: "5px",
    borderBottom: "1px solid #888",
}
const sendButton = {
    width: "50%",
    marginLeft: "25%"
}
const sendTextFieldArea = {
    width: "100%",
    mt: "10px"
}

const endpoint = "https://k47io3f7exao7prtrzaqqknx7y0nkqml.lambda-url.us-west-1.on.aws/"

const Summarize = () => {
    const [purpose, setPurpose] = useState<Purpose | null>(null)
    const [selectedSearchResult, setSelectedSearchResult] = useState<SearchResult[]>([])
    const [email, setEmail] = useState<string>("")
    const [sendStatus, setSendStatus] = useState<string>("")
    const [isTitleEditing, setIsTitleEditing] = useState(false)
    const { id } = useParams<{id: string}>()
    const navigate = useNavigate()
    // top
    const onClickSendEmail = async() => {
        try {
            setSendStatus("Sending...")
            const jsonPurpose = JSON.stringify(purpose)
            const jsonContent = (purpose?.title ?? "Unknown Purpose") + " : \n" + jsonPurpose
            const body = JSON.stringify({
                email,
                aiEmail: jsonContent
            })
            const result = await fetch(endpoint, {
                method: "POST",
                body
            })
            const jsonResult = await result.json()
            const status = jsonResult.result
            setSendStatus(status)
            setEmail("")
        } catch (e) {
            console.log(e)
        }
    }
    // left side event
    const onCheckSearchResult = (e: React.ChangeEvent<HTMLInputElement>, searchResult: SearchResult) => {
        if (e.target.checked) {
            setSelectedSearchResult((prev) => [...prev, searchResult])
            return
        }
        setSelectedSearchResult((prev) => {
            return prev.filter((p) => !(
                p.keyword === searchResult.keyword &&
                p.title === searchResult.title &&
                p.resultIndex === searchResult.resultIndex &&
                p.snippet === searchResult.snippet
            )
            )
        })
    }
    const onClickSpanTitle = () => {
        setIsTitleEditing(true)
        setTimeout(() => document.getElementById("purposeTitle")?.focus(), 200)
    }
    const onClickTextTitle = (e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | Element>) => {
        try {
            const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES)
            if (!localStoragePurposeString) throw Error
            const localStoragePurposes: Purpose[] = JSON.parse(localStoragePurposeString)
            if (!isPurposeArrayType(localStoragePurposes)) throw Error
            const currentPurpose = localStoragePurposes
                .map((p) => {
                    if (p.key === id) return {...p, title: (e.target as HTMLInputElement).value}
                    return p
                })
            localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(currentPurpose))
            const currentSelectedPurpose = currentPurpose.find((p) => p.key === id)
            if (!currentSelectedPurpose) return
            setPurpose(currentSelectedPurpose)
        } catch(e) {
            console.log(e)
        }
    }
    // right side event
    const onChangeSearchMemo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ,searchResult: SearchResult) => {
        setSelectedSearchResult((prev) => {
            return prev.map((p) => {
                if (p.keyword === searchResult.keyword && p.title === searchResult.title) {
                    return {...p, memo: e.target.value}
                }
                return p
            })
        })
    }
    // send button event
    const onClickSend = () => {
        if (!purpose || !selectedSearchResult.length) return
        try {
            const uuid = UUIDGeneratorNode2()
            const now = Date.now()
            const newThought: Thought = {
                key: uuid,
                searches: selectedSearchResult,
                purpose,
                createdAt: now,
                updatedAt: now,
            }
            // add thought
            const localStorageThoughtsString = localStorage.getItem(SEARCH_THOUGHTS)
            if (!localStorageThoughtsString) throw Error
            const localStorageThought = JSON.parse(localStorageThoughtsString)
            if (!isThoughtArrayType(localStorageThought)) throw Error
            const newThoughts = [...localStorageThought, newThought]
            localStorage.setItem(SEARCH_THOUGHTS, JSON.stringify(newThoughts))
            // delete purpose
            const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES)
            if (!localStoragePurposeString) throw Error
            const localStoragePurposes: Purpose[] = JSON.parse(localStoragePurposeString)
            if (!isPurposeArrayType(localStoragePurposes)) throw Error
            const filteredPurpose = localStoragePurposes.filter((p) => !(p.key === id))
            localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(filteredPurpose))
            navigate("/thoughts")
        } catch(e) {
            console.log(e)
            initLocalStorage(SEARCH_THOUGHTS)
            navigate("/thoughts")
        }
    }
    useEffect(() => {
        if (!id) return
        try {
            const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES)
            if (!localStoragePurposeString) throw Error
            const localStoragePurposes: Purpose[] = JSON.parse(localStoragePurposeString)
            if (!isPurposeArrayType(localStoragePurposes)) throw Error
            const currentPurpose = localStoragePurposes.find((p) => p.key === id)
            if (!currentPurpose) return
            setPurpose(currentPurpose)
        } catch(e) {
            console.log(e)
            initLocalStorage(SEARCH_PURPOSES)
        }
    }, [id])
    if (!purpose) return <CircularProgress/>
    return (
        <>
            <h1 style={{marginBottom: "10px"}}>
                [Summarize Search History] Purpose :
                { isTitleEditing
                    ?
                    <TextField
                        defaultValue={purpose.title}
                        sx={{mt: "-10px", width: "300px", ml: "10px"}}
                        onClick={(e) =>{
                            onClickTextTitle(e)
                            setIsTitleEditing(false)
                        }}
                        onBlur={(e) => {
                            onClickTextTitle(e)
                            setIsTitleEditing(false)
                        }}
                        id="purposeTitle"
                    />
                    :
                    <Tooltip title="You can edit by clicking">
                        <span
                            style={{
                                marginLeft: "10px",
                                border: "1px solid #DDD",
                                padding: "10px 20px",
                                borderRadius: "5px"
                            }}
                            onClick={onClickSpanTitle}
                        >
                            {purpose.title}
                        </span>
                    </Tooltip>
                }
            </h1>
            <Box sx={{border: "1px solid #BBBBBB", padding: "10px", maxWidth: "950px", mt: "20px"}}>
                <h3>Press the search objective you want to article, submit your e-mail address, and we will reply with the generated article.</h3>
                <p>
                    <span style={{color: "red", lineHeight: "24px"}}>
                        <strong>
                            Currently only topics related to React, JavaScript, TypeScript, Go, Python, HTML, CSS can be generated.
                            <br/>
                            Please wait other language's support.
                            <br/>
                            <a href="mailto:coffeecupjapan@yahoo.co.jp">Admin</a>will generate articles within 3 days as much as possible, but please be aware that we may not be able to respond in some cases.
                        </strong>
                    </span>
                </p>
                <TextField
                    sx={{width: "500px", mb: "10px"}}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <Button
                    variant="contained"
                    disabled={!email}
                    onClick={onClickSendEmail}
                >
                    Send
                </Button>
                {sendStatus === "OK" && <p>Send Success</p>}
                {sendStatus === "NG" && <p>Send Fail</p>}
            </Box>
            <br/>
            <hr/>
            <p>
                After selecting useful search history, you can manually auto-generate articles.
            </p>
            <Box sx={container}>
                <Box sx={containerSection}>
                    <h3>Search history {selectedSearchResult.length}/{purpose.searchResult.length} Selecting...</h3>
                    <List>
                        {purpose.searchResult.map((sr) => {
                            const date = new Date(sr?.searchAt ?? Date.now()).toISOString()
                            return(
                                <ListItemButton sx={searchHistoryListItem}>
                                    <Checkbox
                                        onChange={(e) => onCheckSearchResult(e, sr)}
                                    />
                                    <Box sx={searchHistoryListItemRight}>
                                        <h3 style={{marginBottom: "5px"}}>
                                            <InsertDriveFileIcon sx={{color: "#888", mr: "10px", mb: "-5px"}}/>
                                            Title : {sr.title}
                                            <br/><br/>
                                            <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                                            { sr.url.startsWith("https://chatgpt.com/")
                                            ? <>ChatGPT</>
                                            : <>Search Keyword</>
                                            } : {sr.keyword}
                                            <br/>
                                        </h3>
                                        <span>@{date}</span>
                                        <span>
                                        Url : <a href={sr.url} target="_blank">{sr.url}</a>
                                        </span>
                                        <Accordion>
                                            <AccordionSummary
                                            expandIcon={<ArrowDropDownIcon />}
                                            >
                                                Show Details
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                Snippet : {
                                                    sr.url.startsWith("https://chatgpt.com")
                                                    ? sr.snippet.slice(0, 500)
                                                    : sr.snippet.slice(0, 100)
                                                }...
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Box>
                <Box sx={containerSection}>
                    <h3>Selected Search History</h3>
                    <List>
                        {selectedSearchResult.map((ssr) => {
                            return (
                                <ListItemButton sx={searchResultItem}>
                                    <Box>
                                        <InsertDriveFileIcon sx={{color: "#888", mr: "10px", mb: "-5px"}}/>
                                        Title : {ssr.title}
                                    </Box>
                                    <Box>
                                        <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                                        { ssr.url.startsWith("https://chatgpt.com/")
                                        ? <>ChatGPT</>
                                        : <>Search Keyword</>
                                        } : {ssr.keyword}
                                    </Box>
                                    <Box>
                                        URL：{ssr.url}
                                    </Box>
                                    <Box sx={sendTextFieldArea}>
                                        <TextareaAutosize
                                            minRows={3}
                                            maxRows={5}
                                            style={{width: "100%", height: "46px"}}
                                            onChange={(e) => onChangeSearchMemo(e, ssr)}
                                            placeholder="Take Memo in order for ChatGPT to write well article"
                                        />
                                    </Box>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Box>
            </Box>
            <Button
                sx={sendButton}
                variant="contained"
                onClick={onClickSend}
            >
                Send
            </Button>
        </>
    )
}

export default Summarize