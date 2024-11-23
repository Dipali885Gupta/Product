import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchProducts } from '../app/utils/api'; // Importing the fetchProducts function

export default function Home() {
  const [products, setProducts] = useState<any[]>([]); 
  // State to hold the list of products
  const [cartCount, setCartCount] = useState<number>(0); // Store cart count
  const router = useRouter(); // Use Next.js router for navigation

  // Effect hook to load products when the component mounts
  useEffect(() => {
    // This function fetches the products from the backend API
    async function fetchData() {
      const productsData = await fetchProducts();  // Fetching products
      setProducts(productsData);  // Storing products in the state
    }

    fetchData(); // Calling the function to load products
  }, []); // Empty array ensures this effect runs only once after the initial render
  const handleAddToCart = async (product: any) => {
    setLoading(true); // Set loading state to true while processing
    setError(null); // Clear any existing errors

    try {
      // Sending product details to the backend to add to the cart
      const response = await axios.post('http://localhost:4000/api/cart/addtocart', {
        productId: product.id, // Send the product ID
        quantity: 1, // Default quantity set to 1
      });

      if (response.data.success) {
        setCartCount((prevCount) => prevCount + 1); // Increment cart count
      }
    } catch (err: any) {
      // Handle any errors
      setError('Failed to add product to cart. Please try again.');
      console.error(err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return (
    <div className="container mx-auto p-6">  {/* Container for centering and padding */}
      <h1 className="text-3xl font-bold mb-6">Product List</h1>  {/* Title */}

      {/* Button to navigate to the Add New Product page */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/add-product')} // Navigates to the 'add-product' page
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" // Tailwind CSS styling
        >
          Add New Product
        </button>

        <button
          onClick={() => router.push('/add-product')} // Navigates to the 'add-product' page
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" // Tailwind CSS styling
        >
          Cart
        </button>
      </div>

      {/* Product grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Loop through each product and display it */}
        {products.map((product) => {
          return (
            <div key={product.id} className="p-4 bg-white shadow-md rounded-lg">
              {/* Product Name */}
              <h3 className="text-xl font-semibold">{product.name}</h3>
              {/* Product Description */}
              <p>{product.description}</p>
              {/* Product Price */}
              <p className="mt-2 text-lg font-bold">${product.price}</p>
              <button
              onClick={() => handleAddToCart(product)} // Calls handleAddToCart on click
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>

              

            </div>
          );
        })}
      </div> {/* End of product grid */}
    </div>  
  );
}
