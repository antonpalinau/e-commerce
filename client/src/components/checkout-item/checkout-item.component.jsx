import React from "react";
import { connect } from "react-redux";
import "./checkout-item.styles.scss";
import {
  clearItemFromCartStart,
  addToCartStart,
  removeFromCartStart,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItemFromCartStart, addToCartStart, removeFromCartStart }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeFromCartStart(cartItem)}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addToCartStart(cartItem)}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div onClick={() => clearItemFromCartStart(cartItem)} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCartStart: (item) => dispatch(clearItemFromCartStart(item)),
  addToCartStart: (item) => dispatch(addToCartStart(item)),
  removeFromCartStart: (item) => dispatch(removeFromCartStart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
