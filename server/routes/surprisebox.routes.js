import { Router } from 'express';

import { createSurpriseBox, deleteSurpriseBox, editSurpriseBox, getAllSurpriseBoxesFromBusiness } from '../controllers/surprisebox.controllers.js';

const router = Router();

router.post('/admin/businesses/:businessId/surprise-boxes/create-surprise-box', createSurpriseBox)
router.get('/admin/businesses/:businessId/surprise-boxes', getAllSurpriseBoxesFromBusiness)
router.put('/admin/businesses/:businessId/surprise-boxes/:surpboxId/edit-surprise-box', editSurpriseBox)
router.delete('/admin/businesses/:businessId/surprise-boxes/:surpboxId/delete-surprise-box', deleteSurpriseBox)

export default router;