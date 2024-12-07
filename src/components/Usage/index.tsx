import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const contaner = {
    marginTop: "10px"
}

const Usage = () => {
    return (
        <Box sx={contaner}>
            <h1><a href="https://google-poc.s3.us-west-1.amazonaws.com/Usage.pdf">使い方説明PDFもあります！</a></h1>
            <h1>What is it ?</h1>
            <hr/>
            <p style={{lineHeight: "25px"}}>
                このサイトは、検索履歴からQiitaなど向けの記事を自動生成してくれる検索エンジンのPocです。
                <br/>
                知名度が低く採用活動に困っている ITベンチャー向けに、業務中の検索履歴を使って爆速で技術記事を書く環境を用意いたします。
            </p>
            <h1>What is different?</h1>
            <hr/>
            <p style={{lineHeight: "25px"}}>
                通常 Qiitaの記事を書くのには、手作業だと１〜２時間かかります。それが高度な内容になればなるほど、時間はかかっていくものです。
                <br/>
                この検索エンジンは、そんな時間のかかるQiitaの記事作成を爆速にします。
                <br/>
                業務中の調べ事。その検索履歴をこの検索エンジンは覚えてくれて、その検索履歴から ChatGPT が自動でQiita記事を書いてくれるので、記事作成にかかる自由時間の工数は大幅に短縮されます。
                <br/>
                業務中にこの検索エンジンを使って、あなたの業務中のノウハウを爆速で Qiita記事にしましょう！
            </p>
            <h1>Usage</h1>
            <hr/>
            <h3>1 : 検索する</h3>
            <p style={{lineHeight: "25px"}}>
                検索する前に、記事にするタイトルを入力する必要があります。
                <br/>
                これにはそこまで時間はかかりません。メモと思って何の記事にするか残しましょう。
            </p>
            <h3>2 : 記事作成要望を送る</h3>
            <p>
                検索が終わったら、<Button size="small" variant="contained"><Link to="/summarize" style={{color: "white"}}>このページ</Link></Button> から記事のタイトルを選んで、記事作成要望を出しましょう！
                <br/><br/>
                <span style={{color: "red", lineHeight: "24px"}}>
                    <strong>
                        現在は、React, JavaScript, TypeScript, Go, Python, HTML, CSS のみ対応しています
                    </strong>
                </span>
            </p>
            <Accordion>
            <AccordionSummary>上記が難しい場合はこちらを参照</AccordionSummary>
            <AccordionDetails>
            <h3>3 : 検索結果をまとめる</h3>
            <p>
                検索が済んだら、ヘッダーの「記事を作る」から記事のタイトルを選んで、検索した検索履歴一覧から、妥当だった検索結果を選びメモを残す作業をしてもらいます。
            </p>
            <h3>4 : ChatGPTに検索履歴から記事を自動生成してもらう</h3>
            <p>
                ここまで終わったら、ヘッダーの「検索足跡」から２でまとめた検索履歴を選び、「ChatGPTに記事を書いてもらう」を押します
                <br/>
                これで、記事が自動生成されます。
            </p>
            <h3>5 : 検索足跡が検索結果に出てくる</h3>
            <p>
                あなたがまとめた検索足跡は次の検索の時に出てきますので、同じ内容を再び検索する必要はなくなります。
            </p>
            </AccordionDetails>
            </Accordion>
            <br/>
        </Box>
    )
}

export default Usage