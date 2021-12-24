import React from 'react'
import {Provider} from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from './reducers/authReducer';
import token from './reducers/tokenReducer';
import users from './reducers/usersReducer';

// Reducers
import { cartReducer } from "./reducers/cartReducers";
import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";


import {
  getImagesReducer,
  getImageDetailsReducer,
} from "./reducers/imageReducers";

import {
  getGreenhousesReducer,
  getGreenhouseDetailsReducer,
} from "./reducers/greenhouseReducers";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  getImages: getImagesReducer,
  getImageDetails: getImageDetailsReducer,
  getGreenhouses: getGreenhousesReducer,
  getGreenhouseDetails: getGreenhouseDetailsReducer,
  auth,
  token,
  users,

});

const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;
