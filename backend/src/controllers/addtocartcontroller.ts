import { Request, Response } from 'express';
import CartService from '../service/addtocart.js';
class CartController {
  async addToCart(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const cartItem = await CartService.addToCart(productId, quantity);
      res.status(201).json({ success: true, data: cartItem });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding product to cart', error });
    }
  }

  async getCartItems(req: Request, res: Response) {
    try {
      const cartItems = await CartService.getCartItems();
      res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving cart items', error });
    }
  }
}
export default new CartController();
