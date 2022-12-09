import express from 'express';
import { getComment, addComment } from '../controllers/comment.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

router.get('/:postId', getComment)
router.post('/', auth, addComment)

export default router;
