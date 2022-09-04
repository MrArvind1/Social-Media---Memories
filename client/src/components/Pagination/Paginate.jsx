import React, {useEffect} from 'react'
import { Pagination, PaginationItem } from "@material-ui/lab";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import useStyles from "./styles"
import { getPost } from '../../actions/post';

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {numberOfPages} = useSelector((store)=> store.posts)

    // console.log(numberOfPages);

    useEffect(()=>{
        if(page) dispatch(getPost(page))
    }, [page, dispatch])

    return (
        <Pagination
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page)||1}
            variant="outlined"
            color='primary'
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate
