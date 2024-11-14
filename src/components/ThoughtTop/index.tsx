import { useState, useEffect } from "react"
import {
    Box,
    Button,
    List,
    ListItemButton
} from "@mui/material"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { Thought, isThoughtArrayType } from "../../types/thought"
import { SEARCH_THOUGHTS } from "../../const/localstorage"
import { initLocalStorage } from "../../helper/localstorage"
import { Link } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { mediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";

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
    const isSp = useMediaQuery(mediaQuery.sp)
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
    if (isSp) {
        return(
          <Box>
            <p>SP未対応です<br/>PCでお使いください</p>
            <Button variant="contained">
              <Link to="/" style={{color: "white"}}>トップに戻る</Link>
            </Button>
          </Box>
        )
    }
    return (
        <Box sx={container}>
            <h1>検索足跡一覧</h1>
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
                                    検索キーワード : {searchKeywords.join(", ")}
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