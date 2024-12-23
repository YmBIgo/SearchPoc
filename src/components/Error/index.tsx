import { Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const container = {
    marginTop: "10px"
}

const Error = () => {
    const navigate = useNavigate()
    navigate("/")
    return (
        <Box sx={container}>
            <h1>404</h1>
            <p>Please jump to <Link to="/">Top Page</Link></p>
        </Box>
    )
}

export default Error