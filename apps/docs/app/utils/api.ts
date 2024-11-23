import axios from 'axios';
export const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      return response.data; // return the products array
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  //creating new products
export async function createProduct(productData: { name: string; description: string; price: number; quantity: number }) {
    try {
      const response = await axios.post('http://localhost:4000/api/products', productData);  // API endpoint for creating a product
      return response.data;
    } catch (error) {
      throw new Error('Error creating product: ' + error.message);
    }
  }

  // Add product to the cart
  export  async function fetchCartItems() 
  {
    try {
    const response = await axios.get('http://localhost:4000/api/getcartproducts');
    return response.data; // return the products array
   } catch (error) {
  console.error("Error fetching products:", error);
  return [];
}
  };
  
