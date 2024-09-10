import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusinessV2 } from "../controllers/product.controllers.js"

const router = Router();


router.get('/businesses/:businessId', getAllProductsFromBusinessV2);

export default router;