import { Request, Response } from 'express';
import ProductService from '../service/getnewproductservice.js'
// Function to get all products

class ProductController {
  // Method to handle the creation of a new product
  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, description, quantity } = req.body;
      const newProduct = await ProductService.createProduct({ name, price, description, quantity });
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating product', error });
    }
  }
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving products', error });
    }
  }
}
export default new ProductController();
