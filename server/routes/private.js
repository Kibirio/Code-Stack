import express from 'express'
import { getPrivateData } from '../controller/private.js';
import { protect } from '../middleware/auth.js'

const router = express.Router();

router.get('/', protect, getPrivateData);


export default router;