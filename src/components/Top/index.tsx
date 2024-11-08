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

const initialCurrentSearch = [
  {
    key: "cb875532-5e6c-4f0d-9004-8742b81c4170",
    title: "React Router How to add Dynamic Path",
    searchResult: [],
    createdAt: 1729379775574,
    updatedAt: 1729379775574,
  },
];

const initialSearchPurpose = [
  {
    key: "539ca0d5-8b53-454a-a171-815e2bc64bfe",
    title: "AWS lambda のインターネット接続",
    searchResult: [],
    createdAt: 1730903878876,
    updatedAt: 1730903878876,
  },
];

const initialSearchThought = [
  {
    key: "f8bb3385-ea44-4687-a58d-d7c20e071d89",
    searches: [
      {
        keyword: "Bing API",
        resultIndex: 0,
        url: "https://www.microsoft.com/en-us/bing/apis/bing-web-search-api",
        title: "Bing API",
        snippet:
          "Learn how to use Bing Web Search API to bring intelligent search to your apps and access billions of web documents. Explore the features, benefits, and resources of Bing Web Search API and other Bing APIs.",
        searchAt: 1730903922807,
        cachedUrl:
          "http://cc.bingj.com/cache.aspx?q=Bing+API&d=5055834114702335&mkt=ja-JP&setlang=ja-JP&w=PNJ4-0BG42f7IL8-V_HeOfozjrJC4GHO",
        memo: "URL が正しい",
      },
      {
        keyword: "Bing API",
        resultIndex: 1,
        url: "https://techblog.raccoon.ne.jp/archives/1617156256.html",
        title: "Bing API",
        snippet:
          "Bing Search APIとはMicrosoftの提供する検索エンジンであるBingでの検索結果を取得するためのAPIです。ブラウザからの検索のようにウェブページだけではなく画像やニュースの情報も取得することができます。API利用手順APIを利用する",
        searchAt: 1730903929040,
        cachedUrl:
          "http://cc.bingj.com/cache.aspx?q=Bing+API&d=4613886267442778&mkt=ja-JP&setlang=ja-JP&w=gEQZZU3R-w0yJ22_imePNniBLFBJB0yq",
        memo: "URL が正しい",
      },
    ],
    purpose: {
      key: "0abb4138-8faa-426e-9c01-5aae0d6e6c54",
      title: "Bing API を使う",
      searchResult: [
        {
          keyword: "Bing API",
          resultIndex: 0,
          url: "https://www.microsoft.com/en-us/bing/apis/bing-web-search-api",
          title: "Bing API",
          snippet:
            "Learn how to use Bing Web Search API to bring intelligent search to your apps and access billions of web documents. Explore the features, benefits, and resources of Bing Web Search API and other Bing APIs.",
          searchAt: 1730903922807,
          cachedUrl:
            "http://cc.bingj.com/cache.aspx?q=Bing+API&d=5055834114702335&mkt=ja-JP&setlang=ja-JP&w=PNJ4-0BG42f7IL8-V_HeOfozjrJC4GHO",
        },
        {
          keyword: "Bing API",
          resultIndex: 1,
          url: "https://techblog.raccoon.ne.jp/archives/1617156256.html",
          title: "Bing API",
          snippet:
            "Bing Search APIとはMicrosoftの提供する検索エンジンであるBingでの検索結果を取得するためのAPIです。ブラウザからの検索のようにウェブページだけではなく画像やニュースの情報も取得することができます。API利用手順APIを利用する",
          searchAt: 1730903929040,
          cachedUrl:
            "http://cc.bingj.com/cache.aspx?q=Bing+API&d=4613886267442778&mkt=ja-JP&setlang=ja-JP&w=gEQZZU3R-w0yJ22_imePNniBLFBJB0yq",
        },
      ],
      createdAt: 1730903858190,
      updatedAt: 1730903858190,
    },
    createdAt: 1730904077354,
    updatedAt: 1730904077354,
  },
  {
    key: "9433b017-ce09-49f0-9f56-f61f33758c91",
    searches: [
      {
        keyword: "aws lambda internet",
        resultIndex: 0,
        url: "https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/configuration-vpc-internet.html",
        title: "aws lambda internet",
        snippet:
          "このページでは、VPC に接続された Lambda 関数にインターネットアクセスを提供する方法について説明します。 [VPC ワークフローの作成] は、サブネット、NAT ゲートウェイ、インターネットゲートウェイ、ルートテーブルエントリなど、Lambda 関数がプライベートサブネットからパブリックインターネットにアクセスするために必要なすべての VPC リソースを作成します。 Amazon VPC コンソール (https://console.aws.amazon.com/vpc/) を開きます。 ダッシュボードで、 [VPC を作成] を選択します。 [Resources to create] (作成するリソース) で、 [VPC and more] (VPC など) を選択します。",
        searchAt: 1730903889291,
        cachedUrl:
          "http://cc.bingj.com/cache.aspx?q=aws+lambda+internet&d=4996984466519234&mkt=ja-JP&setlang=ja-JP&w=hKUwXF6rrP_gXbT6j_Ii_7MDBZ-iPFR0",
      },
      {
        keyword: "aws lambda internet",
        resultIndex: 1,
        url: "https://repost.aws/ja/knowledge-center/internet-access-lambda-function",
        title: "aws lambda internet",
        snippet:
          "プライベート サブネット からのインターネットアクセスには、ネットワークアドレス変換 (NAT) が必要です。 Amazon VPC に接続された Lambda 関数にインターネットアクセスを提供するには、そのアウトバウンドトラフィックをパブリック サブネット の NAT ゲートウェイ または NATインスタンス にルーティングします。 詳細については、「インターネットゲートウェイを使用してインターネットに接続する」を参照してください。 セットアップ例については、「例: プライベートサブネットにサーバーがある VPC および NAT」 を参照してください。",
        searchAt: 1730903892159,
        cachedUrl:
          "http://cc.bingj.com/cache.aspx?q=aws+lambda+internet&d=4808611492921494&mkt=ja-JP&setlang=ja-JP&w=uaKL8dlqBvmKtAac4rDnOATsk5H9L2wL",
      },
      {
        keyword: "aws lambda internet",
        resultIndex: 0,
        url: "https://chatgpt.com/",
        title: "aws lambda internet",
        snippet:
          "AWS Lambda can access the internet based on whether the function is running inside a Virtual Private Cloud (VPC) and the configuration of that VPC. Here's how internet access works with AWS Lambda:\n\n1. **Not in a VPC:**\n   - By default, AWS Lambda functions have access to the internet if they are not running inside a specific VPC.\n   - This configuration is suitable for most functions that need internet access but do not need access to resources within a VPC, such as databases or other internal services.\n\n2. **Inside a VPC:**\n   - If a Lambda function is associated with a VPC, by default, it does not have internet access. This is because VPCs are, by design, isolated from the internet.\n   - To give a Lambda function internet access while inside a VPC, you need to configure a few elements:\n     - **NAT Gateway/Instance:** Set up a NAT (Network Address Translation) Gateway or NAT Instance in a public subnet. This allows outbound-only access to the internet for resources within private subnets of the VPC.\n     - **Route Table:** Update the route tables for the private subnets where the Lambda function runs to route internet-bound traffic to the NAT Gateway or Instance.\n     - **Security Groups and Network ACLs:** Ensure the security groups and network ACLs are configured to allow necessary traffic. For outbound access, the security group should allow traffic to the internet.\n\n3. **DNS Resolution:**\n   - Ensure that your Lambda function has appropriate DNS settings if it's running in a VPC. This often means enabling DNS resolution within the VPC settings so that internet-facing domain names can be resolved correctly.\n\nRemember that outbound internet access might incur additional costs, particularly when using a NAT Gateway or NAT Instance. The choice between using a NAT Gateway and a NAT Instance often comes down to factors like scalability, cost, and management overhead.",
        searchAt: 1730903906024,
        cachedUrl: "",
      },
    ],
    purpose: {
      key: "539ca0d5-8b53-454a-a171-815e2bc64bfe",
      title: "AWS lambda のインターネット接続",
      searchResult: [
        {
          keyword: "aws lambda internet",
          resultIndex: 0,
          url: "https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/configuration-vpc-internet.html",
          title: "aws lambda internet",
          snippet:
            "このページでは、VPC に接続された Lambda 関数にインターネットアクセスを提供する方法について説明します。 [VPC ワークフローの作成] は、サブネット、NAT ゲートウェイ、インターネットゲートウェイ、ルートテーブルエントリなど、Lambda 関数がプライベートサブネットからパブリックインターネットにアクセスするために必要なすべての VPC リソースを作成します。 Amazon VPC コンソール (https://console.aws.amazon.com/vpc/) を開きます。 ダッシュボードで、 [VPC を作成] を選択します。 [Resources to create] (作成するリソース) で、 [VPC and more] (VPC など) を選択します。",
          searchAt: 1730903889291,
          cachedUrl:
            "http://cc.bingj.com/cache.aspx?q=aws+lambda+internet&d=4996984466519234&mkt=ja-JP&setlang=ja-JP&w=hKUwXF6rrP_gXbT6j_Ii_7MDBZ-iPFR0",
        },
        {
          keyword: "aws lambda internet",
          resultIndex: 1,
          url: "https://repost.aws/ja/knowledge-center/internet-access-lambda-function",
          title: "aws lambda internet",
          snippet:
            "プライベート サブネット からのインターネットアクセスには、ネットワークアドレス変換 (NAT) が必要です。 Amazon VPC に接続された Lambda 関数にインターネットアクセスを提供するには、そのアウトバウンドトラフィックをパブリック サブネット の NAT ゲートウェイ または NATインスタンス にルーティングします。 詳細については、「インターネットゲートウェイを使用してインターネットに接続する」を参照してください。 セットアップ例については、「例: プライベートサブネットにサーバーがある VPC および NAT」 を参照してください。",
          searchAt: 1730903892159,
          cachedUrl:
            "http://cc.bingj.com/cache.aspx?q=aws+lambda+internet&d=4808611492921494&mkt=ja-JP&setlang=ja-JP&w=uaKL8dlqBvmKtAac4rDnOATsk5H9L2wL",
        },
        {
          keyword: "aws lambda internet",
          resultIndex: 0,
          url: "https://chatgpt.com/",
          title: "aws lambda internet",
          snippet:
            "AWS Lambda can access the internet based on whether the function is running inside a Virtual Private Cloud (VPC) and the configuration of that VPC. Here's how internet access works with AWS Lambda:\n\n1. **Not in a VPC:**\n   - By default, AWS Lambda functions have access to the internet if they are not running inside a specific VPC.\n   - This configuration is suitable for most functions that need internet access but do not need access to resources within a VPC, such as databases or other internal services.\n\n2. **Inside a VPC:**\n   - If a Lambda function is associated with a VPC, by default, it does not have internet access. This is because VPCs are, by design, isolated from the internet.\n   - To give a Lambda function internet access while inside a VPC, you need to configure a few elements:\n     - **NAT Gateway/Instance:** Set up a NAT (Network Address Translation) Gateway or NAT Instance in a public subnet. This allows outbound-only access to the internet for resources within private subnets of the VPC.\n     - **Route Table:** Update the route tables for the private subnets where the Lambda function runs to route internet-bound traffic to the NAT Gateway or Instance.\n     - **Security Groups and Network ACLs:** Ensure the security groups and network ACLs are configured to allow necessary traffic. For outbound access, the security group should allow traffic to the internet.\n\n3. **DNS Resolution:**\n   - Ensure that your Lambda function has appropriate DNS settings if it's running in a VPC. This often means enabling DNS resolution within the VPC settings so that internet-facing domain names can be resolved correctly.\n\nRemember that outbound internet access might incur additional costs, particularly when using a NAT Gateway or NAT Instance. The choice between using a NAT Gateway and a NAT Instance often comes down to factors like scalability, cost, and management overhead.",
          searchAt: 1730903906024,
          cachedUrl: "",
        },
      ],
      createdAt: 1730903878876,
      updatedAt: 1730903878876,
    },
    createdAt: 1730904085938,
    updatedAt: 1730904085938,
  },
];

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
    const bingResult = await fetchBing(searchText, offset);
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
  const insertInitialValue = () => {
    try {
      localStorage.setItem(
        SEARCH_PURPOSES,
        JSON.stringify(initialSearchPurpose)
      );
      localStorage.setItem(
        CURRENT_SEARCH_PURPOSE,
        JSON.stringify(initialCurrentSearch)
      );
      localStorage.setItem(
        SEARCH_THOUGHTS,
        JSON.stringify(initialSearchThought)
      );
    } catch (e) {
      console.log(e);
      initLocalStorage(SEARCH_PURPOSES);
      initLocalStorage(CURRENT_SEARCH_PURPOSE);
      initLocalStorage(SEARCH_THOUGHTS);
    }
    setInitDefaultLocalStorage(true);
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
        <h1>
          検索する{" "}
          <Button size="small" variant="contained" onClick={insertInitialValue}>
            お試しデータを追加する
          </Button>
        </h1>
        <TextField
          value={searchText}
          onChange={onChangeSearchInput}
          placeholder="検索キーワードを入力"
          sx={textField}
        />
        <Box sx={purposeSection}>
          <h3>目的を入力する</h3>
          <Box>
            <TextField
              value={inputPurpose}
              placeholder="検索目的を入力"
              onChange={onChangeInputPurpose}
              sx={textFieldSmall}
            />
            <Button onClick={onClickSearchInput} sx={{ mt: "10px" }}>
              目的を追加する
            </Button>
          </Box>
          <Box>
            <TextField
              value={filterText}
              placeholder="検索目的をフィルタする"
              sx={textFieldSmall}
              onChange={onChangeFilterText}
            />
            <Button sx={{ mt: "10px" }} onClick={onClickFilterText}>
              目的をフィルターする
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
              <MenuItem>目的は選択されていません</MenuItem>
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
        <a href="https://google-poc.s3.us-west-1.amazonaws.com/Usage.pdf">使い方PDF</a>
        <Link to="/usage">使い方</Link>
      </Box>
      <Box sx={containerSection}>
        <h1 style={{ marginBottom: "0px" }}>検索結果</h1>
        <Box>
          <Tabs value={currentTab} onChange={onChangeTab}>
            <Tab label={`Bing検索 ${searchResult.length}`} />
            <Tab label={`検索足跡検索 ${currentThoughts.length}`} />
            <Tab label={`ChatGPT検索 ${openAiResult.length}`} />
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
