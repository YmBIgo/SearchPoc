import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const contaner = {
    marginTop: "10px"
}

const Usage = () => {
    return (
        <Box sx={contaner}>
            <h1>What is it ?</h1>
            <hr/>
            <p style={{lineHeight: "25px"}}>
                This site Poodle is Search engine accelerate your speed to write technical articles.
                <br/>
                We provide environment which accelerate your speed to write articles, especially for IT Startups.
            </p>
            <h1>What is different?</h1>
            <hr/>
            <p style={{lineHeight: "25px"}}>
                Usually we spend more than 1 hour to write your technical articles. It is taking more time when contents become difficult.
                <br/>
                This search engine accelerate this writing process of your technical articles.
                <br/>
                In your work, this search engine would remember your search history. And using this search history, ChatGPT will auto-generate article, so time spent for writing articles become one third.
                <br/>
                Let use this search engine for work, and accelerate your process to write articles.
            </p>
            <h1>Usage</h1>
            <hr/>
            <h3>1 : Search</h3>
            <p style={{lineHeight: "25px"}}>
                Before Search, you have to write why you search.
                <br/>
                This would not spend so many time. Just write down your thoughts.
            </p>
            <h3>2 : Send request to auto-generate article</h3>
            <p>
                After finishing search, <Button size="small" variant="contained"><Link to="/summarize" style={{color: "white"}}>From this page</Link></Button> select purpose and request for auto-generate article.
                <br/><br/>
                <span style={{color: "red", lineHeight: "24px"}}>
                    <strong>
                        Currently, topics related to React, JavaScript, TypeScript, Go, Python, HTML, CSS is supported.
                    </strong>
                </span>
            </p>
            <Accordion>
            <AccordionSummary>If You are searching for topic which is not supported...</AccordionSummary>
            <AccordionDetails>
            <h3>3 : Summarize search result</h3>
            <p>
                When your search done, click header "Summarize" and select your search purpose. Choose which search history is valid.
            </p>
            <h3>4 : Using ChatGPT to auto-generate article</h3>
            <p>
                Until now, click header "Search History" and select search history you generate at 2. And Press "Use ChatGPT to write article".
                <br/>
                And article is auto-generated.
            </p>
            <h3>5 : Your Search History is shown in search result</h3>
            <p>
                Your search result is shown in your search result, so you don't have to search the same thing next time.
            </p>
            </AccordionDetails>
            </Accordion>
            <br/>
        </Box>
    )
}

export default Usage