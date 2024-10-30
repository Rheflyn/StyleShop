// Fetch and display products
async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });
  }
  
  // Add to cart function
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  }
  
  // Display cart items on cart.html
  function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
  
    cartItems.innerHTML = cart.map(item => {
      total += item.quantity * item.price;
      return `<div>Product ID: ${item.productId}, Quantity: ${item.quantity}</div>`;
    }).join('');
  
    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Checkout function
  async function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    try {
      const response = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, total })
      });
      if (response.ok) {
        alert('Checkout successful!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }
  
  // Call displayCart on cart page load
  if (document.title.includes('Cart')) {
    displayCart();
  }
  
  // Fetch products on product page load
  if (document.title.includes('Products')) {
    fetchProducts();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
  
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(products => {
        productList.innerHTML = ''; // Clear placeholder content
        products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
  
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
          `;
  
          productList.appendChild(productCard);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  });