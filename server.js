const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'T-shirt', price: 19.99, description: 'A cool cotton T-shirt.', image: 'images/tshirt.jpg' },
  { id: 2, name: 'Jacket', price: 49.99, description: 'A warm, stylish jacket.', image: 'images/jacket.jpg' }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/checkout', (req, res) => {
  console.log('Order received:', req.body);
  res.json({ message: 'Checkout complete' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));