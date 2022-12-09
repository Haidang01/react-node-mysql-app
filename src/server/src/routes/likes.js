import express from 'express';
import { getLikes, likePost } from '../controllers/like.js';
import { auth } from '../middleware/auth.js'


const router = express.Router();

router.get('/:postId', getLikes)
router.put('/:postId', auth, likePost)

export default router;
