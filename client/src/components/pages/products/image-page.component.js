import React, { Component }  from 'react';

import "./products-page.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getImageDetails } from "../../../redux/actions/imageAction";

const ImagePage = ({ match, history }) => {
  const dispatch = useDispatch();

  const imageDetails = useSelector((state) => state.getImageDetails);
  const { loading, error, image } = imageDetails;

  useEffect(() => {
    if (image && match.params.id !== image._id) {
      dispatch(getImageDetails(match.params.id));
    }
  }, [dispatch, match, image]);

  return (
    <div className="productpage">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productpage__left">
            <div className="left__image">
              <img src={image.url} alt={image.name} />

            </div>
            <div className="left__info">
              <p className="left__name">{image.name}</p>
              <p>Level: {image.level}</p>
              <p>Description: {image.level}</p>
            </div>
          </div>
          <div className="productpage__right">
            <div className="right__info">
              <p>
                Greenhouse:
                <span>${image.greenhouse}</span>
              </p>
              <p>
                Status:
                <span>
                  {image.diagnosis}
                </span>
              </p>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImagePage;