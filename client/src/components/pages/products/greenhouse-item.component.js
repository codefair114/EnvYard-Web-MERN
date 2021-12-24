import React, { Component }  from 'react';

import "./product.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";

import i18next from 'i18next';

const GreenhouseItem = ({ email, gid, name, surface, imageUrl }) => {
  const { t } = useTranslation();
  const auth = useSelector(state => state.auth)
  const {user, isLogged, isAdmin, isSupport } = auth

  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{'ID'+gid}</p>
        

        <p className="info__price">{surface}</p>

        <Link to={`/telemetry/${gid}`} className="info__button">
          View Telemetry
        </Link>
      </div>
    </div>
  );
};

export default GreenhouseItem;