import { useState, useEffect } from "react"
import {
    Box,
    TextField,
    Select,
    MenuItem,
    Button,
    SelectChangeEvent,
    Tabs,
    Tab
} from "@mui/material"

import { fetchBing } from "../../fetch/bing"
import { Purpose, isPurposeArrayType } from "../../types/purpose"
import { CURRENT_SEARCH_PURPOSE, SEARCH_PURPOSES, SEARCH_THOUGHTS } from "../../const/localstorage"
import { SearchResult } from "../../types/searchResult"
import { initLocalStorage } from "../../helper/localstorage"
import { UUIDGeneratorNode2 } from "../../helper/random"
import { Thought, isThoughtArrayType } from "../../types/thought"
import { Link } from "react-router-dom"
import { fetchOpenAi } from "../../fetch/chatgpt"
import Markdown from "react-markdown"

const container = {
    display: "flex",
    flexFlow: "row",
    gap: "2%",
    marginTop: "10px"
}
const containerSection = {
    display: "flex",
    flexFlow: "column",
    gap: "15px",
    border: "1px solid black",
    width: "49%",
    padding: "10px 15px",
    height: "calc(100vh - 150px)",
    overflow: "scroll",
    borderRadius: "10px"
}
const textField = {
    width: "90%",
}
const textFieldSmall = {
    width: "60%"
}
const purposeSection = {
    display: "flex",
    flexFlow: "column",
    gap: "10px",
    border: "1px solid #CCC",
    padding: "10px",
    borderRadius: "10px"
}
// const purposeSearch = {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px"
// }
const searchPageSection = {
    display: "flex",
    gap: "3px"
}
const searchButtons = {
    display: "flex",
    gap: "2%"
}

const initialCurrentSearch = [
    {
        "key":"cb875532-5e6c-4f0d-9004-8742b81c4170",
        "title":"React Router How to add Dynamic Path",
        "searchResult":[],
        "createdAt":1729379775574,
        "updatedAt":1729379775574
    }
]

const initialSearchPurpose = [
    {
        "key":"064dc89c-a0fb-46d2-b0ab-217cc292cb79",
        "title":"Bing API Usage",
        "searchResult":[],
        "createdAt":1729347481884,
        "updatedAt":1729347481884
    }
]

