import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusiness } from "../controllers/product.controllers.js"

const router = Router();

router.get("/products", getAllProductsFromBusiness)

export default router;