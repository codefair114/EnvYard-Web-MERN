import React, { Component }  from 'react';
import axios from 'axios';

import "./cartpage.css";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PayPal from './paypal.component';
// Components
import CartItem from "./cart-item.component";
import {
  onSuccessBuy
} from '../../../redux/actions/usersAction';
// Actions
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";

function CartPage (props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)
  const [ShowSuccess, setShowSuccess] = useState(false)

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const transactionSuccess = (data) => {
    dispatch(onSuccessBuy({
        cartDetail: "Purchase Tesla",
        paymentData: data
    }))
        .then(response => {
            if (response.payload.success) {
                setShowSuccess(true)
                setShowTotal(false)
            }
        })
  }

  const transactionError = () => {
      console.log('Paypal error')
  }

  const transactionCanceled = () => {
      console.log('Transaction canceled')
  }

  const addOrder = (lname, lamount) => {
    const order = {

      name: lname,
      amount: lamount
  }


  axios.post('/orders/add', order)
    .then(res => console.log(res.data));
  }

  return (
    <>
      <div className="cartpage">
        <div className="cartpage__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>
        <PayPal
          toPay={getCartSubTotal()} onClick={addOrder(toString(cartItems), getCartSubTotal())}/>
        </div>
       
    </>
  );
};

export default CartPage;