const initialSearchThought = [{
	"key": "1e0c0df9-e842-42bf-a21d-6983b093c0a2",
	"searches": [{
		"keyword": "Bing API",
		"resultIndex": 8,
		"url": "https://learn.microsoft.com/en-us/bing/search-apis/bing-web-search/quickstarts/rest/python",
		"title": "Quickstart: Use Python to call the Bing Web Search API",
		"snippet": "search_term = \"Microsoft Bing Search Services\" Make a request. This code uses the requests library to call the Bing Web Search API and return the results as a JSON object. The API key is passed in the headers dictionary, and the search term and query parameters are passed in the params dictionary. For a complete list of options and parameters ...",
		"searchAt": 1729346629714,
		"memo": "URL is wrong in tutorial..."
	}],
	"purpose": {
		"key": "aad55abf-5670-44d1-82cd-4d3267e91730",
		"title": "Bing API not work",
		"searchResult": [{
			"keyword": "Bing API",
			"resultIndex": 0,
			"url": "https://www.microsoft.com/en-us/bing/apis/bing-web-search-api",
			"title": "Web Search API | Microsoft Bing",
			"snippet": "Learn how to use Bing Web Search API to bring intelligent search to your apps and access billions of web documents. Explore the features, benefits, and resources of Bing Web Search API and other Bing APIs.",
			"searchAt": 1729346618348
		}, {
			"keyword": "Bing API",
			"resultIndex": 1,
			"url": "https://www.microsoft.com/en-us/bing/apis",
			"title": "Bing Search APIs | Microsoft Bing",
			"snippet": "Learn how to use Bing Search APIs to add search capabilities to your site or app for Web, Images, News, Videos, Entities, Visual Search, Custom Search, Autosuggest and Spell. Explore the features, pricing, documentation and support for Bing Search APIs.",
			"searchAt": 1729346620931
		}, {
			"keyword": "Bing API",
			"resultIndex": 9,
			"url": "https://blogs.bing.com/Engineering-Blog/2017-11/Start-using-the-Bing-Search-APIs-in-under-5-minutes",
			"title": "Start using the Bing Search APIs in under 5 minutes",
			"snippet": "Learn how to integrate and evaluate Bing Search APIs in your development environment in under 5 minutes. Choose from six languages and follow the step-by-step instructions to access the vast knowledge of the web.",
			"searchAt": 1729346624315
		}, {
			"keyword": "Bing API",
			"resultIndex": 8,
			"url": "https://learn.microsoft.com/en-us/bing/search-apis/bing-web-search/quickstarts/rest/python",
			"title": "Quickstart: Use Python to call the Bing Web Search API",
			"snippet": "search_term = \"Microsoft Bing Search Services\" Make a request. This code uses the requests library to call the Bing Web Search API and return the results as a JSON object. The API key is passed in the headers dictionary, and the search term and query parameters are passed in the params dictionary. For a complete list of options and parameters ...",
			"searchAt": 1729346629714
		}],
		"createdAt": 1729346612616,
		"updatedAt": 1729346612616
	},
	"createdAt": 1729346649318,
	"updatedAt": 1729346649318
}, {
	"key": "78dd890f-7728-4451-96e4-9165d1f65784",
	"searches": [{
		"keyword": "lambda internet access",
		"resultIndex": 0,
		"url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html",
		"title": "Enable internet access for VPC-connected Lambda functions",
		"snippet": "By default, Lambda functions run in a Lambda-managed VPC that has internet access. To access resources in a VPC in your account, you can add a VPC configuration to a function. This restricts the function to resources within that VPC, unless the VPC has internet access. This page explains how to provide internet access to VPC-connected Lambda ...",
		"searchAt": 1729379026709,
		"memo": "Official document, a little bit long for Japanese..."
	}, {
		"keyword": "lambda internet access",
		"resultIndex": 12,
		"url": "https://repost.aws/ja/knowledge-center/internet-access-lambda-function",
		"title": "VPC の Lambda 関数へのインターネットアクセスを許可する | AWS re:Post",
		"snippet": "例: lambda_vpc_basic_execution。 6. [保存] を選択します。 詳細については、「Lambda 実行ロール」と「IAM コンソールでの実行ロールの作成」を参照してください。 Amazon VPC に接続するように Lambda 関数を設定する. 1. Lambda コンソールで関数のページを開きます。 2.",
		"searchAt": 1729379310210,
		"memo": "Official Japanese document. easy to understand"
	}],
	"purpose": {
		"key": "700982c7-cf52-4d2e-82df-3ce7ed51934f",
		"title": "AWS lambda can not access Internet",
		"searchResult": [{
			"keyword": "lambda internet access",
			"resultIndex": 0,
			"url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html",
			"title": "Enable internet access for VPC-connected Lambda functions",
			"snippet": "By default, Lambda functions run in a Lambda-managed VPC that has internet access. To access resources in a VPC in your account, you can add a VPC configuration to a function. This restricts the function to resources within that VPC, unless the VPC has internet access. This page explains how to provide internet access to VPC-connected Lambda ...",
			"searchAt": 1729379026709
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 1,
			"url": "https://repost.aws/knowledge-center/internet-access-lambda-function",
			"title": "Give internet access to a Lambda function in a VPC",
			"snippet": "Configure your Lambda function to connect to your Amazon VPC. Open the Functions page in the Lambda console. Choose the name of the function that you want to connect to your Amazon VPC. Choose the Configuration tab. Choose VPC from the left navigation bar, and then choose Edit. Then, enter the following fields:",
			"searchAt": 1729379036227
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 3,
			"url": "https://nodogmablog.bryanhogan.net/2022/06/accessing-the-internet-from-vpc-connected-lambda-functions-using-a-nat-gateway/",
			"title": "Accessing the Internet from VPC Connected Lambda ... - no dogma blog",
			"snippet": "aws lambda update-function-configuration --function-name OpenBreweryDBQuery --vpc-config SubnetIds=subnet-44444,SecurityGroupIds=sg-11111. This will take a while…. Once it is complete, try to invoke the Lambda function, it won’t work! The Lambda function no longer has access to the internet, but it can access your VPC.",
			"searchAt": 1729379092324
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 5,
			"url": "https://medium.com/@nwosuonyedikachi/how-to-give-internet-access-to-aws-lambda-in-vpc-b6837f894c15",
			"title": "How to give internet access to AWS Lambda in VPC",
			"snippet": "Step 1: Create a Subnet and tagged it as your Public Subnet. Step 2: Create an Internet Gateway and attach it to the VPC. Step 3: Create a Route Table, Edit routes, attach the Internet Gateway to ...",
			"searchAt": 1729379113896
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 7,
			"url": "https://medium.com/@arunasilva86/how-to-use-vpc-networking-effectively-for-lambda-445abefdf8cf",
			"title": "Things You Must Know When Configuring Lambda With VPC Resources Access",
			"snippet": "Use case 1: When lambda need access to resource available only within your VPC. If your lambda wants to access resources available only within the VPC, you must attach the lambda to that VPC (or ...",
			"searchAt": 1729379159927
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 8,
			"url": "https://medium.com/analytics-vidhya/vpc-lambda-internet-access-f70a55dc7a39",
			"title": "lambda inside VPC with internet access | by Asaf Adar - Medium",
			"snippet": "The ENI assigned to a lambda function is associated only with a private IP address. Therefore, the lambda function will not have an internet connection and each public HTTP call will result in a ...",
			"searchAt": 1729379177944
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 9,
			"url": "https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the",
			"title": "Why can't an AWS lambda function inside a public subnet in a VPC ...",
			"snippet": "Lambda functions connected to a VPC public subnet cannot typically** access the internet. To access the internet from a public subnet you need a public IP or you need to route via a NAT that itself has a public IP. You also need an Internet Gateway (IGW). However: Lambda functions do not, and cannot, have public IP addresses, and",
			"searchAt": 1729379191593
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 2,
			"url": "https://qiita.com/mogeko6347/items/ec385a9168756d287999",
			"title": "VPCを設定したLambdaからインターネットにアクセスしたい - Qiita",
			"snippet": "Lambdaは、デフォルトの設定ではAWSが自動で設定したVPCに設置され、自由にインターネットへのアクセスができます。 ただし、なんらかの事情で（例えばVPC内のリソースにLambdaからアクセスしたい時など）自分のVPCにLambdaを設置したい場合は、",
			"searchAt": 1729379218393
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 1,
			"url": "https://medium.com/@philippholly/aws-lambda-enable-outgoing-internet-access-within-vpc-8dd250e11e12",
			"title": "AWS Lambda: Enable Outgoing Internet Access within VPC",
			"snippet": "Lambda function: VPC settings. 3. Create a NAT Gateway in one of your initial VPC subnets with internet access in route table. In my case I chose the “subnet-dvel-001”. !!!",
			"searchAt": 1729379252027
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 0,
			"url": "https://stackoverflow.com/questions/61554862/lambda-in-a-vpc-not-able-to-access-internet",
			"title": "Lambda in a VPC not able to access internet - Stack Overflow",
			"snippet": "Lambda in a VPC does not have access to internet. You need to setup internet gateway in public subnet and NAT gateway in private subnet with your lambda to be able to access internet. From docs: Connect your function to private subnets to access private resources. If your function needs internet access, use NAT.",
			"searchAt": 1729379268376
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 8,
			"url": "https://www.reddit.com/r/aws/comments/76x68c/nat_gateway_for_lambda_public_internet_access/",
			"title": "NAT Gateway for Lambda public internet access inside VPC is ... - Reddit",
			"snippet": "Just for internet access for a Lambda function inside a VPC! This sets really bad practices for small developers and startups who simply cannot afford these NAT gateways and as a result, all of their infrastructure ends up being exposed outside of VPC, Lambda functions are connecting through RDS via public IP, etc... the list goes on and on. ...",
			"searchAt": 1729379284824
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 10,
			"url": "https://stackoverflow.com/questions/42527331/aws-lambda-in-vpc-doesnt-have-internet-access-behind-nat",
			"title": "AWS Lambda in VPC doesn't have internet access behind NAT",
			"snippet": "If you open that CIDR block from \"0.0.0.0/16\" to \"0.0.0.0/0\", Lambda can access the internet. I'm not that knowledgeable about NAT, but it seems that the NAT traffic is blocked by that ACL rule. Share. Improve this answer. Follow edited Mar 1, 2017 at 17:03. answered Mar 1 ...",
			"searchAt": 1729379296510
		}, {
			"keyword": "lambda internet access",
			"resultIndex": 12,
			"url": "https://repost.aws/ja/knowledge-center/internet-access-lambda-function",
			"title": "VPC の Lambda 関数へのインターネットアクセスを許可する | AWS re:Post",
			"snippet": "例: lambda_vpc_basic_execution。 6. [保存] を選択します。 詳細については、「Lambda 実行ロール」と「IAM コンソールでの実行ロールの作成」を参照してください。 Amazon VPC に接続するように Lambda 関数を設定する. 1. Lambda コンソールで関数のページを開きます。 2.",
			"searchAt": 1729379310210
		}],
		"createdAt": 1729379008643,
		"updatedAt": 1729379008643
	},
	"createdAt": 1729379374459,
	"updatedAt": 1729379374459
}, {
	"key": "d806a51d-d482-4246-b864-b773651ed598",
	"searches": [{
		"keyword": "React Router Dynamic Path",
		"resultIndex": 1,
		"url": "https://medium.com/@ritikkhndelwal/react-router-dom-tutorial-dynamic-routing-made-easy-a75ba2c258f8",
		"title": "Dynamic Routing Made Easy: A React-router-dom Tutorial",
		"snippet": "First of all the biggest change is the :id, this code make’s this path dynamic, ... And in the next blog we will go more deeper to explore more features provided by the react-router-dom. I hope ...",
		"searchAt": 1729379789356,
		"memo": ":id and useParams() imported from react-router-dom"
	}],
	"purpose": {
		"key": "cb875532-5e6c-4f0d-9004-8742b81c4170",
		"title": "React Router How to add Dynamic Path",
		"searchResult": [{
			"keyword": "React Router Dynamic Path",
			"resultIndex": 1,
			"url": "https://medium.com/@ritikkhndelwal/react-router-dom-tutorial-dynamic-routing-made-easy-a75ba2c258f8",
			"title": "Dynamic Routing Made Easy: A React-router-dom Tutorial",
			"snippet": "First of all the biggest change is the :id, this code make’s this path dynamic, ... And in the next blog we will go more deeper to explore more features provided by the react-router-dom. I hope ...",
			"searchAt": 1729379789356
		}],
		"createdAt": 1729379775574,
		"updatedAt": 1729379775574
	},
	"createdAt": 1729379837823,
	"updatedAt": 1729379837823
}]


