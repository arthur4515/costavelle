import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, 'database', 'products.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function getProducts() {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
}

function filterProducts(query) {
  const { category, gender, size, minPrice, maxPrice } = query;
  const products = getProducts();

  return products.filter(product => {
    const categoryMatch = !category || product.category.toLowerCase() === String(category).toLowerCase();
    const genderMatch = !gender || product.gender.toLowerCase() === String(gender).toLowerCase();
    const sizeMatch = !size || product.sizes.includes(String(size).toUpperCase());
    const minMatch = !minPrice || product.price >= Number(minPrice);
    const maxMatch = !maxPrice || product.price <= Number(maxPrice);

    return categoryMatch && genderMatch && sizeMatch && minMatch && maxMatch;
  });
}

app.get(['/products', '/api/products'], (req, res) => {
  res.json(filterProducts(req.query));
});

app.get(['/products/:id', '/api/products/:id'], (req, res) => {
  const products = getProducts();
  const product = products.find(item => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`CostaVelle API running on http://localhost:${PORT}`);
});
