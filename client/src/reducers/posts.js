import {CREATE, FETCH, FETCH_BY_SEARCH, DELETE, UPDATE, LIKE, START_LOADING, END_LOADING, FETCH_POST} from "../constants/actionTypes"
const posts = (state={isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case CREATE:
            return {...state,  posts: [...state.posts, action.payload]};
        case FETCH:
            return {
                ...state,
                posts: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
                currentPage: action.payload.currentPage,
            }
        case FETCH_BY_SEARCH:
            return{
                ...state,
                posts: action.payload,
            }
        case FETCH_POST:
            return{
                ...state, 
                post: action.payload
            }
        case UPDATE:
                return{...state, posts: state.posts.map((post)=>{return (post._id === action.payload._id ? action.payload : post)})};
        case DELETE:
                return{...state, posts: state.posts.filter((post)=>{return post._id !== action.payload})}
        case LIKE:
                return{...state, posts: state.posts.map((post)=>{return (post._id === action.payload._id ? action.payload : post)})}
        default: 
            return(state);
    }
}

export default posts