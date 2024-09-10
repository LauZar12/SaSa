import { Router } from 'express';

import { getAllUsers } from '../controllers/user.controllers.js';

const router = Router();

router.get("/users", getAllUsers)

export default router;