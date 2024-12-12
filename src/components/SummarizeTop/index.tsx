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
            <h1>記事のタイトルを選んでください</h1>
            <p>
                React, JavaScript, TypeScript, Go, Python, HTML, CSS は、記事を自動生成できます
                <br/><br/>
                記事のタイトルを押して、メールアドレスを送信すれば、生成した記事を返信いたします。
                <br/><br/>
                <small>
                    最大で１週間かかります
                    <br/>
                    内容によってはお答えできない場合があります
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