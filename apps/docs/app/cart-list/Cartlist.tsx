import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCartItems } from '../utils/api'; // Import the API function to fetch cart items

export default function CartList() {
  const [cartItems, setCartItems] = useState<any[]>([]); // State to hold cart items
  const router = useRouter(); // Next.js router for navigation
  useEffect(() => {
    async function loadCartItems() {
      const cartData = await fetchCartItems(); // Fetching cart items from the backend
      setCartItems(cartData.data); // Setting the cart items in the state
    }
    loadCartItems();
  }, []);
  return (
    <div className="container mx-auto p-6">
      {/* Cart Page Header */}
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
       {/* Button to navigate back to the main page */}
       <button
        onClick={() => router.push('/')} // Navigate to the main page
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
      >
        Back to Products
      </button>
   {/* Check if cart is empty */}
   {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Loop through the cart items */}
          {cartItems.map((item) => (
            <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
              {/* Product Name */}
              <h3 className="text-xl font-semibold">{item.Product.name}</h3>
              {/* Product Description */}
              <p>{item.Product.description}</p>
              {/* Product Price */}
              <p className="mt-2 text-lg font-bold">${item.Product.price}</p>
              {/* Quantity in Cart */}
              <p className="mt-2">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}