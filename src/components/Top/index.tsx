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
  // left side states
  const [searchText, setSearchText] = useState("");
  const [purposes, setPurposes] = useState<Purpose[]>([]);
  const [searchPurposes, setSearchPurposes] = useState<Purpose[]>([]);
  const [inputPurpose, setInputPurpose] = useState("");
  const [filterText, setFilterText] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [initDefaultLocalStorage, setInitDefaultLocalStorage] = useState(true);
  const currentPurpose = purposes.find((p) => p.key === selectedPurpose);
  // right side states
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [openAiResult, setOpenAiResult] = useState<SearchResult[]>([]);
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
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
    setSelectedPurpose(e.target.value);
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
    if (!searchText || !selectedPurpose) return;
    const bingResult = await fetchBing(searchText, offset, "en-US");
    setSearchResult(bingResult);
    setCurrentTab(0);
    setOffset(offset);
  };
  const getSearchOpenAi = async () => {
    if (!searchText || !selectedPurpose) return;
    const fetchOpenAiResult = await fetchOpenAi("true", searchText, searchText);
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
  return (
    <Box sx={container}>
      <Box sx={containerSection}>
        <TextField
          value={searchText}
          onChange={onChangeSearchInput}
          placeholder="Input Search Keyword"
          sx={textField}
        />
        <Box sx={purposeSection}>
          <h3>Add Search Purpose</h3>
          <Box>
            <TextField
              value={inputPurpose}
              placeholder="Input Search Purpose"
              onChange={onChangeInputPurpose}
              sx={textFieldSmall}
            />
            <Button onClick={onClickSearchInput} sx={{ mt: "10px" }}>
              Add Purpose
            </Button>
          </Box>
          <Box>
            <TextField
              value={filterText}
              placeholder="Filter Search Purpose"
              sx={textFieldSmall}
              onChange={onChangeFilterText}
            />
            <Button sx={{ mt: "10px" }} onClick={onClickFilterText}>
              Filter Purpose
            </Button>
          </Box>
          <Select
            sx={textField}
            value={selectedPurpose}
            onChange={onChangeSelectPurpose}
          >
            {searchPurposes.length ? (
              searchPurposes.map((purpose) => {
                return (
                  <MenuItem key={`${purpose.key}`} value={purpose.key}>
                    {purpose.title}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem>Purpose is not selected</MenuItem>
            )}
          </Select>
        </Box>
        <Box sx={searchButtons}>
          <Button
            variant="contained"
            onClick={() => {
              setQuery(searchText);
              getSearchResult(0);
            }}
            disabled={!currentPurpose || !searchText}
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
            disabled={!currentPurpose || !searchText}
            sx={{ width: "45%" }}
          >
            ChatGPT
          </Button>
        </Box>
        <Link to="/usage">Usage</Link>
      </Box>
      <Box sx={containerSection}>
        <h1 style={{ marginBottom: "0px" }}>Search Result</h1>
        <Box>
          <Tabs value={currentTab} onChange={onChangeTab}>
            <Tab label={`Bing Search ${searchResult.length}`} />
            <Tab label={`Search History Search ${currentThoughts.length}`} />
            <Tab label={`ChatGPT Search ${openAiResult.length}`} />
          </Tabs>
        </Box>
        {currentTab === 0 ? (
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
              <p>No Search Result</p>
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
                          "No Memo"}
                      </p>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <p>No Search History</p>
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
