import { useState, useEffect } from "react"
import {
    Box,
    Button,
    List,
    ListItemButton
} from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';

import { Purpose, isPurposeArrayType } from "../../types/purpose"
import { SEARCH_PURPOSES } from "../../const/localstorage"
import { initLocalStorage } from "../../helper/localstorage"
import { Link } from "react-router-dom";
import { mediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";

const container = {
    marginTop: "10px"
}

const SummarizeTop = () => {
    const isSp = useMediaQuery(mediaQuery.sp)
    const [purposes, setPurposes] = useState<Purpose[]>([])
    useEffect(() => {
        try {
            const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES)
            if (!localStoragePurposeString) throw Error
            const localStoragePurposes: Purpose[] = JSON.parse(localStoragePurposeString)
            if (!isPurposeArrayType(localStoragePurposes)) throw Error
            setPurposes(localStoragePurposes)
        } catch(e) {
            console.log(e)
            initLocalStorage(SEARCH_PURPOSES)
        }
    }, [])
    if (isSp) {
        return(
          <Box>
            <p>SmartPhone not supported.<br/>Use Desktop.</p>
            <Button variant="contained">
              <Link to="/" style={{color: "white"}}>Top Page</Link>
            </Button>
          </Box>
        )
    }
    return (
        <Box sx={container}>
            <h1>Select search purpose which you want to summarize</h1>
            <p>
                Only topics related to React, JavaScript, TypeScript, Go, Python, HTML, CSS can auto-generate article.
                <br/><br/>
                Press the search objective you want to article, submit your e-mail address, and we will reply with the generated article.
                <br/><br/>
                <small>
                    It may take up to 3 days.
                    <br/>
                    We may not be able to answer your questions depending on the content.
                </small>
            </p>
            <hr/>
            <List>
                {purposes.map((p) => {
                    const date = new Date(p.createdAt).toISOString()
                    return(
                        <Link to={`/summarize/${p.key}`} style={{textDecoration: "none"}}>
                            <ListItemButton sx={{color: "#333", gap: "20px"}}>
                                <FolderIcon sx={{color: "#888"}}/>
                                <h3>{p.title}</h3>
                                <small>{date}</small>
                            </ListItemButton>
                        </Link>
                    )
                })}
            </List>
        </Box>
    )
}

export default SummarizeTop