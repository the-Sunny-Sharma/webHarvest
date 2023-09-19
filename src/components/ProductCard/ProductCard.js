// ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ products }) => { // Change prop name to 'products'
  return (
    <div className="product-card">
      {products.map((product) => ( // Map through 'products'
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>&#x20B9;{product.price.toFixed(2)}</p>
          <button className="add-to-cart-button">
              <span>Add to Cart</span>
            </button>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
