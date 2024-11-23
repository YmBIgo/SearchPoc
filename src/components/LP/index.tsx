import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { mediaQuery, useMediaQuery } from "../../hooks/useMediaQuery"

const section0 = {
    padding: "60px 20px",
    textAlign: "center",
    backgroundColor: "#DDDDDD80"
}
const section1 = {
    padding: "40px 20px",
    backgroundColor: "white"
}
const section2 = {
    padding: "20px 20px 40px",
    backgroundColor: "#757ce824"
}
const section2Main = {
    display: "flex",
    gap: "5%",
    marginLeft: "2.5%"
}
const section2Memo = {
    backgroundColor: "white",
    padding: "40px 20px",
    width: "25%",
    boxShadow: "2px 2px 4px"
}
const section3 = {
    padding: "50px 20px 10px"
}
const section3Main = {
    display: "flex",
    gap: "5%",
    marginBottom: "30px",
}
const section3Memo = {
    backgroundColor: "white",
    padding: "10px 0px",
    width: "30%",
}
const section4 = {
    padding: "64px 40px 0px",
    backgroundColor: "white"
}

const section2SP = {
    padding: "20px 20px 40px",
    backgroundColor: "#757ce824"
}
const section2MainSP = {
}
const section2MemoSP = {
    backgroundColor: "white",
    padding: "20px 10px",
    marginBottom: "20px",
    width: "95%",
    boxShadow: "2px 2px 4px"
}
const section3SP = {
    padding: "50px 20px 10px"
}
const section3MainSP = {
    marginBottom: "30px",
}
const section3MemoSP = {
    backgroundColor: "white",
    padding: "10px 0px",
    width: "100%",
}
const section4SP = {
    padding: "64px 10px 0px",
    backgroundColor: "white"
}



