import { Router } from 'express';

import { getAllUsers, addUser, getUserForLogin, getUserProfile } from '../controllers/user.controllers.js';

const router = Router();

router.get("/", getAllUsers)
router.post("/register", addUser)
router.post('/login', getUserForLogin);
router.get('/:userId', getUserProfile);

export default router;