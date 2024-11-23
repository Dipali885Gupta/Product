//page for creating new product when clicking the add new page button it will go to the create product page
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createProduct } from  '../utils/api';
export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1); // Default quantity set to 1
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the page from reloading on form submit

    if (!name || !description || price <= 0 || quantity <= 0) {
      setError('Please fill in all fields with valid values.');
      return;
    }
    try {
        // Call API to create the product
        const newProduct = { name, description, price, quantity };
        const createdProduct = await createProduct(newProduct);  // Make sure this API function exists
  
        // If product creation is successful, navigate back to the homepage
        router.push('/');
      } catch (err) {
        console.error('Error creating product:', err);
        setError('An error occurred while creating the product.');
      }
    };
    return (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block font-semibold" htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
    
            {/* Description Input */}
            <div>
              <label className="block font-semibold" htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
    
            {/* Price Input */}
            <div>
              <label className="block font-semibold" htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
                min="0.01"
              />
            </div>
    
            {/* Quantity Input */}
            <div>
              <label className="block font-semibold" htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
                min="1"
              />
            </div>
    
            {/* Display error message if any */}
            {error && <p className="text-red-500">{error}</p>}
    
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </form>
        </div>
      );
    }
