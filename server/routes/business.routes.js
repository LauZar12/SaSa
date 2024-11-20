import { Router } from 'express';

import { getAllBusinesses, ola, getBusinessInfo, editBusinessInfo, getBusinessMapInfo, getDonationBusinessesInfo, getDonationBusinessByType, getBusinessesByCategory } from '../controllers/business.controllers.js';

const router = Router();

router.get("/", getAllBusinesses)
router.get("/ola", ola)
router.get("/get-info", getBusinessMapInfo)
router.get("/:businessId", getBusinessInfo)
router.get("/donations", getDonationBusinessesInfo)
router.get("/donations/:businessType", getDonationBusinessByType)
router.put("/:businessId/edit-info", editBusinessInfo)
router.put("/:businessId/edit-address", editBusinessInfo)
router.get("/category/:category", getBusinessesByCategory)


export default router;

