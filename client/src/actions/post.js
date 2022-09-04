import {CREATE, FETCH, DELETE, UPDATE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST} from "../constants/actionTypes"
import * as api from  "../api/index";

// Action Creater are function that returns an action

export const createPost = (newPost, history) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        
        const {data} = await api.createPosts(newPost);

        history.push(`/posts/${data._id}`)

        dispatch({type: CREATE, payload: data});
        
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (page) => async (dispatch) =>  {

    try {
        dispatch({type: START_LOADING})
        
        const {data} = await api.fetchPosts(page);
        // console.log(data);
        dispatch({type: FETCH, payload:data});
        
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const getSinglePost = (id) => async (dispatch) =>  {

    try {

        // console.log(id);

        dispatch({type: START_LOADING})
        
        const {data} = await api.fetchSinglePost(id);
        // console.log(data);
        
        dispatch({type: FETCH_POST, payload:data});
        
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchquery) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        
        const {data} = await api.fetchPostsBySearch(searchquery)
        // console.log(data);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        
        dispatch({type: END_LOADING})
    } catch (error) { 
        console.log(error);
    }
}

export const updatePost = (id, updatedPost) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id, updatedPost);
        
        dispatch({type: UPDATE, payload: data});
        
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id})

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch({type: LIKE, payload: data})

    } catch (error) {
        console.log(error);
    }
}