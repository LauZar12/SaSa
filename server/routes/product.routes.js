import { Router } from 'express';
//import bodyParser from 'body-parser';

import { getAllProductsFromBusinessV2, getBusinessProducts, createProduct, editProduct, getProductInfo, deleteProduct} from "../controllers/product.controllers.js"

const router = Router();


router.get('/:businessId', getAllProductsFromBusinessV2);
router.get('/:businessId/products', getBusinessProducts)
router.post('/:businessId/products/create-product', createProduct) //create product
router.put('/:businessId/products/:productId/edit-product', editProduct); // update product
router.get('/:businessId/products/:productId', getProductInfo); // get a single product info
router.delete('/:businessId/products/:productId/delete-product', deleteProduct); // delete product from db


export default router;