const Top = () => {
    // left side states
    const [searchText, setSearchText] = useState("")
    const [purposes, setPurposes] = useState<Purpose[]>([])
    const [searchPurposes, setSearchPurposes] = useState<Purpose[]>([])
    const [inputPurpose, setInputPurpose] = useState("")
    const [filterText, setFilterText] = useState("")
    const [selectedPurpose, setSelectedPurpose] = useState("")
    const [query, setQuery] = useState("")
    const [offset, setOffset] = useState(0)
    const [initDefaultLocalStorage, setInitDefaultLocalStorage] = useState(true)
    const currentPurpose = purposes.find((p) => p.key === selectedPurpose)
    // right side states
    const [searchResult, setSearchResult] = useState<SearchResult[]>([])
    const [openAiResult, setOpenAiResult] = useState<SearchResult[]>([])
    const [thoughts, setThoughts] = useState<Thought[]>([])
    const [currentTab, setCurrentTab] = useState<number>(0)
    const currentThoughts = query
    ? thoughts.filter((t) => {
        return t.purpose.title.toLowerCase().includes(query.toLocaleLowerCase())
    })
    : []
    // left side event
    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }
    const onClickSearchInput = (/*e: React.MouseEvent<HTMLButtonElement>*/) => {
        if (!inputPurpose) return
        const genUuid = String(UUIDGeneratorNode2())
        const now = Date.now()
        const addInputPurpose: Purpose = {
            key: genUuid,
            title: inputPurpose,
            searchResult: [],
            createdAt: now,
            updatedAt: now
        }
        const newPurpose = [...purposes, addInputPurpose]
        localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(newPurpose))
        localStorage.setItem(CURRENT_SEARCH_PURPOSE, JSON.stringify([addInputPurpose]))
        setInputPurpose("")
        setPurposes(newPurpose)
        setFilterText("")
        setSearchPurposes(newPurpose)
    }
    const onChangeInputPurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPurpose(e.target.value)
    }
    const onChangeSelectPurpose = (e: SelectChangeEvent<string>) => {
        setSelectedPurpose(e.target.value)
    }
    const onChangeFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value)
    }
    const onClickFilterText = () => {
        if (!filterText) {
            setSearchPurposes(purposes)
            return
        }
        setSearchPurposes(purposes.filter((p) => p.title.toLowerCase().includes(filterText.toLowerCase())))
    }
    const getSearchResult = async(offset: number= 0) => {
        if (!searchText || !selectedPurpose) return
        const bingResult = await fetchBing(searchText, offset)
        setSearchResult(bingResult)
        setCurrentTab(0)
        setOffset(offset)
    }
    const getSearchOpenAi = async () => {
        if (!searchText || !selectedPurpose) return
        const fetchOpenAiResult = await fetchOpenAi("true", searchText, searchText)
        setOpenAiResult(fetchOpenAiResult)
        setCurrentTab(2)
        onClickUrl("https://chatgpt.com/", 0, fetchOpenAiResult[0].keyword, fetchOpenAiResult[0].snippet, searchText)
    }
    const insertInitialValue = () => {
        try {
            localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(initialSearchPurpose))
            localStorage.setItem(CURRENT_SEARCH_PURPOSE, JSON.stringify(initialCurrentSearch))
            localStorage.setItem(SEARCH_THOUGHTS, JSON.stringify(initialSearchThought))
        } catch (e) {
            console.log(e)
            initLocalStorage(SEARCH_PURPOSES)
            initLocalStorage(CURRENT_SEARCH_PURPOSE)
            initLocalStorage(SEARCH_THOUGHTS)
        }
        setInitDefaultLocalStorage(true)
    }
    // right side event
    const onChangeTab = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue)
    }
    const onClickUrl = (url: string, resultIndex: number, title: string, snippet: string, query1: string) => {
        if (!currentPurpose) return
        const now = Date.now()
        const clickedSearch = {keyword: query1, resultIndex, url, title, snippet, searchAt: now}
        const updatedCurrentPurpose = {
            ...currentPurpose,
            searchResult: [...currentPurpose?.searchResult ?? [], clickedSearch]
        }
        const updatedPurpose = purposes.map((p)=>{
            if (p.key === selectedPurpose) return updatedCurrentPurpose
            return p
        })
        setPurposes(updatedPurpose)
        try {
            localStorage.setItem(SEARCH_PURPOSES, JSON.stringify(updatedPurpose))
        } catch (e) {
            console.log(e)
            initLocalStorage(SEARCH_PURPOSES)
        }
    }
    useEffect(() => {
        if (!initDefaultLocalStorage) return
        setInitDefaultLocalStorage(false)
        const localStoragePurposeString = localStorage.getItem(SEARCH_PURPOSES)
        if (!localStoragePurposeString) {
            initLocalStorage(SEARCH_PURPOSES)
            return
        }
        try {
            const JsonPurposeString = JSON.parse(localStoragePurposeString)
            if (!isPurposeArrayType(JsonPurposeString)) throw Error
            setPurposes(JsonPurposeString)
            setSearchPurposes(JsonPurposeString)
        } catch (e) {
            initLocalStorage(SEARCH_PURPOSES)
            console.log(e)
        }
    }, [initDefaultLocalStorage])
    useEffect(() => {
        if (!initDefaultLocalStorage) return
        setInitDefaultLocalStorage(false)
        try {
            const localStorageThoughtString = localStorage.getItem(SEARCH_THOUGHTS)
            if (!localStorageThoughtString) throw Error
            const localStorageThought = JSON.parse(localStorageThoughtString)
            if (!isThoughtArrayType(localStorageThought)) throw Error
            setThoughts(localStorageThought)
        } catch(e) {
            initLocalStorage(SEARCH_THOUGHTS)
            console.log(e)
        }
    }, [initDefaultLocalStorage])
    return (
        <Box sx={container}>
            <Box sx={containerSection}>
                <h1>Search <Button size="small" variant="contained" onClick={insertInitialValue}>Insert Initial Value (Recommended for first user)</Button></h1>
                <TextField
                    value={searchText}
                    onChange={onChangeSearchInput}
                    placeholder="Input Search Word"
                    sx={textField}
                />
                <Box sx={purposeSection}>
                    <h3>Input Purpose</h3>
                    <Box>
                        <TextField
                            value={inputPurpose}
                            placeholder="Input Search Purpose"
                            onChange={onChangeInputPurpose}
                            sx={textFieldSmall}
                        />
                        <Button
                            onClick={onClickSearchInput}
                            sx={{mt: "10px"}}
                        >
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
                        <Button
                            sx={{mt: "10px"}}
                            onClick={onClickFilterText}
                        >
                            Filter Purpose
                        </Button>
                    </Box>
                    <Select
                        sx={textField}
                        value={selectedPurpose}
                        onChange={onChangeSelectPurpose}
                    >
                        {searchPurposes.length
                        ? searchPurposes.map((purpose) => {
                            return(
                            <MenuItem
                                key={`${purpose.key}`}
                                value={purpose.key}
                            >
                                {purpose.title}
                            </MenuItem>
                            )
                        })
                        : <MenuItem>No Purpose found</MenuItem>
                        }
                    </Select>
                </Box>
                <Box sx={searchButtons}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setQuery(searchText)
                            getSearchResult(0)
                        }}
                        disabled={!currentPurpose || !searchText}
                        sx={{width: "45%"}}
                    >
                        Bing
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            setQuery(searchText)
                            getSearchOpenAi()
                        }}
                        disabled={!currentPurpose || !searchText}
                        sx={{width: "45%"}}
                    >
                        ChatGPT
                    </Button>
                </Box>
                <Link to="/usage">Usage</Link>
            </Box>
            <Box sx={containerSection}>
                <h1 style={{marginBottom: "0px"}}>Search Result</h1>
                <Box>
                    <Tabs value={currentTab} onChange={onChangeTab}>
                        <Tab label={`Bing Search ${searchResult.length}`}/>
                        <Tab label={`Idea Search ${currentThoughts.length}`} />
                        <Tab label={`ChatGPT Search ${openAiResult.length}`} />
                    </Tabs>
                </Box>
                { currentTab === 0 ?
                    <>
                    { searchResult.length
                        ?
                        <>
                        {currentTab === 0
                            ?
                            <Box>
                                {searchResult.map((result) => {
                                    return (
                                        <Box key={`${result.title}_${result.url}`}>
                                            <h4>
                                                <a
                                                    href={result.url}
                                                    target="_blank"
                                                    onClick={() => {
                                                        onClickUrl(result.url, result.resultIndex, result.keyword, result.snippet, query)
                                                    }}
                                                >
                                                    {result.resultIndex + offset + 1} : {result.title}
                                                </a>
                                                <br/>
                                                <small>{result.url}</small>
                                            </h4>
                                            <p>{result.snippet.slice(0, 100)}...</p>
                                        </Box>
                                    )
                                })}
                                <Box sx={searchPageSection}>
                                    { [0, 10, 20, 30, 40, 50].map((pageNumber) => {
                                        return (
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => getSearchResult(pageNumber)}
                                                key={`searchNumber_${pageNumber}`}
                                            >
                                                {pageNumber}
                                            </Button>
                                        )
                                    })
                                    }
                                </Box>
                            </Box>
                            : <></>
                        }
                        </>
                        : <p>No Search Result</p>
                    }
                    </>
                    :
                    currentTab === 1
                    ?
                    <>
                        {currentThoughts.length
                        ?
                        <Box>
                            { currentThoughts.map((thought) => {
                                return (
                                    <Box key={`${thought.key}`}>
                                        <h4>
                                            <a href={`/thoughts/${thought.key}`} target="_blank">
                                                {thought.purpose.title}
                                            </a>
                                        </h4>
                                        <p>{thought.searches.find((s) => s.memo)?.memo ?? "No memo found"}</p>
                                    </Box>
                                )
                            }) }
                        </Box>
                        : <p>No Idea Result</p>
                        }
                    </>
                    :
                    <>
                        {openAiResult.map((result) => {
                            return (
                                <Box key={`${result.title}_${result.url}`}>
                                    <Markdown>{result.snippet}</Markdown>
                                </Box>
                            )
                        })}
                    </>
                }
            </Box>
        </Box>
    )
}

export default Top