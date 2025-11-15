const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

const productsPath = path.join(__dirname, 'products.json');

app.get('/api/products', (req, res) => {
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading products.json:", err);
      return res.status(500).json({ error: "Failed to read products file" });
    }
    try {
      const products = JSON.parse(data);
      if (!Array.isArray(products)) {
        return res.status(500).json({ error: "Products data is not an array" });
      }
      res.json(products);
    } catch (e) {
      console.error("Invalid JSON in products.json:", e);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.get('/api/products/:id', (req, res) => {
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({});

    try {
      const products = JSON.parse(data);
      const p = products.find(x => x.id === req.params.id);
      if (!p) return res.status(404).json({ error: "Product not found" });
      res.json(p);
    } catch (e) {
      return res.status(500).json({});
    }
  });
});

app.post('/api/orders', (req, res) => {
  const orderId = 'ORDER-' + Date.now();
  console.log("Order placed:", orderId, req.body || {});
  res.json({ orderId });
});

app.get('/api/experiment', (req, res) => {
  res.json({ variant: Math.random() > 0.5 ? 'A' : 'B' });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
