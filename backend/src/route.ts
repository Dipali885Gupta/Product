import express from 'express';
import { Router } from 'express';
import ProductController from './controllers/getnewproductcontroller.js';
import CartController from './controllers/addtocartcontroller.js'
const router = express.Router();
router.post('/add', ProductController.createProduct); // POST to create a new product
router.get('/show', ProductController.getAllProducts);    // Endpoint to get all products
router.post('/addtocart', CartController.addToCart); // Endpoint to add a product to the cart
router.get('/getcartproducts', CartController.getCartItems);  // Endpoint to get all cart items

export default router;
