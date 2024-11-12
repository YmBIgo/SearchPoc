import { useState, useEffect } from "react"
import {
    Box,
    List,
    ListItemButton
} from "@mui/material"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { Thought, isThoughtArrayType } from "../../types/thought"
import { SEARCH_THOUGHTS } from "../../const/localstorage"
import { initLocalStorage } from "../../helper/localstorage"
import { Link } from "react-router-dom";
import { Edit } from "@mui/icons-material";

const container = {
    marginTop: "10px"
}
const listItem = {
    color: "#333",
    display: "flex",
    flexFlow: "column",
    gap: "10px",
    alignItems: "flex-start"
}

const ThoughtTop = () => {
    const [thoughts, setThoughts] = useState<Thought[]>([])
    useEffect(() => {
        try {
            const localStorageThoughtString = localStorage.getItem(SEARCH_THOUGHTS)
            if (!localStorageThoughtString) throw Error
            const localStorageThought = JSON.parse(localStorageThoughtString)
            if (!isThoughtArrayType(localStorageThought)) throw Error
            setThoughts(localStorageThought)
        } catch(e) {
            initLocalStorage(SEARCH_THOUGHTS)
            console.log(e)
        }
    }, [])
    return (
        <Box sx={container}>
            <h1>All Search History</h1>
            <hr/>
            <List>
                {thoughts.map((thought) => {
                    const searchKeywords = thought.searches.map((s) => s.keyword)
                    return (
                        <Link to={`/thoughts/${thought.key}`} style={{textDecoration: "none"}}>
                            <ListItemButton sx={listItem}>
                                <Box>
                                    <InsertDriveFileIcon sx={{color: "#888", mr: "10px", mb: "-5px"}}/>
                                    {thought.purpose.title}
                                </Box>
                                <Box>
                                    <Edit sx={{mr: "10px", mb: "-5px"}} />
                                    Search Keyword : {searchKeywords.join(", ")}
                                </Box>
                            </ListItemButton>
                        </Link>
                    )
                })}
            </List>
        </Box>
    )
}

export default ThoughtTop