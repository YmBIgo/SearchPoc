import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  Tabs,
  Tab,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

import { fetchBing } from "../../fetch/bing";
import { Purpose, isPurposeArrayType } from "../../types/purpose";
import {
  CURRENT_SEARCH_PURPOSE,
  SEARCH_PURPOSES,
  SEARCH_THOUGHTS,
} from "../../const/localstorage";
import { SearchResult } from "../../types/searchResult";
import { initLocalStorage } from "../../helper/localstorage";
import { UUIDGeneratorNode2 } from "../../helper/random";
import { Thought, isThoughtArrayType } from "../../types/thought";
import { Link } from "react-router-dom";
import { fetchOpenAi } from "../../fetch/chatgpt";
import Markdown from "react-markdown";
import { mediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";

const container = {
  display: "flex",
  flexFlow: "row",
  gap: "2%",
  marginTop: "10px",
};
const containerSection = {
  display: "flex",
  flexFlow: "column",
  gap: "15px",
  border: "1px solid black",
  width: "49%",
  padding: "10px 15px",
  height: "calc(100vh - 120px)",
  overflow: "scroll",
  borderRadius: "10px",
};
const textField = {
  width: "90%",
};
const textFieldSmall = {
  width: "60%",
};
const purposeSection = {
  display: "flex",
  flexFlow: "column",
  gap: "10px",
  border: "1px solid #CCC",
  padding: "10px",
  borderRadius: "10px",
};
// const purposeSearch = {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px"
// }
const searchPageSection = {
  display: "flex",
  gap: "3px",
};
const searchButtons = {
  display: "flex",
  gap: "2%",
};

const Top = () => {
  const isSp = useMediaQuery(mediaQuery.sp)
  // left side states
  const [searchText, setSearchText] = useState("");
  const [purposes, setPurposes] = useState<Purpose[]>([]);
  const [searchPurposes, setSearchPurposes] = useState<Purpose[]>([]);
  const [inputPurpose, setInputPurpose] = useState("");
  const [filterText, setFilterText] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [searchSelectPurpose, setSearchSelectPurpose] = useState<string>("")
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [initDefaultLocalStorage, setInitDefaultLocalStorage] = useState(true);
  const currentPurpose = purposes.find((p) => p.key === selectedPurpose);
  const currentSearchPurpose = purposes.find((p) => p.key === searchSelectPurpose)
  // right side states
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [openAiResult, setOpenAiResult] = useState<SearchResult[]>([]);
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const currentThoughts = searchText
    ? thoughts.filter((t) => {
        return t.purpose.title
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase());
      })
    : [];
  // left side event
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const onClickSearchInput = (/*e: React.MouseEvent<HTMLButtonElement>*/) => {
    if (!inputPurpose) return;
    const genUuid = String(UUIDGeneratorNode2());
    const now = Date.now();
    const addInputPurpose: Purpose = {
      key: genUuid,
      title: inputPurpose,
      searchResult: [],
      createdAt: now,
      updatedAt: now,
    };
    const newPurpose = [...purposes, addInputPurpose];
    localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(newPurpose));
    localStorage.setItem(
      CURRENT_SEARCH_PURPOSE,
      JSON.stringify([addInputPurpose])
    );
    setInputPurpose("");
    setPurposes(newPurpose);
    setFilterText("");
    setSearchPurposes(newPurpose);
  };
  const onChangeInputPurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPurpose(e.target.value);
  };
  const onChangeSelectPurpose = (e: SelectChangeEvent<string>) => {
    if (e.target.value === "0") return
    setSelectedPurpose(e.target.value);
    setSearchSelectPurpose(e.target.value)
  };
  const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };
  const onClickFilterText = () => {
    if (!filterText) {
      setSearchPurposes(purposes);
      return;
    }
    setSearchPurposes(
      purposes.filter((p) =>
        p.title.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  };
  const getSearchResult = async (offset: number = 0) => {
    if (!searchText || !searchSelectPurpose) return;
    setError("")
    setIsLoading(true)
    setSearchSelectPurpose("")
    // setSelectedPurpose("")
    let bingResult: SearchResult[] = []
    try {
      bingResult = await fetchBing(searchText, offset);
    } catch(e) {
      console.log(e)
      setIsLoading(false)
      setError(JSON.stringify(e))
      return
    }
    setIsLoading(false)
    setSearchResult(bingResult);
    setCurrentTab(0);
    setOffset(offset);
  };
  const getSearchOpenAi = async () => {
    if (!searchText || !searchSelectPurpose) return;
    setError("")
    setIsLoading(true)
    setSearchSelectPurpose("")
    // setSelectedPurpose("")
    let fetchOpenAiResult: SearchResult[] = [];
    try {
      fetchOpenAiResult = await fetchOpenAi("true", searchText, searchText);
    } catch(e) {
      console.log(e)
      setIsLoading(false)
      setError(JSON.stringify(e))
      return
    }
    setIsLoading(false)
    setOpenAiResult(fetchOpenAiResult);
    setCurrentTab(2);
    onClickUrl(
      "https://chatgpt.com/",
      0,
      fetchOpenAiResult[0].snippet,
      searchText,
      "",
      fetchOpenAiResult[0].keyword,
    );
  };
  const onClickDeletePurpose = (e: React.MouseEvent<HTMLButtonElement>,purposeKey: string) => {
    e.stopPropagation()
    try {
      const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES)
      if (!localStoragePurposeString) throw Error
      const localStoragePurposes: Purpose[] = JSON.parse(localStoragePurposeString)
      if (!isPurposeArrayType(localStoragePurposes)) throw Error
      const newStoragePurpose = localStoragePurposes
        .filter((p) => p.key !== purposeKey)
      setPurposes(newStoragePurpose)
      setSearchPurposes(newStoragePurpose.filter((p) =>
        p.title.toLowerCase().includes(filterText.toLowerCase())
      ))
      localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(newStoragePurpose))
    } catch (e) {
      console.log(e)
    }
  }
  // right side event
  const onChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  const onClickUrl = (
    url: string,
    resultIndex: number,
    snippet: string,
    query1: string,
    cachedUrl: string,
    pageTitle: string
  ) => {
    if (!currentPurpose) return;
    const now = Date.now();
    const clickedSearch = {
      keyword: query1,
      resultIndex,
      url,
      title: pageTitle,
      snippet,
      searchAt: now,
      cachedUrl,
    };
    const updatedCurrentPurpose = {
      ...currentPurpose,
      searchResult: [...(currentPurpose?.searchResult ?? []), clickedSearch],
    };
    const updatedPurpose = purposes.map((p) => {
      if (p.key === selectedPurpose) return updatedCurrentPurpose;
      return p;
    });
    setPurposes(updatedPurpose);
    try {
      localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(updatedPurpose));
    } catch (e) {
      console.log(e);
      initLocalStorage(SEARCH_PURPOSES);
    }
  };
  useEffect(() => {
    if (!initDefaultLocalStorage) return;
    setInitDefaultLocalStorage(false);
    const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES);
    if (!localStoragePurposeString) {
      initLocalStorage(SEARCH_PURPOSES);
      return;
    }
    try {
      const JsonPurposeString = JSON.parse(localStoragePurposeString);
      if (!isPurposeArrayType(JsonPurposeString)) throw Error;
      setPurposes(JsonPurposeString);
      setSearchPurposes(JsonPurposeString);
    } catch (e) {
      initLocalStorage(SEARCH_PURPOSES);
      console.log(e);
    }
  }, [initDefaultLocalStorage]);
  useEffect(() => {
    if (!initDefaultLocalStorage) return;
    setInitDefaultLocalStorage(false);
    try {
      const localStorageThoughtString = localStorage.getItem(SEARCH_THOUGHTS);
      if (!localStorageThoughtString) throw Error;
      const localStorageThought = JSON.parse(localStorageThoughtString);
      if (!isThoughtArrayType(localStorageThought)) throw Error;
      setThoughts(localStorageThought);
    } catch (e) {
      initLocalStorage(SEARCH_THOUGHTS);
      console.log(e);
    }
  }, [initDefaultLocalStorage]);
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
      <Box sx={containerSection}>
        <h1>
          検索する{" "}
          {/* <Button size="small" variant="contained" onClick={insertInitialValue}>
            お試しデータを追加する
          </Button> */}
        </h1>
        <TextField
          value={searchText}
          onChange={onChangeSearchInput}
          placeholder="検索キーワードを入力"
          sx={textField}
        />
        <Box sx={purposeSection}>
          <h3>記事のタイトルを入力する</h3>
          {!searchSelectPurpose.length && <p style={{color: "red", margin: 0}}>記事のタイトルを入力し「記事タイトルを追加」を押した後で、一番下で「記事のタイトル」を選択してください</p>}
          <Box>
            <TextField
              value={inputPurpose}
              placeholder="記事のタイトルを入力"
              onChange={onChangeInputPurpose}
              sx={textFieldSmall}
            />
            <Button
              onClick={onClickSearchInput} sx={{ mt: "10px", ml: "10px" }}
              variant="contained"
              disabled={!inputPurpose}
            >
              記事のタイトルを追加
            </Button>
          </Box>
          <Box>
            <TextField
              value={filterText}
              placeholder="記事のタイトルをフィルタする"
              sx={textFieldSmall}
              onChange={onChangeFilterText}
            />
            <Button
              sx={{ mt: "10px", ml: "10px" }}
              onClick={onClickFilterText}
              variant="contained"
              disabled={!filterText}
            >
              フィルターする
            </Button>
          </Box>
          {
            !searchPurposes.length && (
              <p style={{color: "red",  margin: 0}}>記事のタイトルを入力して、追加してください</p>
            )
          }
          <FormControl>
            <InputLabel>{searchSelectPurpose.length ? "" : "記事のタイトルを選択してください"}</InputLabel>
            <Select
              sx={textField}
              value={searchSelectPurpose}
              onChange={onChangeSelectPurpose}
            >
              { searchPurposes.slice(0, 5).map((purpose) => {
                return (
                  <MenuItem key={`${purpose.key}`} value={purpose.key}>
                    <Box sx={{display: "flex", justifyContent:"space-between", width: "100%"}}>
                      <Box
                        sx={{
                          textOverflow: "ellipsis",
                          width: "80%",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}>
                          {purpose.title}
                      </Box>
                      { purpose.key !== selectedPurpose &&
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{textAlign: "right"}}
                          onClick={(e) => {
                            onClickDeletePurpose(e, purpose.key)
                          }}
                        >
                          削除する
                        </Button>
                      }
                    </Box>
                  </MenuItem>
                );
              })}
              { searchPurposes.length > 5 &&
                <MenuItem value="0">
                  フィルターして選択したい記事の内容を選んでください
                </MenuItem>
              }
            </Select>
          </FormControl>
        </Box>
        <Box sx={searchButtons}>
          <Button
            variant="contained"
            onClick={() => {
              setQuery(searchText);
              getSearchResult(0);
            }}
            disabled={!currentSearchPurpose || !searchText}
            sx={{ width: "45%" }}
          >
            Bing
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setQuery(searchText);
              getSearchOpenAi();
            }}
            disabled={!currentSearchPurpose || !searchText}
            sx={{ width: "45%" }}
          >
            ChatGPT
          </Button>
        </Box>
        <p>
        <a href="https://google-poc.s3.us-west-1.amazonaws.com/Usage.pdf">使い方PDF</a>
        {"　"}
        <Link to="/usage">使い方</Link>
        </p>
      </Box>
      <Box sx={containerSection}>
        <h1 style={{ marginBottom: "0px" }}>
          検索結果
          {" "}
          <Button size="small" variant="contained" color="success">
            <Link to="/summarize" style={{color: "white"}}>記事を自動生成する</Link>
          </Button>
        </h1>
        <Box>
          <Tabs value={currentTab} onChange={onChangeTab}>
            <Tab label={`Bing検索 ${searchResult.length}`} />
            <Tab label={`検索足跡検索 ${currentThoughts.length}`} />
            <Tab label={`ChatGPT検索 ${openAiResult.length}`} />
          </Tabs>
        </Box>
        { error
        ? <p>Error Occur! {error}</p>
        : isLoading
        ? <CircularProgress/>
        : currentTab === 0 ? (
          <>
            {searchResult.length ? (
              <>
                {currentTab === 0 ? (
                  <Box>
                    {searchResult.map((result) => {
                      return (
                        <Box key={`${result.title}_${result.url}`}>
                          <h4>
                            <a
                              href={result.url}
                              target="_blank"
                              onClick={() => {
                                onClickUrl(
                                  result.url,
                                  result.resultIndex,
                                  result.snippet,
                                  query,
                                  result.cachedUrl ?? "",
                                  result.title
                                );
                              }}
                            >
                              {result.resultIndex + offset + 1} : {result.title}
                            </a>
                            <br />
                            <small>{result.url}</small>
                          </h4>
                          <p>{result.snippet.slice(0, 100)}...</p>
                        </Box>
                      );
                    })}
                    <Box sx={searchPageSection}>
                      {[0, 10, 20, 30, 40, 50].map((pageNumber) => {
                        return (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => getSearchResult(pageNumber)}
                            key={`searchNumber_${pageNumber}`}
                          >
                            {pageNumber}
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <p>検索結果はありません</p>
            )}
          </>
        ) : currentTab === 1 ? (
          <>
            {currentThoughts.length ? (
              <Box>
                {currentThoughts.map((thought) => {
                  return (
                    <Box key={`${thought.key}`}>
                      <h4>
                        <a href={`/thoughts/${thought.key}`} target="_blank">
                          {thought.purpose.title}
                        </a>
                      </h4>
                      <p>
                        {thought.searches.find((s) => s.memo)?.memo ??
                          "メモはありません"}
                      </p>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <p>検索足跡はありません</p>
            )}
          </>
        ) : (
          <>
            {openAiResult.map((result) => {
              return (
                <Box key={`${result.title}_${result.url}`}>
                  <Markdown>{result.snippet}</Markdown>
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Top;
