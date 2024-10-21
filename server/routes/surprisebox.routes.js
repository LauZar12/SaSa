import { Router } from 'express';

import { createSurpriseBox, editSurpriseBox, getAllSurpriseBoxesFromBusiness } from '../controllers/surprisebox.controllers.js';

const router = Router();

router.post('/admin/businesses/:businessId/surprise-boxes/create-surprise-box', createSurpriseBox)
router.get('/admin/businesses/:businessId/surprise-boxes', getAllSurpriseBoxesFromBusiness)
router.put('/admin/businesses/:businessId/surprise-boxes/:surpboxId/edit-surprise-box', editSurpriseBox)

export default router;