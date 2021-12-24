import React, { Component }  from 'react';

import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

// Components
import Product from "../products/product-item.component";

//Actions
import { getProducts as listProducts } from "../../../redux/actions/productActions";

const HomePage = ({ trans }) => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homepage">
      <h2 className="homepage__title">Latest Products</h2>
      <div className="homepage__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => {
            if (product.type === 1)
              return (
              <Product
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                productId={product._id}
              />)
            return null
          }
        ))}
      </div>
    </div>
  );
};

export default HomePage;