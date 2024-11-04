import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllBusinesses, ola, getBusinessInfo, editBusinessInfo, getBusinessMapInfo } from '../controllers/business.controllers.js';


const router = Router();

router.get("/businesses", getAllBusinesses)
router.get("/businesses/ola", ola)
router.get("/admin/businesses/:businessId", getBusinessInfo)
router.put("/admin/businesses/:businessId/edit-info", editBusinessInfo)
router.get("/businesses/business/get-info", getBusinessMapInfo)


export default router;