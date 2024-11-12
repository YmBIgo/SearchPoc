import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom"

const Header = () => {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{color: "white"}} id="searchEngine2">Poodle</Link>
            </Typography>
            {/* <Button color="inherit">
                <Link to="https://google-poc.s3.us-west-1.amazonaws.com/Usage.pdf" style={{color: "white"}}>使い方PDF</Link>
            </Button> */}
            <Button color="inherit">
                <Link to="/usage" style={{color: "white"}}>Usage</Link>
            </Button>
            <Button color="inherit">
                <Link to="/thoughts" style={{color: "white"}}>Search History</Link>
            </Button>
            <Button color="inherit">
                <Link to="/summarize" style={{color: "white"}}>Summarize</Link>
            </Button>
            <Button color="inherit">
                <Link to="/" style={{color: "white"}}>Search</Link>
            </Button>
            </Toolbar>
        </AppBar>
    </Box>
    )
}

export default Header