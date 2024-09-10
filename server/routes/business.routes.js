import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllBusinesses, ola, getBusinessInfo } from '../controllers/business.controllers.js';


const router = Router();

router.get("/businesses", getAllBusinesses)
router.get("/businesses/ola", ola)
router.get("/admin/businesses/:businessId", getBusinessInfo)


export default router;