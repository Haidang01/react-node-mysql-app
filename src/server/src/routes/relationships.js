import express from 'express';
import { relationship, getRelationships } from '../controllers/relationships.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

router.get('/:userId', getRelationships);
router.put('/:userId', auth, relationship)

export default router;