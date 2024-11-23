import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProductService {
  async createProduct(data: { name: string; price: number; description: string; quantity: number }) {
    return await prisma.product.create({ data });
  }
  async getAllProducts() {
    return await prisma.product.findMany();
  }
}
export default new ProductService();