const LP = () => {
    const isSp = useMediaQuery(mediaQuery.sp)
    if(isSp) {
        return(
            <Box>
                <Box sx={section0}>
                    <h1>Search Engine<br/>which can auto-generate articles</h1>
                    <p>
                        Automatically convert search histories into articles.
                        <br/>
                        Taking engineers' knowledge sharing and know-how accumulation to the next level.
                    </p>
                    <br/>
                    <Button variant="contained">
                        <Link to="/search" style={{color: "white"}}>Try it for free</Link>
                    </Button>
                    <Button variant="contained" color="info" sx={{marginLeft: "10px"}}>
                        <Link to="/usage" style={{color: "white"}}>
                            Usage here
                        </Link>
                    </Button>
                </Box>
                <Box sx={section1}>
                    <h2>Make everyday searches an asset to your organization</h2>
                    <p>
                        This search engine is a new tool that utilizes search history during work to auto-generate techical articles.
                        <br/>
                        Automatic article generation by ChatGPT makes knowledge sharing incredibly easy and dramatically increases the speed of technical PR.
                    </p>
                </Box>
                <Box sx={section2SP}>
                    <h2 style={{textAlign: "center"}}>
                        Do you have any of these “issues” or “problems”
                        <br/>
                        in your engineering organization?
                    </h2>
                    <br/>
                    <Box sx={section2MainSP}>
                        <Box sx={section2MemoSP}>
                            <span style={{fontSize: "30px"}}>#</span>
                            <br/>
                            Would like to have an engineer write an article for a recruiting campaign and accumulate know-how, but it's hard to do so.
                        </Box>
                        <Box sx={section2MemoSP}>
                            <span style={{fontSize: "30px"}}>##</span>
                            <br/>
                            Since eager to change job, want to write articles,
                            <br/>
                            But Cannot find time to do so.
                        </Box>
                        <Box sx={section2MemoSP}>
                            <span style={{fontSize: "30px"}}>###</span>
                            <br/>
                            Would like to standardize the competence of engineers, though It is difficult to standardize competence due to the large amount of tacit knowledge.
                        </Box>
                    </Box>
                </Box>
                <Box sx={section3SP}>
                    <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "64%", margin: "0 18%", paddingBottom: "10px"}}>この検索エンジンなら。</h2>
                    <Box sx={section3MainSP}>
                        <Box sx={section3MemoSP}>
                            <h3 style={{fontSize: "30px", textAlign: "center"}}>Article creation 3x faster</h3>
                            <p>
                                Reduces the free time required to create quality articles
                                <br/>
                                Triple the speed of quality article writing with the help of AI while on the job!
                            </p>
                        </Box>
                        <Box sx={section3MemoSP}>
                            <h3 style={{fontSize: "30px", textAlign: "center"}}>Know-how Double accumulation</h3>
                            <p style={{position: "relative", color: "#BBBBBB80"}}>
                                Knowledge and know-how that did not accumulate even with confluence will start to accumulate.
                                <br/>
                                Make the organization an organization that holds business knowledge and does not make it a genus.
                                <p style={{position: "absolute", top: "15px", left: "calc(50% - 40px)", color: "black"}}>
                                    <strong>Coming soon...</strong>
                                </p>
                            </p>
                        </Box>
                        <Box sx={section3MemoSP}>
                            <h3 style={{fontSize: "30px", textAlign: "center"}}>Efficiency of similarity search 1.5 times</h3>
                            <p>
                                You can see the footprints of your searches again, so you don't waste time searching for the same thing and getting lost.
                                <br/><br/>
                                Speed up your search for similar content!
                            </p>
                        </Box>
                    </Box>
                </Box>
                <Box sx={section2SP}>
                    <h2 style={{textAlign: "center"}}>Usage 2 steps</h2>
                    <br/>
                    <Box sx={section2MainSP}>
                        <Box sx={section2MemoSP}>
                            <h3>1 : Use this search engine in work</h3>
                            <small>Consumption Time: Normal business hours</small>
                            <p>
                            Use this search engine to make ChatGPT a blast to write articles. You must enter a purpose for your search.
                            </p>
                            <Button variant="contained">
                                <Link to="/search" style={{color: "white"}}>
                                    Search Page
                                </Link>
                            </Button>
                        </Box>
                        <Box sx={section2MemoSP}>
                            <h3>2 : Send request to auto-generate article</h3>
                            <small>Time consumption: 1 minutes per article</small>
                            <p>
                            Select the search purpose for which you would like to submit an article and submit your request for automatic article generation (you must enter your email address).
                            <br/>
                            <a href="mailto:coffeecupjapan@yahoo.co.jp">Admin</a> would auto-generate article using requested data and send back to you.
                            <br/><br/>
                            <span style={{color: "red"}}>Only available on React, JavaScript, TypeScript, Go, Python, HTML, CSS </span>
                            </p>
                            <Button variant="contained">
                                <Link to="/summarize" style={{color: "white"}}>
                                    Summarize Page
                                </Link>
                            </Button>
                        </Box>
                        <Accordion>
                            <AccordionSummary>If you cannot find topic which match your needs.</AccordionSummary>
                            <AccordionDetails>
                            <Box sx={section2MemoSP}>
                                <h3>2 : Summarize Search History</h3>
                                <small>Time consumption: 5 minutes per article</small>
                                <p>
                                The results of 1 are saved as search history, so choose the one that meets your purpose from the history.
                                </p>
                                <Button variant="contained">
                                    <Link to="/summarize" style={{color: "white"}}>
                                        Page which summarize search history
                                    </Link>
                                </Button>
                            </Box>
                            <Box sx={section2MemoSP}>
                                <h3>3 : Let ChatGPT write the article</h3>
                                <small>Time consumption: 5-10 minutes per article</small>
                                <p>
                                    Summarize your search history in 2 will allow ChatGPT to write articles from the search footprint page.
                                </p>
                                <Button variant="contained">
                                    <Link to="/thoughts" style={{color: "white"}}>
                                        Search footprint page for automatic article generation
                                    </Link>
                                </Button>
                            </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>
                <Box sx={section4SP}>
                    <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>Main features of this search engine</h2>
                    <p style={{lineHeight: "39px"}}>
                        <strong>Automatic article conversion of search history</strong> - Automatic generation of technical articles for your organization based on search history. Easy to share knowledge and accumulate know-how.
                        <br/>
                        <strong>Accumulation of know-how (to be implemented)</strong> - Accumulate search information obtained during work and share it within the organization. Prevents the skills of engineers from becoming idiosyncratic.
                        <br/>
                        <strong>History search function</strong> - Enables retrieval of past search history. Raises the technical capabilities of the entire organization by not repeating the same search method.
                    </p>
                </Box>
                <Box sx={section4SP}>
                    <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "80%", margin: "0 10%", paddingBottom: "10px"}}>Changes brought about by this search engine</h2>
                    <p style={{lineHeight: "39px"}}>
                        <strong>Streamlining recruitment activities</strong> - This search engine triples the efficiency of engineers in creating articles. High-quality information can now be disseminated as part of the recruitment process.
                        <br/>
                        <strong>Know-how sharing and standardization</strong> - Even engineers who change jobs frequently can use this search engine to automatically accumulate know-how and smoothly pass it on to the next generation.
                    </p>
                </Box>
                <Box sx={section4SP}>
                    <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>Easy to use</h2>
                    <ol style={{lineHeight: "46px"}}>
                        <li>Enter search purpose and automatically record search history when searching</li>
                        <li>Organize history and select important information at the end of the workday</li>
                        <li>Ask ChatGPT to create an article on the summarized search history page.</li>
                    </ol>
                </Box>
                <Box sx={section0}>
                    <h1>Turn your search into a future asset</h1>
                    <Box>
                        <Button variant="contained">
                            <Link to="/search" style={{color: "white"}}>
                                Try it free
                            </Link>
                        </Button>
                        <Button variant="contained" color="info" sx={{marginLeft: "10px"}}>
                            <Link to="/usage" style={{color: "white"}}>
                                Usage here
                            </Link>
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
    return(
        <Box>
            <Box sx={section0}>
                <h1>Search Engine which can auto-generate articles</h1>
                <p>
                Automatically convert search histories into articles.
                <br/>
                Taking engineers' knowledge sharing and know-how accumulation to the next level.
                </p>
                <br/>
                <Button variant="contained">
                    <Link to="/search" style={{color: "white"}}>Try it free</Link>
                </Button>
                <Button variant="contained" color="info" sx={{marginLeft: "10px"}}>
                    <Link to="/usage" style={{color: "white"}}>
                        Usage here
                    </Link>
                </Button>
            </Box>
            <Box sx={section1}>
                <h2>Make everyday searches an asset to your organization</h2>
                <p>
                    This search engine is a new tool that utilizes search history during work to auto-generate techical articles.
                    <br/>
                    Automatic article generation by ChatGPT makes knowledge sharing incredibly easy and dramatically increases the speed of technical PR.
                </p>
            </Box>
            <Box sx={section2}>
                <h2 style={{textAlign: "center"}}>
                    Do you have any of these “issues” or “problems”
                    <br/>
                    in your engineering organization?
                </h2>
                <br/>
                <Box sx={section2Main}>
                    <Box sx={section2Memo}>
                        <span style={{fontSize: "30px"}}>#</span>
                        <br/>
                        Would like to have an engineer write an article for a recruiting campaign and accumulate know-how, but it's hard to do so.
                    </Box>
                    <Box sx={section2Memo}>
                        <span style={{fontSize: "30px"}}>##</span>
                        <br/>
                        Since eager to change job, want to write articles,
                        <br/>
                        But Cannot find time to do so.
                    </Box>
                    <Box sx={section2Memo}>
                        <span style={{fontSize: "30px"}}>###</span>
                        <br/>
                        Would like to standardize the competence of engineers, though It is difficult to standardize competence due to the large amount of tacit knowledge.
                    </Box>
                </Box>
            </Box>
            <Box sx={section3}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>If you use this search engine...</h2>
                <Box sx={section3Main}>
                    <Box sx={section3Memo}>
                        <h3 style={{fontSize: "30px", textAlign: "center"}}>Article creation 3x faster</h3>
                        <p>
                            Reduces the free time required to create quality articles
                            <br/>
                            Triple the speed of quality article writing with the help of AI while on the job!
                        </p>
                    </Box>
                    <Box sx={section3Memo}>
                        <h3 style={{fontSize: "30px", textAlign: "center"}}>Know-how 2x accumulation</h3>
                        <p style={{position: "relative", color: "#BBBBBB80"}}>
                            Knowledge and know-how that did not accumulate even with confluence will start to accumulate.
                            <br/>
                            Make the organization an organization that holds business knowledge and does not make it a genus.
                            <p style={{position: "absolute", top: "15px", left: "calc(50% - 40px)", color: "black"}}>
                                <strong>Coming soon...</strong>
                            </p>
                        </p>
                    </Box>
                    <Box sx={section3Memo}>
                        <h3 style={{fontSize: "30px", textAlign: "center"}}>Efficiency of similarity search 1.5 times</h3>
                        <p>
                            You can see the footprints of your searches again, so you don't waste time searching for the same thing and getting lost.
                            <br/><br/>
                            Speed up your search for similar content!
                        </p>
                    </Box>
                </Box>
            </Box>
            <Box sx={section2}>
                <h2 style={{textAlign: "center"}}>Usage 2 steps</h2>
                <br/>
                <Box sx={section2Main}>
                    <Box sx={{...section2Memo, width: "45%"}}>
                        <h3>1 : Use this search engine in work</h3>
                        <small>Consumption Time: Normal business hours</small>
                        <p>
                            Use this search engine to make ChatGPT a blast to write articles. You must enter a purpose for your search.
                        </p>
                        <Button variant="contained">
                            <Link to="/search" style={{color: "white"}}>
                                Search Page
                            </Link>
                        </Button>
                    </Box>
                    <Box sx={{...section2Memo, width: "45%"}}>
                        <h3>2 : Send request to auto-generate article</h3>
                        <small>Time consumption: 1 minutes per article</small>
                        <p>
                            Select the search purpose for which you would like to auto-generate an article and submit your request for automatic article generation (you must enter your email address).
                            <br/>
                            <a href="mailto:coffeecupjapan@yahoo.co.jp">Admin</a> would auto-generate article using requested data and send back to you.
                            <br/><br/>
                            <span style={{color: "red"}}>Only available on React, JavaScript, TypeScript, Go, Python, HTML, CSS </span>
                        </p>
                        <Button variant="contained">
                            <Link to="/summarize" style={{color: "white"}}>
                                Summarize Page
                            </Link>
                        </Button>
                    </Box>
                </Box>
                <br/><br/>
                <Accordion sx={{ml: "30px"}}>
                    <AccordionSummary>If you are searching topics which is not supported</AccordionSummary>
                    <AccordionDetails>
                    <Box sx={section2Main}>
                    <Box sx={{...section2Memo, width: "45%"}}>
                        <h3>2 : Summarize Search History</h3>
                        <small>Time consumption: 5 minutes per article</small>
                        <p>
                            The results of 1 are saved as search history, so choose the one that meets your purpose from the history.
                        </p>
                        <Button variant="contained">
                            <Link to="/summarize" style={{color: "white"}}>
                                Summarize Page
                            </Link>
                        </Button>
                    </Box>
                    <Box sx={{...section2Memo, width: "45%"}}>
                        <h3>3 : Let ChatGPT write the article</h3>
                        <small>Time consumption: 5-10 minutes per article</small>
                        <p>
                            Summarize your search history in 2 will allow ChatGPT to write articles from the search footprint page.
                        </p>
                        <Button variant="contained">
                            <Link to="/thoughts" style={{color: "white"}}>
                                Search footprint page for automatic article generation
                            </Link>
                        </Button>
                    </Box>
                </Box>
                <br/>
                </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={section4}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>Main features of this search engine</h2>
                <p style={{lineHeight: "46px"}}>
                    <strong>Automatic article conversion of search history</strong> - Automatic generation of technical articles for your organization based on search history. Easy to share knowledge and accumulate know-how.
                    <br/>
                    <strong>Accumulation of know-how (to be implemented)</strong> - Accumulate search information obtained during work and share it within the organization. Prevents the skills of engineers from becoming idiosyncratic.
                    <br/>
                    <strong>History search function</strong> - Enables retrieval of past search history. Raises the technical capabilities of the entire organization by not repeating the same search method.
                </p>
            </Box>
            <Box sx={section4}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>Changes brought about by this search engine</h2>
                <p style={{lineHeight: "46px"}}>
                    <strong>Streamlining recruitment activities</strong> - This search engine triples the efficiency of engineers in creating articles. High-quality information can now be disseminated as part of the recruitment process.
                    <br/>
                    <strong>Know-how sharing and standardization</strong> - Even engineers who change jobs frequently can use this search engine to automatically accumulate know-how and smoothly pass it on to the next generation.
                </p>
            </Box>
            <Box sx={section4}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>Easy to use</h2>
                <ol style={{lineHeight: "46px"}}>
                    <li>Enter search purpose and automatically record search history when searching</li>
                    <li>Organize history and select important information at the end of the workday</li>
                    <li>Ask ChatGPT to create an article on the summarized search history page.</li>
                </ol>
            </Box>
            <Box sx={section0}>
                <h1>Turn your search into a future asset</h1>
                <Box>
                    <Button variant="contained">
                        <Link to="/search" style={{color: "white"}}>
                            Try it free
                        </Link>
                    </Button>
                    <Button variant="contained" color="info" sx={{marginLeft: "10px"}}>
                        <Link to="/usage" style={{color: "white"}}>
                            Usage here
                        </Link>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LP