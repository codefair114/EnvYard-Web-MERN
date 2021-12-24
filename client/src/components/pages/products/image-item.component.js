import React, { Component }  from 'react';

import "./product.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const ImageItem = ({ greenhouse, level, id, diagnosis, url, name, type }) => {
  const { t } = useTranslation();

  return (
    <div className="product">
    
      <img src={url} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{diagnosis}</p>
        

        <p className="info__price">{greenhouse}</p>
        <p>{level}</p>

      </div>
    </div>
  );
};

export default ImageItem;