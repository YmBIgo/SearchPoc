import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { mediaQuery, useMediaQuery } from "../../hooks/useMediaQuery"

/*
 * SP
 */
const section0LeftSP = {
    width: "95%"
}
const section1ExplainSP = {
    fontSize: "16px",
    lineHeight: "36px"
}
const section2MainSP = {
    transform: "rotate(-8deg)",
    marginTop: "-46px"
}
/*
 * PC
 */
const mainSection = {
    backgroundColor: "#DDDDDD80",
}
// section 0
const section0 = {
    padding: "20px 20px 60px",
    display: "flex"
}
const section0Left = {
    width: "45%"
}
const section0LeftTitle = {
    fontSize: "64px",
    marginBottom: "10px"
}
const section0LeftSmallTitle = {
    fontSize: "32px",
    lineHeight: "51px"
}
const section03000yen = {
    color: "white",
    backgroundColor: "black",
    padding: "5px 10px 0",
    margin: "0 5px"
}
const section0LeftContent = {
    fontSize: "24px",
    lineHeight: "46px"
}
const section0Right = {
    width: "55%"
}
const section0Hr = {
    marginTop: "0px",
    transform: "rotate(10deg)",
}
const section0Hr2 = {
    marginTop: "50px",
    transform: "rotate(-5deg)"
}
// section 1
const section1 = {
    textAlign: "center",
    padding: "46px 20px 10px"
}
const section1Title = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 40px",
    width: "fit-content",
    fontSize: "26px",
    lineHeight: "0px",
    margin: "-20px auto"
}
const section1WhyExplain = {
    fontSize: "30px",
    lineHeight: "64px",
    marginBottom: "0px"
}
const section1Hr = {
    width: "200px"
}
const section1Explain = {
    fontSize: "16px",
    lineHeight: "26px"
}
const section1ExplainSmall = {
    color: "#AAAAAA",
}
// section 2
const section2Wrapper = {
    height: "350px"
}
const section2 = {
    backgroundColor: "#333",
    height: "240px",
    width: "calc(80% - 160px)",
    marginLeft: "-20%",
    marginTop: "30px",
    transform: "rotate(8deg)",
    color: "white",
    padding: "30px calc(20% + 100px)"
}
const section2Main = {
    transform: "rotate(-8deg)",
    marginTop: "-40px"
}
const section2Title = {
    fontSize: "35px",
}

// section 3
const section3 = {
    padding: "60px 20px 60px"
}
const section3Main = {
    display: "flex",
    gap: "4%",
    margin: "60px 20px 0px"
}
const section3MainContent = {
    border: "1px solid black",
    width: "31%",
    padding: "10px 10px",
    textAlign: "center",
    borderRadius: "10px"
}
const section3MainTitle = {
    fontSize: "22px",
    marginBottom: "30px",
    marginTop: "30px",
    lineHeight: "0px",
}
// section 4
const section4 = {
    fontSize: "64px",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: "30px",
    paddingTop:"30px",
    backgroundColor: "#333",
    color: "white"
}

