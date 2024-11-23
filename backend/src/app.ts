import express, { Request, Response } from "express";
import ProductRoutes from '../src/route.js'
// import routes from "./routes";
import CartRoutes from '../src/route.js'


const app = express();

const PORT = process.env.PORT || '4000';
app.use(express.json());
app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes); // Use cart routes directly without any middleware

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;