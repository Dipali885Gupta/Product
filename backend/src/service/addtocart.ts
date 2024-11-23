import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CartService {
  async addToCart(productId: number, quantity: number) {
    // Check if the product already exists in the cart
    const existingCartItem = await prisma.cart.findFirst({
      where: { productId },
    });
    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      return await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // If the product is not in the cart, create a new cart item
      return await prisma.cart.create({
        data: { productId, quantity },
      });
    }
  }

  async getCartItems() {
    // Retrieve all cart items with product details
    return await prisma.cart.findMany({
      include: { Product: true },
    });
  }
}
export default new CartService();