import React, { Component }  from 'react';

import "./homepage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import GreenhouseItem from "../products/greenhouse-item.component";

//Actions
import { getGreenhouses as listGreenhouses } from "../../../redux/actions/greenhouseAction";

const GardenPage = ({ trans }) => {
  const dispatch = useDispatch();
  const getGreenhouses = useSelector((state) => state.getGreenhouses);
  const { greenhouses, loading, error } = getGreenhouses;
  const auth = useSelector(state => state.auth)

  const {user, isLogged, isAdmin, isSupport } = auth

  useEffect(() => {
    dispatch(listGreenhouses());
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
          greenhouses.map((greenhouse) => {
              if (greenhouse.email === user.email)
                return (
                <GreenhouseItem
                    email = {greenhouse.email}
                    gid = {greenhouse.gid}
                    name = {greenhouse.name}
                    surface = {greenhouse.surface}
                    imageUrl = {greenhouse.imageUrl}
                
                />)

              return null
          }
        ))}
      </div>
    </div>
  );
};

export default GardenPage;