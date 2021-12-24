import React, { Component }  from 'react';

import "./product.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Product = ({ imageUrl, description, price, name, productId }) => {
  const { t } = useTranslation();

  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)+"..."}</p>
        

        <p className="info__price">${price}</p>

        <Link to={`/product/${productId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;