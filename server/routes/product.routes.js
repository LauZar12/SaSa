import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusiness, getAllProductsFromBusinessV2 } from "../controllers/product.controllers.js"

const router = Router();

router.get("/products", getAllProductsFromBusiness)
router.get("/productsV2", getAllProductsFromBusinessV2)

export default router;