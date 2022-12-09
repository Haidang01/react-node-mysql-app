import express from 'express';
import { getPosts, addPost, getPostCurrent, deletePost } from '../controllers/post.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

router.get('/:userId', auth, getPostCurrent);
router.get('/', auth, getPosts);
router.post('/', auth, addPost);
router.delete('/:postId/:userId', auth, deletePost);

export default router;
