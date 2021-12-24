import React, { Component }  from 'react';

import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import ImageItem from "../products/image-item.component";

//Actions
import { getImages as listImages } from "../../../redux/actions/imageAction";

const GalleryPage = ({ trans }) => {
  const dispatch = useDispatch();
  const getImages = useSelector((state) => state.getImages);
  const { images, loading, error } = getImages;

  useEffect(() => {
    dispatch(listImages());
  }, [dispatch]);

  return (
    <div className="homepage">
      <h2 className="homepage__title">Your Plants</h2>
      <div className="homepage__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          images.map((image) => {
            if (image.type === "image")  
            return (
              <ImageItem
                greenhouse={image.greenhouse}
                level={image.level}
                id={image._id}
                diagnosis={image.diagnosis}
                url={image.url}
                name={image.name}
                type={image.type}
              />)
            return null
        
          }
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;