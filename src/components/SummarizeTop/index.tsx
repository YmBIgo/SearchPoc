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
            <p>SP未対応です<br/>PCでお使いください</p>
            <Button variant="contained">
              <Link to="/" style={{color: "white"}}>トップに戻る</Link>
            </Button>
          </Box>
        )
    }
    return (
        <Box sx={container}>
            <h1>Select search purpose which you want to summarize</h1>
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