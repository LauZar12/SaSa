import { Router } from 'express';

import { getAllBusinesses, ola, getBusinessInfo, editBusinessInfo } from '../controllers/business.controllers.js';

const router = Router();

router.get("/", getAllBusinesses)
router.get("/ola", ola)
router.get("/:businessId", getBusinessInfo)
router.put("/:businessId/edit-info", editBusinessInfo)


export default router;

