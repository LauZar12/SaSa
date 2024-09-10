import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusinessV2, getBusinessInfo} from "../controllers/product.controllers.js"

const router = Router();


router.get('/businesses/:businessId', getAllProductsFromBusinessV2);
//router.post('/admin/businesses/:businessId', getBusinessInfo)

export default router;