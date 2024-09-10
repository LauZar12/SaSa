import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusinessV2, getBusinessProducts, createProduct, editProduct, getProductInfo} from "../controllers/product.controllers.js"

const router = Router();


router.get('/businesses/:businessId', getAllProductsFromBusinessV2);
router.get('/admin/businesses/:businessId/products', getBusinessProducts)
router.post('/admin/businesses/:businessId/products/create-product', createProduct)
router.put('/admin/businesses/:businessId/products/:productId/edit-product', editProduct);
router.get('/admin/businesses/:businessId/products/:productId', getProductInfo);

export default router;