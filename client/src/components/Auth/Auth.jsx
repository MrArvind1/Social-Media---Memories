import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {GoogleLogin} from "react-google-login";
import {useHistory} from "react-router-dom"
import { Avatar, Paper, Button, Typography, Container, Grid} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Input from './input';

import useStyle from "./styles"
import Icon from "./Icon"

import {signIn, signUp} from "../../actions/auth"

const Auth = () => {
    const classes = useStyle();    

    const [showPassword, setShowPassword] = useState(false);

    const [isSignup, setIsSignup] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email : '',
        password: '',
        confirmPassword : ''
    })

    const dispatch = useDispatch();

    const history = useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)

        if(isSignup) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
     }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => {return ( {...prev, [name] : value} )})
     }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSwitchMode = () => {
        setFormData({firstName: '', lastName: '', email : '', password: '', confirmPassword : ''})
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const googleSuccess = async (res) => {
        // console.log(res);

        const result = res?.profileObj
        const token = res?.tokenId

        try {
            
            dispatch({type: 'AUTH', payload: {result, token}})
            history.push('/');

        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log('Google Sign In failed')
        console.log(error);
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit} autoComplete='off' >
                    <Grid container spacing={3}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin 
                        clientId='820807877938-9bm1n0s9orspmoc70i79oc0bvqr254ah.apps.googleusercontent.com'
                        render={(props)=>(
                            <Button 
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                variant='contained'
                                onClick={props.onClick}
                                disabled={props.disabled}
                                startIcon={<Icon/>}
                            >
                                Google Sign in        
                            </Button>)}
                        
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />

                    <Grid container className={classes.switchContainer}>
                        <Grid item>
                            <Button onClick={handleSwitchMode} className={classes.switchButton}>
                                {isSignup ? 'Already have an account' : 'New User'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