const LP2 = () => {
    const isSp = useMediaQuery(mediaQuery.sp)
    if(isSp) {
        return(
        <Box sx={mainSection}>
            <Box sx={section0}>
                <Box sx={section0LeftSP}>
                    <h1 style={{...section0LeftTitle}}>
                        CoffeeCup
                    </h1>
                    <h3 style={{...section0LeftSmallTitle}}>
                        記事を自動生成して、
                        <br/>
                        Amazonギフト<span style={section03000yen}>3000円</span>獲得！
                    </h3>
                    <p style={{...section0LeftContent}}>
                        <ModeEditOutlineIcon/> <strong><a href="#why" style={{color:"black"}}>Why?</a></strong>
                        <br/>
                        <ModeEditOutlineIcon/> <strong><a href="#overview" style={{color:"black"}}>概要{"　"}Overview</a></strong>
                        <br/>
                        <ModeEditOutlineIcon/> <strong><a href="#participate" style={{color:"black"}}>参加方法{"　"}How to participate</a></strong>
                    </p>
                </Box>
            </Box>
            <hr style={section0Hr}/>
            <hr style={section0Hr2}/>
            <Box sx={{...section1, paddingBottom: "0px"}}>
                <Box sx={section1Title}>
                    <h3 id="why">Why？</h3>
                </Box>
                <h5 style={section1WhyExplain}>
                    あなたの<span style={section03000yen}>履歴書・職務経歴書</span>は技術力をアピールできてますか？
                    <br/>
                    書類だけでは、本当の技術力が伝わるか分からなくて心配・・・
                    <br/>
                    その心配を解消するために、<span style={section03000yen}>技術力の証拠</span>をアピールしませんか？
                    <hr style={section1Hr}/>
                    この検索エンジンは、あなたの検索履歴から技術記事を自動生成します
                    <br/>
                    企業様にアピールしたい技術の記事を<span style={section03000yen}>自動生成</span>して、
                    <br/>
                    <span style={section03000yen}>技術的な根拠のある職務経歴書</span>を作りましょう！
                </h5>
                <br/><br/>
                <Box sx={section1Title}>
                    <h3 id="overview">概要{"　"}Overview</h3>
                </Box>
                <br/>
                <h5 style={section1WhyExplain}>
                    エンジニアのあなたが、
                    <br/>
                    <Link to="/">検索エンジン CoffeeCup</Link>を使い業務の技術を調べ直し、
                    <br/>
                    技術記事を３つ生成すれば、
                    <br/>
                    <span style={section03000yen}>先着順5名様の方にAmazonギフト3000円分</span>を差し上げるキャンペーンです
                </h5>
                <h5 style={section1ExplainSP}>
                    <small style={section1ExplainSmall}>
                        当選者が５人決まった当日中に３記事生成すれば、先着から外れても1000円分のAmazonギフトを差し上げます
                        <br/>
                        React, JavaScript, TypeScript, Go, Python, HTML, CSS 以外は対応していません
                        <br/>
                        似たような内容を記事として自動生成するのはお控えください
                        <br/>
                        １名様につき１回のみとなります
                    </small>
                </h5>
            </Box>
            <Box sx={section2Wrapper}>
                <Box sx={{...section2, padding: "50px calc(20% + 20px)", width: "calc(100% - 70px)"}}>
                    <Box sx={{...section2MainSP, width: "400px"}}>
                        <h3 style={section2Title}>検索エンジン CoffeeCup とは？</h3>
                        <p style={{lineHeight: "24px"}}>
                            エンジニアが検索するだけで、技術記事が自動生成される検索エンジンです
                            <br/>
                            業務中に使えば、記事を書くのに必要な自由時間が大幅に削減できます
                            <br/>
                            <small>※：記事はChatGPTを使って検索履歴から自動生成されます</small>
                        </p>
                    </Box>
                </Box>
            </Box>
            <hr style={{...section0Hr, marginTop: "50px"}}/>
            <hr style={section0Hr2}/>
            <Box sx={section3}>
                <Box sx={section1Title}>
                    <h3 id="participate">参加方法</h3>
                </Box>
                <br/>
                <Box sx={{...section3Main, flexFlow: "column", margin: "30px 20px 20px"}}>
                    <Box sx={{...section3MainContent, width: "100%", marginBottom: "30px"}}>
                        <h5 style={section3MainTitle}>１：検索する</h5>
                        <p style={{lineHeight: "30px", textAlign: "left"}}>
                            <span style={section03000yen}>業務中に調べた技術ノウハウ</span>を、この検索エンジンで調べ直しましょう。
                            <br/>
                            BingとChatGPTでの検索が可能です。
                            <br/>
                            検索するときは、<span style={section03000yen}>必ず記事のタイトルを入力するか選択する</span>必要があります
                            <br/>
                            <Button variant="contained" sx={{mt: "10px"}}>
                                <Link to="/search" style={{color: "white"}}>こちらのページから検索</Link>
                            </Button>
                        </p>
                    </Box>
                    <Box sx={{...section3MainContent, width: "100%", marginBottom: "30px"}}>
                        <h5 style={section3MainTitle}>２：自動記事生成を依頼</h5>
                        <p style={{lineHeight: "30px", textAlign: "left"}}>
                            入力した記事のタイトルから、記事を作る依頼をしましょう
                            <br/>
                            依頼するには、<span style={section03000yen}>メールアドレスと記事の内容のメモを入力</span>する必要があります
                            <br/>
                            <Button variant="contained" sx={{mt: "10px"}}>
                                <Link to="/summarize" style={{color: "white"}}>こちらから記事のタイトルを選択し依頼</Link>
                            </Button>
                        </p>
                    </Box>
                    <Box sx={{...section3MainContent, width: "100%"}}>
                        <h5 style={section3MainTitle}>３：記事生成とツイート</h5>
                        <p style={{lineHeight: "30px", textAlign: "left"}}>
                            記事を複数件生成の依頼したら、<a href="mailto:coffeecupjapan@yahoo.co.jp">管理者</a>に記事を３件依頼した旨を連絡ください
                            <br/>
                            管理者が内容を確認したら、<span style={section03000yen}>記事を３件生成したツイート</span>をしていただければ、先着順で3000円のAmazonギフト券を送ります
                        </p>
                    </Box>
                </Box>
            </Box>
            <Box sx={section4}>
                皆様のご参加をお待ちしております！
            </Box>
        </Box>
        )
    }
    return(
        <Box sx={mainSection}>
            <Box sx={section0}>
                <Box sx={section0Left}>
                    <h1 style={{...section0LeftTitle}}>
                        CoffeeCup
                    </h1>
                    <h3 style={{...section0LeftSmallTitle}}>
                        記事を自動生成して、
                        <br/>
                        Amazonギフト<span style={section03000yen}>3000円</span>獲得！
                    </h3>
                    <p style={{...section0LeftContent}}>
                        <ModeEditOutlineIcon/> <strong><a href="#why" style={{color:"black"}}>Why?</a></strong>
                        <br/>
                        <ModeEditOutlineIcon/> <strong><a href="#overview" style={{color:"black"}}>概要{"　"}Overview</a></strong>
                        <br/>
                        <ModeEditOutlineIcon/> <strong><a href="#participate" style={{color:"black"}}>参加方法{"　"}How to participate</a></strong>
                    </p>
                </Box>
                <Box sx={section0Right}>
                    <img
                        src="https://google-poc.s3.us-west-1.amazonaws.com/image/cafe.jpg"
                        style={{width: "95%", borderRadius: "35px", marginTop: "100px"}}
                    />
                </Box>
            </Box>
            <hr style={section0Hr}/>
            <hr style={section0Hr2}/>
            <Box sx={section1}>
                <Box sx={section1Title}>
                    <h3 id="why">Why？</h3>
                </Box>
                <h5 style={section1WhyExplain}>
                    あなたの<span style={section03000yen}>履歴書・職務経歴書</span>は技術力をアピールできてますか？
                    <br/>
                    書類だけでは、本当の技術力が伝わるか分からなくて心配・・・
                    <br/>
                    その心配を解消するために、<span style={section03000yen}>技術力の証拠</span>をアピールしませんか？
                    <hr style={section1Hr}/>
                    この検索エンジンは、あなたの検索履歴から記事を自動生成します
                    <br/>
                    企業様にアピールしたい技術の記事を<span style={section03000yen}>自動生成</span>して、
                    <br/>
                    <span style={section03000yen}>技術的な根拠のある職務経歴書</span>を作りましょう！
                </h5>
                <br/><br/>
                <Box sx={section1Title}>
                    <h3 id="overview">概要{"　"}Overview</h3>
                </Box>
                <h5 style={section1WhyExplain}>
                    ITエンジニアが、<span style={section03000yen}>検索履歴から記事を自動生成</span>する検索エンジン
                    <br/>
                    <Link to="/">CoffeeCup</Link>を使い、IT系技術記事を３つ生成すれば、
                    <br/>
                    <span style={section03000yen}>先着順5名様にAmazonギフト3000円分</span>を差し上げるキャンペーンです
                </h5>
                <h5 style={section1Explain}>
                    <small style={section1ExplainSmall}>
                        当選者が５人決まった当日中に３記事生成すれば、先着から外れても1000円分のAmazonギフトを差し上げます
                        <br/>
                        React, JavaScript, TypeScript, Go, Python, HTML, CSS 以外は対応していません
                        <br/>
                        似たような内容を記事として自動生成するのはお控えください
                        <br/>
                        １名様につき１回のみとなります
                    </small>
                </h5>
            </Box>
            <Box sx={section2Wrapper}>
                <Box sx={section2}>
                    <Box sx={section2Main}>
                        <h3 style={section2Title}>検索エンジン CoffeeCup とは？</h3>
                        <p style={{lineHeight: "30px"}}>
                            エンジニアが検索するだけで、技術記事が自動生成される検索エンジンです
                            <br/>
                            業務中に使えば、記事を書くのに必要な自由時間が大幅に削減できます
                            <br/>
                            <small>※：記事はChatGPTを使って検索履歴から自動生成されます</small>
                        </p>
                        <img
                            src="https://google-poc.s3.us-west-1.amazonaws.com/image/shortcut.png"
                            style={{width: "450px", marginLeft: "387px", marginTop: "-30px"}}
                        />
                    </Box>
                </Box>
            </Box>
            <hr style={{...section0Hr, marginTop: "80px"}}/>
            <hr style={section0Hr2}/>
            <Box sx={section3}>
                <Box sx={section1Title}>
                    <h3 id="participate">参加方法{"　"}How to participate</h3>
                </Box>
                <Box sx={section3Main}>
                    <Box sx={section3MainContent}>
                        <h5 style={section3MainTitle}>１：技術を検索しなおす</h5>
                        <p style={{lineHeight: "30px", textAlign: "left"}}>
                            <span style={section03000yen}>業務中に調べた技術ノウハウ</span>をこの検索エンジンで調べ直しましょう。
                            <br/>
                            BingとChatGPTでの検索が可能です。
                            <br/>
                            検索するときは、<span style={section03000yen}>必ず記事のタイトルを入力するか選択する</span>必要があります
                            <br/>
                            <Button variant="contained" sx={{mt: "10px"}}>
                                <Link to="/search" style={{color: "white"}}>こちらのページから検索</Link>
                            </Button>
                        </p>
                    </Box>
                    <Box sx={section3MainContent}>
                        <h5 style={section3MainTitle}>２：自動記事生成を依頼</h5>
                        <p style={{lineHeight: "30px", textAlign: "left"}}>
                            記事のタイトルを選んで、記事を作る依頼をしましょう
                            <br/>
                            依頼するには、<span style={section03000yen}>メールアドレスと記事の内容のメモを入力</span>する必要があります
                            <br/>
                            <Button variant="contained" sx={{mt: "10px"}}>
                                <Link to="/summarize" style={{color: "white"}}>こちらから記事のタイトルを選択し依頼</Link>
                            </Button>
                        </p>
                    </Box>
                    <Box sx={section3MainContent}>
                        <h5 style={section3MainTitle}>３：記事生成とツイート</h5>
                        <p style={{lineHeight: "30px", textAlign: "left"}}>
                            記事を複数件生成の依頼したら、<a href="mailto:coffeecupjapan@yahoo.co.jp">管理者</a>に記事を３件依頼した旨を連絡ください
                            <br/>
                            管理者が内容を確認したら、<span style={section03000yen}>記事を３件生成したツイート</span>をしていただければ、先着順で3000円のAmazonギフト券を送ります
                        </p>
                    </Box>
                </Box>
            </Box>
            <Box sx={section4}>
                皆様のご参加をお待ちしております！
            </Box>
        </Box>
    )
}

export default LP2