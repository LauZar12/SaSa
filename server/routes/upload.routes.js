import { Router } from 'express';
import multer from 'multer';

import { uploadImage, editBusinessImage } from '../controllers/upload.controllers.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single('image'), uploadImage);
router.put("/:businessId/upload", upload.single('image'), editBusinessImage)

export default router;