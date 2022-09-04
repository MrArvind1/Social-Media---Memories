import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, TextField, AppBar, Button } from "@material-ui/core";

import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input"

import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import Pagination from "../Pagination/Paginate"

import useStyles from "./styles";

import {getPostBySearch } from "../../actions/post";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {

    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    // console.log(page)
    const searchQuery = query.get('search');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    useEffect(() => {
    }, [currentId]);

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            // Search for the tag
        }
    }

    const handleChange = (event) => {
        const { value } = event.target
        setSearch(value)
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete)) 

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostBySearch({search, tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                autoComplete='off'
                                name='search'
                                label={'Search Memories'}
                                value={search}
                                variant='outlined'
                                fullWidth
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                variant='outlined'
                                label={`Search Tags`}
                            />
                            <Button className={classes.searchButton} onClick={searchPost} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && 
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page}/>
                        </Paper>}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
