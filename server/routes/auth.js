import express from 'express';
import { register, login, forgotpassword, resetpassword } from '../controller/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotpassword);
router.put('/resetpassword/:resetToken', resetpassword);

export default router;
