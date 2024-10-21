import { Router } from 'express';

import { createSurpriseBox, getAllSurpriseBoxesFromBusiness } from '../controllers/surprisebox.controllers.js';

const router = Router();

router.post('/admin/businesses/:businessId/surprise-boxes/create-surprise-box', createSurpriseBox)
router.get('/admin/businesses/:businessId/surprise-boxes', getAllSurpriseBoxesFromBusiness)

export default router;