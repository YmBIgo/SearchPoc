import {useEffect} from "react"
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Top from "./components/Top";
import Summarize from "./components/Summarize";
import SummarizeTop from "./components/SummarizeTop";
import Thought from "./components/Thought";
import ThoughtTop from "./components/ThoughtTop";
import Usage from "./components/Usage";
import { CURRENT_SEARCH_PURPOSE, SEARCH_PURPOSES, SEARCH_THOUGHTS } from "./const/localstorage";
import { initLocalStorage } from "./helper/localstorage";

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
        <Route path="/" element={<Top/>}/>
        <Route path="/index" element={<Top/>}/>
        <Route path="/summarize" element={<SummarizeTop/>} />
        <Route path="/summarize/:id" element={<Summarize/>}/>
        <Route path="/thoughts/:id" element={<Thought/>}/>
        <Route path="/thoughts" element={<ThoughtTop/>}/>
        <Route path="/usage" element={<Usage/>}/>
      </Routes>
    </div>
  )
}

export default App

/* should add below code in dist ...
  <script defer>
    // this hack should be fixed...
    window.addEventListener("load", () => {
      setTimeout(() => document.getElementById("searchEngine2")?.click(), 1000)
    })
  </script>
*/