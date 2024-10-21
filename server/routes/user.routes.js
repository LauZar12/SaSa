import { Router } from 'express';

import { getAllUsers, addUser, getUserForLogin, getUserProfile } from '../controllers/user.controllers.js';

const router = Router();

router.get("/users", getAllUsers)
router.post("/auth/register", addUser)
router.post('/auth/login', getUserForLogin);
router.get('/profile/:userId', getUserProfile);

export default router;