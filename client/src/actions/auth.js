import {AUTH} from "../constants/actionTypes"
import * as api from  "../api/index";


export const signIn = (formData, history) => async(dispatch) => {
    try {
        // LogIn the users   
        const {data} = await api.signIn(formData);
        dispatch({type : AUTH, payload: data});

        history.push('/');
    } catch (error) {
        console.log(error)
    }
}


export const signUp = (formData, history) => async(dispatch) => {
    try {
        // signUp the users      
        const {data} = await api.signUp(formData);
        dispatch({type : AUTH, payload: data});

        history.push('/');
    } catch (error) {
        console.log(error)
    }
}