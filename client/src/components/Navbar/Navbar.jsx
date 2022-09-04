import React, {useState, useEffect} from "react";
import { Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux"
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import decode from "jwt-decode"
import memoriesLogo from "../images/memories-Logo.png";
import memoriesText from "../images/memories-Text.png";
import useStyles from "./styles";

const Navbar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(()=>{
        const webToken = user?.token
        
        if(webToken) {
            const decodedToken = decode(webToken);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (

        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to={'/'} className={classes.brandContainer}>
                <img src={memoriesText} alt="Memories" height="45px"  />
                <img src={memoriesLogo} alt="Memories" height="40px" className={classes.image} />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL} > {user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>LOGOUT</Button>
                    </div>
                ):(
                    <Button variant='contained' component={Link} to='/auth' color='primary'>LOGIN</Button>
                )}
            </Toolbar>
        </AppBar>

    );
};

export default Navbar;
