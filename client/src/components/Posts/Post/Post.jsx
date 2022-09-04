import React from "react"
import useStyles from "./styles"

import { Card, CardActions, CardContent, Button, Typography, CardMedia, ButtonBase} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined"

import moment from "moment"

import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deletePost, likePost } from "../../../actions/post"



const Post = ({ setCurrentId, postData }) => {
     const classes = useStyles();
     const dispatch = useDispatch();
     const history = useHistory();

     const user = JSON.parse(localStorage.getItem('profile'));

     const Likes = () => {
          if (postData.likes.length > 0) {
               return postData.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                    ? (
                         <><ThumbUpAltIcon fontSize="small" />&nbsp;{postData.likes.length > 2 ? `You and ${postData.likes.length - 1} others` : `${postData.likes.length} like${postData.likes.length > 1 ? 's' : ''}`}</>
                    ) : (
                         <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{postData.likes.length} {postData.likes.length === 1 ? 'Like' : 'Likes'}</>
                    );
          }

          return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
     };

     const openPost = () => history.push(`/posts/${postData._id}`);

     const reduceLength = (message) => {
          const LIMIT = 30
          const words = message.split(' ');
          words.length = LIMIT;
          words.push('. . . .')
          const newMessage = words.join(' ');

          return newMessage;
     }

     return (
          <Card className={classes.card} elevation={6} raised>

               <ButtonBase className={classes.cardAction} onClick={openPost}>

                    <CardMedia image={postData.selectedFile} title={postData.title} className={classes.media} />

                    <div className={classes.overlay}>
                         <Typography variant="h6">{postData.name}</Typography>
                         <Typography variant="body2">{moment(postData.createdAt).fromNow()}</Typography>
                    </div>
               </ButtonBase>

               {(user?.result?.googleId === postData?.creator || user?.result?._id === postData?.creator) &&
                    <div className={classes.overlay2}>
                         <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(postData._id) }}> <MoreHorizIcon fontSize="default" /> </Button>
                    </div>}

               <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{postData.tags.map((tag) => `#${tag} `)}</Typography>
               </div>

               <ButtonBase className={classes.cardAction} onClick={openPost}>
                    <Typography variant="h5" className={classes.title} gutterBottom component="h2">{postData.title}</Typography>

                    <CardContent>
                         <Typography variant="body2" color="textSecondary" component="p">{reduceLength(postData.message)}</Typography>
                    </CardContent>
               </ButtonBase>

               <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user} onClick={() => { dispatch(likePost(postData._id)) }}>
                         <Likes />
                    </Button>
                    {(user?.result?.googleId === postData?.creator || user?.result?._id === postData?.creator) &&
                         <Button size="small" color="primary" onClick={() => { dispatch(deletePost(postData._id)) }}><DeleteIcon fontSize="small" />Delete</Button>}
               </CardActions>
          </Card>
     )
}

export default Post;