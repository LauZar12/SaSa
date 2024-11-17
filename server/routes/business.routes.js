import { Router } from 'express';

import { getAllBusinesses, ola, getBusinessInfo, editBusinessInfo, getBusinessMapInfo } from '../controllers/business.controllers.js';

const router = Router();

router.get("/", getAllBusinesses)
router.get("/ola", ola)
router.get("/get-info", getBusinessMapInfo)
router.get("/:businessId", getBusinessInfo)
router.put("/:businessId/edit-info", editBusinessInfo)
router.put("/:businessId/edit-address", editBusinessInfo)


export default router;

