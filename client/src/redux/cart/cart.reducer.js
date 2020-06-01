import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  error: "",
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.ADD_TO_CART_SUCCESS:
    case CartActionTypes.REMOVE_FROM_CART_SUCCESS:
    case CartActionTypes.CLEAR_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CartActionTypes.ADD_TO_CART_FAILURE:
    case CartActionTypes.REMOVE_FROM_CART_FAILURE:
    case CartActionTypes.CLEAR_ITEM_FROM_CART_FAILURE:
    case CartActionTypes.PRELOAD_CART_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };
    case CartActionTypes.PRELOAD_CART_DATA_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
