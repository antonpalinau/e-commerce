import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const addToCartStart = (item) => ({
  type: CartActionTypes.ADD_TO_CART_START,
  payload: item,
});

export const addToCartSuccess = (newCartItems) => ({
  type: CartActionTypes.ADD_TO_CART_SUCCESS,
  payload: newCartItems,
});

export const addToCartFailure = (error) => ({
  type: CartActionTypes.ADD_TO_CART_FAILURE,
  payload: error,
});

export const removeFromCartStart = (item) => ({
  type: CartActionTypes.REMOVE_FROM_CART_START,
  payload: item,
});

export const removeFromCartSuccess = (newCartItems) => ({
  type: CartActionTypes.REMOVE_FROM_CART_SUCCESS,
  payload: newCartItems,
});

export const removeFromCartFailure = (error) => ({
  type: CartActionTypes.REMOVE_FROM_CART_FAILURE,
  payload: error,
});

export const clearItemFromCartStart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART_START,
  payload: item,
});

export const clearItemFromCartSuccess = (newCartItems) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART_SUCCESS,
  payload: newCartItems,
});

export const clearItemFromCartFailure = (error) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART_FAILURE,
  payload: error,
});

export const preloadCartDataSuccess = (cartData) => ({
  type: CartActionTypes.PRELOAD_CART_DATA_SUCCESS,
  payload: cartData,
});

export const preloadCartDataFailure = (error) => ({
  type: CartActionTypes.PRELOAD_CART_DATA_FAILURE,
  payload: error,
});
