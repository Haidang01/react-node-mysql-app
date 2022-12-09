import express from 'express';
import { login, logout, register, getProfile } from '../controllers/auth.js';


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/:userId', getProfile)

export default router;
