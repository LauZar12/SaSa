import { Router } from 'express';

import { getAllUsers, addUser } from '../controllers/user.controllers.js';

const router = Router();

router.get("/users", getAllUsers)
router.post("/auth/register", addUser)

export default router;