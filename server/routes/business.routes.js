import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllBusinesses, ola, getBusinessInfo, editBusinessInfo } from '../controllers/business.controllers.js';


const router = Router();

router.get("/businesses", getAllBusinesses)
router.get("/businesses/ola", ola)
router.get("/admin/businesses/:businessId", getBusinessInfo)
router.put("/admin/businesses/:businessId/edit-info", editBusinessInfo)


export default router;