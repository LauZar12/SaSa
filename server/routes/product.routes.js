import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusinessV2, getBusinessProducts, createProduct, editProduct, getProductInfo, deleteProduct} from "../controllers/product.controllers.js"

const router = Router();


router.get('/businesses/:businessId', getAllProductsFromBusinessV2);
router.get('/admin/businesses/:businessId/products', getBusinessProducts)
router.post('/admin/businesses/:businessId/products/create-product', createProduct) //create product
router.put('/admin/businesses/:businessId/products/:productId/edit-product', editProduct); // update product
router.get('/admin/businesses/:businessId/products/:productId', getProductInfo); // get a single product info
router.delete('/admin/businesses/:businessId/products/:productId/delete-product', deleteProduct);


export default router;