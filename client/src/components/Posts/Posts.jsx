import React from "react"
import { CircularProgress, Grid } from '@material-ui/core';

import { useSelector } from "react-redux"

import Post from "./Post/Post"
import samplePost from "./SamplePost"

const Posts = ({ setCurrentId }) => {

    const {posts, isLoading} = useSelector((store) => { return store.posts })

    const user = JSON.parse(localStorage.getItem('profile'));

    if(!posts.length && !isLoading) {
        return "NO POST"
    }

    if (!user) {
        return (
            <>
                <Grid key={samplePost._id} xs={12} sm={12} md={6} lg={3} item>
                    <Post postData={samplePost} setCurrentId={setCurrentId} />
                </Grid>
            </>
        )
    }

    return (

        isLoading ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {posts.map((postData) => {
                    return (
                        <Grid key={postData._id} xs={12} sm={12} md={6} lg={3} item style={{display: 'flex'}}>
                            <Post postData={postData} setCurrentId={setCurrentId} />
                        </Grid>
                    )
                })}
            </Grid>)
    );
}

export default Posts;