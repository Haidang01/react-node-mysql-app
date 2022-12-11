import express from 'express';
import { getUser, updateUser, getAllUser } from '../controllers/user.js';
import { auth } from '../middleware/auth.js'


const router = express.Router();

router.get('/find/:userId', getUser)
router.get('/', auth, getAllUser)
router.put('/', auth, updateUser)

export default router;
