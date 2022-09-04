import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import useStyles from "./styles"

import FileBase from "react-file-base64"

import { Typography, Button, TextField, Paper } from "@material-ui/core"

import { createPost, updatePost } from "../../actions/post"
import { useHistory } from "react-router-dom"

const Form = ({ setCurrentId, currentId }) => {
     const classes = useStyles();
     const history = useHistory();

     const [postData, setPostData] = React.useState({
          title: '',
          message: '',
          tags: '',
          selectedFile: ''
     })

     const oldPost = useSelector((store) => { return (currentId ? store.posts.posts.find((p) => { return p._id === currentId }) : null) });
     const dispatch = useDispatch();

     const user = JSON.parse(localStorage.getItem('profile'))

     useEffect(() => {
          if (oldPost) {
               console.log('hi')
               setPostData(oldPost)}
     }, [oldPost])

     const handleSubmit = (event) => {
          event.preventDefault();

          if (currentId) {
               dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          }
          else {
               dispatch(createPost({ ...postData, name: user?.result?.name }, history));
          }

          clearForm();

     }


     function handleChange(event) {
          let { name, value } = event.target;

          if (name === 'tags') {
               value = value.split(',');
          }
          setPostData((prev) => {
               return {
                    ...prev,
                    [name]: value
               }
          })
     }

     const clearForm = () => {
          setCurrentId(null);
          setPostData({ title: '', message: '', tags: '', selectedFile: '' });
     }

     if (!user?.result?.name) {
          return (
               <Paper className={classes.paper}>
                    < form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`}>
                         <Typography variant='h6'>
                              Please Sign In to Create Memories and View Your Friends.
                    </Typography>
                    </form>
               </Paper>
          )
     }

     return (
          <Paper className={classes.paper} elevation={6}>
               < form autoComplete="off" noValidate onSubmit={handleSubmit} className={`${classes.form} ${classes.root}`}>
                    <Typography variant="h6" >{currentId ? `Editing` : `Creating`} Memories</Typography>

                    <TextField
                         name="title"
                         label="Title"
                         variant="outlined"
                         fullWidth
                         value={postData.title}
                         onChange={handleChange}
                    />

                    <TextField
                         name="message"
                         label="Message"
                         variant="outlined"
                         fullWidth
                         value={postData.message}
                         onChange={handleChange}
                         multiline rows={4}
                    />
                    <TextField
                         name="tags"
                         label="Tags"
                         variant="outlined"
                         fullWidth
                         value={postData.tags}
                         onChange={handleChange}
                    />

                    <div className={classes.fileInput}>
                         <FileBase
                              type="file"
                              multiple={false}
                              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>

                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>

                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" fullWidth onClick={clearForm} >Clear</Button>

               </form>
          </Paper>
     );
}

export default Form;