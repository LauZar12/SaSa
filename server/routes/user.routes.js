import { Router } from 'express';

import { getAllUsers, addUser, getUserForLogin } from '../controllers/user.controllers.js';

const router = Router();

router.get("/users", getAllUsers)
router.post("/auth/register", addUser)
router.post('/auth/login', getUserForLogin);

export default router;