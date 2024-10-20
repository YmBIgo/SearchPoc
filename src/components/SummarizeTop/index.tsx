import { useState, useEffect } from "react"
import {
    Box,
    List,
    ListItemButton
} from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';

import { Purpose, isPurposeArrayType } from "../../types/purpose"
import { SEARCH_PURPOSES } from "../../const/localstorage"
import { initLocalStorage } from "../../helper/localstorage"
import { Link } from "react-router-dom";

const container = {
    marginTop: "10px"
}

const SummarizeTop = () => {
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
    return (
        <Box sx={container}>
            <h1>Select Purpose which you want to summarize</h1>
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