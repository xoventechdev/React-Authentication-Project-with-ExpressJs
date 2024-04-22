import express from 'express';
import { UserLogin, UserRegistration } from '../Controller/UserController.js';

const router = express.Router();

router.post('/user_registration', UserRegistration);
router.post('/user_login', UserLogin);





export default router;