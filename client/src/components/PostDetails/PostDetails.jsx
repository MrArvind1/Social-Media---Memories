import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Grid, Card, CardMedia, CardContent, ButtonBase } from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"

import { useDispatch, useSelector } from "react-redux"

import moment from "moment"

import { useHistory, useParams } from "react-router-dom";


import useStyles from "./styles"

import { getPostBySearch, getSinglePost } from "../../actions/post"


const PostDetails = () => {

    const classes = useStyles();

    const { post, posts, isLoading } = useSelector((state) => state.posts);

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSinglePost(id))
    }, [id, dispatch])

    useEffect(() => {
        if (post) dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }, [post, dispatch])


    if (!post) return null;

    if (isLoading) {
        return (
            < Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size={`5em`} />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

    const openPost = (_id) => { history.push(`/posts/${_id}`) };

    const reduceLength = (msg) => {
        const LIMIT = 30
        const words = msg.split(' ');
        words.length = LIMIT;
        words.push('...')
        const newMessage = words.join(' ');

        return newMessage;
    }

    return (
        <Paper className={classes.mainPaper} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by: {post.name}
                    </Typography>
                    <Typography variant="body1">
                        {moment(post.createdAt).fromNow()}
                    </Typography>

                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1">
                        <strong>Comments !</strong>
                    </Typography>

                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile} alt={post.title} />
                </div>
            </div>

            {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You Might Also Like:</Typography>
                    <Divider style={{ marginBottom: '30px' }} />
                </div>
            )}


            {recommendedPosts.length && (

                <Grid container alignItems="stretch" spacing={3}>
                    {recommendedPosts.map(({ name, title, message, likes, selectedFile, _id }) => {
                        return (
                            <Grid key={_id} xs={12} sm={12} md={6} lg={3} item style={{ display: 'flex' }}>
                                <Card className={classes.recommendedCard}>

                                    <ButtonBase className={classes.recommendedButtonBase} onClick={()=>openPost(_id)}>

                                        <CardMedia image={selectedFile} title={title} className={classes.recommendedMedia} elevation={1} />

                                        <div className={classes.recommendedOverlay}>
                                            <Typography variant="h6">{name}</Typography>
                                            <Typography variant="h5" className={classes.recommendedTitle} gutterBottom component="h2">{title}</Typography>
                                        </div>

                                    </ButtonBase>

                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">{reduceLength(message)}</Typography>
                                        <>
                                        <Typography variant='h6' color='textSecondary'>
                                        <ThumbUpAltIcon fontSize="small" style={{marginRight: '10px', marginTop:'15px', paddingTop:'20px'}}/>
                                            Likes : {likes.length}
                                        </Typography>
                                        </>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            )
            }

        </Paper >
    )
}

export default PostDetails
