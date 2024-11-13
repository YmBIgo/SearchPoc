import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

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
    padding: "20px",
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


const LP = () => {
    return(
        <Box>
            <Box sx={section0}>
                <h1>検索履歴を“価値”に変える、検索エンジン</h1>
                <p>検索してまとめるだけで、組織のナレッジを記事に自動変換。エンジニアの知識共有とノウハウの蓄積を次のレベルへ。</p>
                <br/>
                <Button variant="contained">
                    <Link to="/search" style={{color: "white"}}>今すぐ無料で試す！</Link>
                </Button>
            </Box>
            <Box sx={section1}>
                <h2>日常の検索を、組織の資産に</h2>
                <p>この検索エンジンは、業務中の検索履歴を活用し、エンジニアの知見を組織内に蓄積する新しいツールです。ChatGPTによる自動記事生成により、ナレッジ共有が驚くほど簡単に、そして技術広報のスピードも劇的に上がります。</p>
            </Box>
            <Box sx={section2}>
                <h2 style={{textAlign: "center"}}>エンジニア組織で、<br/>こんな「課題」や「悩み」ありませんか？</h2>
                <br/>
                <Box sx={section2Main}>
                    <Box sx={section2Memo}>
                        <span style={{fontSize: "30px"}}>#</span>
                        <br/>
                        採用活動のために、エンジニアに記事を書かせたいが
                        <br/>
                        記事作成に時間が取れず、なかなか定着しない
                    </Box>
                    <Box sx={section2Memo}>
                        <span style={{fontSize: "30px"}}>##</span>
                        <br/>
                        エンジニアの転職リスクがあるので、
                        <br/>
                        ノウハウをためたいが、なかなかたまらない。
                    </Box>
                    <Box sx={section2Memo}>
                        <span style={{fontSize: "30px"}}>###</span>
                        <br/>
                        エンジニアの能力を標準化したいが、
                        <br/>
                        暗黙知の部分が多くなかなか能力を標準化できない
                    </Box>
                </Box>
            </Box>
            <Box sx={section3}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>この検索エンジンなら。</h2>
                <Box sx={section3Main}>
                    <Box sx={section3Memo}>
                        <h3 style={{fontSize: "30px", textAlign: "center"}}>記事作成 3倍速</h3>
                        <p>
                            質の高い記事作成にかかる自由時間を削減します
                            <br/>
                            質の高い記事作成を、業務のついででAIの助けも借りて、３倍速にしましょう
                        </p>
                    </Box>
                    <Box sx={section3Memo}>
                        <h3 style={{fontSize: "30px", textAlign: "center"}}>ノウハウ 2倍蓄積</h3>
                        <p>
                            コンフルを使ってもたまらなかった知見ノウハウが、たまるようになります
                            <br/>
                            業務の知見をためる組織にして、属人化しない組織にしましょう
                        </p>
                    </Box>
                    <Box sx={section3Memo}>
                        <h3 style={{fontSize: "30px", textAlign: "center"}}>類似検索の効率 1.5倍</h3>
                        <p>
                            一度調べた検索の足跡を再度見れるので、同じことを検索して迷う無駄をなくします
                            <br/><br/>
                            類似する内容の検索を高速化させましょう
                        </p>
                    </Box>
                </Box>
            </Box>
            <hr/>
            <Box sx={section4}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>この検索エンジンの主な機能</h2>
                <p style={{lineHeight: "46px"}}>
                    <strong>検索履歴の自動記事化</strong> - 検索履歴をもとに、組織向けのQiita記事を自動生成。知見の共有とノウハウの蓄積を手軽に実現
                    <br/>
                    <strong>ノウハウの蓄積</strong> - 業務中に得た検索情報を蓄積し、組織内で共有。エンジニアのスキルが属人化することを防ぎます
                    <br/>
                    <strong>履歴検索機能</strong> - 過去の検索履歴を検索可能に。同じ検索方法を繰り返さないことで、組織全体の技術力を底上げ
                </p>
            </Box>
            <Box sx={section4}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>この検索エンジンがもたらす変化</h2>
                <p style={{lineHeight: "46px"}}>
                    <strong>採用活動の効率化</strong> - この検索エンジンによって、エンジニアの記事作成が3倍効率化。採用活動の一環としても、質の高い情報発信が可能に
                    <br/>
                    <strong>ノウハウの共有と標準化</strong> - 転職が多いエンジニアでも、この検索エンジンを使えばノウハウが自動的に蓄積され、次世代への引き継ぎがスムーズに
                </p>
            </Box>
            <Box sx={section4}>
                <h2 style={{textAlign: "center", borderBottom: "2px solid #757ce864", width: "46%", margin: "0 27%", paddingBottom: "10px"}}>利用方法は簡単</h2>
                <ol style={{lineHeight: "46px"}}>
                    <li>検索目的を入力するだけで、検索時に検索履歴を自動的に記録</li>
                    <li>業務の最後に履歴を整理し、重要な情報を選択</li>
                    <li>まとめた検索履歴ページで、ChatGPTに記事作成を依頼</li>
                </ol>
            </Box>
            <Box sx={section0}>
                <h1>検索を未来の資産に変える</h1>
                <Box>
                    <Button variant="contained">
                        <Link to="/search" style={{color: "white"}}>
                            無料で検索してみる！
                        </Link>
                    </Button>
                    <Button variant="contained" color="info" sx={{marginLeft: "10px"}}>
                        <Link to="/usage" style={{color: "white"}}>
                            詳しい使い方はこちら
                        </Link>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LP