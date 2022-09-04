import express from "express";
import {getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getSinglePost} from "../controller/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router();

router.get('/', getPosts);
router.get(`/search`, getPostsBySearch)
router.get('/:id', getSinglePost)
router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

router.patch("/:id/likepost", auth, likePost)

export default router;