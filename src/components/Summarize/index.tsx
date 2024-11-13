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
    TextField
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
const sendTextField = {
    width: "100%"
}

const Summarize = () => {
    const [purpose, setPurpose] = useState<Purpose | null>(null)
    const [selectedSearchResult, setSelectedSearchResult] = useState<SearchResult[]>([])
    const { id } = useParams<{id: string}>()
    const navigate = useNavigate()
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
            navigate("/search")
        } catch(e) {
            console.log(e)
            initLocalStorage(SEARCH_THOUGHTS)
            navigate("/search")
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
                [検索足跡をまとめる] 目的 : {purpose.title}
            </h1>
            <p>
                役に立った検索履歴を選択してください
            </p>
            <Box sx={container}>
                <Box sx={containerSection}>
                    <h3>検索履歴 {selectedSearchResult.length}/{purpose.searchResult.length} 選択中</h3>
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
                                            タイトル : {sr.title}
                                            <br/><br/>
                                            <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                                            { sr.url.startsWith("https://chatgpt.com/")
                                            ? <>ChatGPT</>
                                            : <>検索キーワード</>
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
                                                詳細を見る
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                スニペット : {
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
                    <h3>選択された検索足跡</h3>
                    <List>
                        {selectedSearchResult.map((ssr) => {
                            return (
                                <ListItemButton sx={searchResultItem}>
                                    <Box>
                                        <InsertDriveFileIcon sx={{color: "#888", mr: "10px", mb: "-5px"}}/>
                                        タイトル : {ssr.title}
                                    </Box>
                                    <Box>
                                        <SearchIcon sx={{mr: "10px", mb: "-8px"}}/>
                                        { ssr.url.startsWith("https://chatgpt.com/")
                                        ? <>ChatGPT</>
                                        : <>検索キーワード</>
                                        } : {ssr.keyword}
                                    </Box>
                                    <Box>
                                        URL：{ssr.url}
                                    </Box>
                                    <Box sx={sendTextFieldArea}>
                                        <TextField
                                            sx={sendTextField}
                                            onChange={(e) => onChangeSearchMemo(e, ssr)}
                                            placeholder="ChatGPTに記事を書かせるために説明を加えましょう"
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
                送信する
            </Button>
        </>
    )
}

export default Summarize