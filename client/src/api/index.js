import axios from "axios"

const API = axios.create({baseURL : 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')) {
        // console.log(JSON.parse(localStorage.getItem('profile')))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }

    return req;
})

export const fetchPosts          = (page) => (API.get(`/posts?page=${page}`))
export const fetchPostsBySearch  = (query)  => (API.get(`/posts/search?searchQuery=${query.search||'none'}&tags=${query.tags}`))
export const fetchSinglePost     = (id) => (API.get(`/posts/${id}`));
export const createPosts         = (newPost) => (API.post('/posts', newPost))
export const updatePost          = (id, updatedPost) => (API.patch(`/posts/${id}`, updatedPost))
export const deletePost          = (id)  => (API.delete(`/posts/${id}`))
export const likePost            = (id)  => (API.patch(`posts/${id}/likepost`))


export const signIn      = (formData)         =>  (API.post('/users/signin', formData))
export const signUp      = (formData)         =>  (API.post('/users/signup', formData))