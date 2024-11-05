import { Router } from 'express';

import { createSurpriseBox, deleteSurpriseBox, editSurpriseBox, getAllSurpriseBoxesFromBusiness, getSurpriseBoxInfo } from '../controllers/surprisebox.controllers.js';

const router = Router();

router.post('/:businessId/surprise-boxes/create-surprise-box', createSurpriseBox)
router.get('/:businessId/surprise-boxes', getAllSurpriseBoxesFromBusiness)
router.get('/:businessId/surprise-boxes/:surpBoxId', getSurpriseBoxInfo)
router.put('/:businessId/surprise-boxes/:surpboxId/edit-surprise-box', editSurpriseBox)
router.delete('/:businessId/surprise-boxes/:surpboxId/delete-surprise-box', deleteSurpriseBox)

export default router;