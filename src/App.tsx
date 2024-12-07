import {useEffect} from "react"
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Top from "./components/Top";
import Summarize from "./components/Summarize";
import SummarizeTop from "./components/SummarizeTop";
import Thought from "./components/Thought";
import ThoughtTop from "./components/ThoughtTop";
import Usage from "./components/Usage";
import { CURRENT_SEARCH_PURPOSE, SEARCH_PURPOSES, SEARCH_THOUGHTS } from "./const/localstorage";
import { initLocalStorage } from "./helper/localstorage";
import LP from "./components/LP";
import LP2 from "./components/LP2";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import LPBasic from "./components/LPBasic";
import LPResume from "./components/LPResume"

function App() {
  useEffect(() => {
    try {
      if (!localStorage.getItem(SEARCH_PURPOSES)) initLocalStorage(SEARCH_PURPOSES)
      if (!localStorage.getItem(SEARCH_THOUGHTS)) initLocalStorage(SEARCH_THOUGHTS)
      if (!localStorage.getItem(CURRENT_SEARCH_PURPOSE)) initLocalStorage(CURRENT_SEARCH_PURPOSE)
    } catch(e) {
      console.log(e)
    }
  }, [])
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/search" element={<Top/>}/>
        <Route path="/index" element={<Top/>}/>
        <Route path="/summarize" element={<SummarizeTop/>} />
        <Route path="/summarize/:id" element={<Summarize/>}/>
        <Route path="/thoughts/:id" element={<Thought/>}/>
        <Route path="/thoughts" element={<ThoughtTop/>}/>
        <Route path="/usage" element={<Usage/>}/>
        <Route path="/" element={<LP/>}/>
        <Route path="/lp" element={<LP2/>}/>
        <Route path="/lp2" element={<LPBasic/>}/>
        <Route path="/lp3" element={<LPResume/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/terms" element={<Terms/>}/>
      </Routes>
      <hr/>
      <p>Kazuya Kurihara @2024
        {"　"}
        <Link to="/privacy">プライバシーポリシー</Link>
        {"　"}
        <Link to="/terms">利用規約</Link>
        {"　"}
        <a href="https://x.com/mugcup55929" target="_blank">Twitter</a>
        {"　"}
        <a href="mailto:coffeecupjapan@yahoo.co.jp">メール</a></p>
    </div>
  )
}

export default App

/* should add below code in dist ...
  <script defer>
    // this hack should be fixed...
    window.addEventListener("load", () => {
      setTimeout(() => document.getElementById("searchEngine2")?.click(), 1500)
    })
  </script>
*/