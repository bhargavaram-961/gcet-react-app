import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import './Products.css';

export default function Product() {
  const {user}= useContext(AppContext);
  const [products,setProducts]=useState([]);
  const API=import.meta.env.VITE_API_URL
  useEffect(()=>{
    fetch(`${API}products`)
      .then(res=>res.json())
      .then(data=>setProducts(data))
      .catch(er=>console.error(err));
  }, []);
  return (
    <main>
      <div className="products-container fade-in">
        <h3>Welcome {user?.name?user.name:'Guest'}!</h3>
        <div className="welcome-message">
          Browse our amazing collection of products
        </div>
        <div className="products-grid">
          {products.map(product=>(
            <div key={product.id}className="product-card">
              <h4>{product.name}</h4>
              <p className="price">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}