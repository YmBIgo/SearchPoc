import { Box } from "@mui/material"

const contaner = {
    marginTop: "10px"
}

const Usage = () => {
    return (
        <Box sx={contaner}>
            <h1>What is it ?</h1>
            <hr/>
            <p>This is a Search Engine that can save and review your search ideas.</p>
            <br/>
            <h1>Usage</h1>
            <hr/>
            <h3>1 : Search</h3>
            <p>
                Before search, you have to write or select why you search (The Purpose).
                <br/>
                But it does't take your time too much, just write small memo here.
            </p>
            <h3>2 : Summarize your Search</h3>
            <p>
                When your search is done, you have to summarize your search by clicking summarize button in the header.
                <br/>
                And in this page, What you have to do is just select what you think useful for your search, and click send button.
            </p>
            <h3>3 : Share your Ideas though search</h3>
            <p>
                Your search summarized result can be searched next time, so you don't have to search same thing.
            </p>
            <hr/>
            <h1>I am now making function that can share your ideas with other engineers.</h1>
            <p>Kazuya Kurihara @2024/10/20</p>
        </Box>
    )
}

export default Usage