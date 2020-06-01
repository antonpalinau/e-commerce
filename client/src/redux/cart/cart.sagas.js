import { all, call, takeLatest, put, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import CartActionTypes from "../cart/cart.types";
import {
  clearCart,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartSuccess,
  removeFromCartFailure,
  clearItemFromCartSuccess,
  clearItemFromCartFailure,
  preloadCartDataSuccess,
  preloadCartDataFailure
} from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  mergeCarts
} from "./cart.utils";

import { updateFirestoreCartItems, getUserCartData } from "../../firebase/firebase.utils";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* preloadAndMergeCartData({ payload: user, preloadCart }){
  try {
    console.log('DATA', user, preloadCart);
    if (!preloadCart) return;
    const localCart = yield select(selectCartItems);
    const firestoreCart = yield call(getUserCartData, user.id);
    const mergedCart = yield call(mergeCarts, firestoreCart, localCart);
    console.log('localCart', localCart);
    console.log('firestoreCart', firestoreCart);
    console.log('mergedCart', mergedCart);
    yield call(updateFirestoreCartItems, user, mergedCart);
    yield put(preloadCartDataSuccess(mergedCart));
  } catch (error){
    yield put(preloadCartDataFailure(error));
  }
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, preloadAndMergeCartData);
}

export function* addToCart({ payload: item }) {
  try {
    const cartItems = yield select(selectCartItems);
    const newCartItems = yield call(addItemToCart, cartItems, item);
    const user = yield select(selectCurrentUser);

    if (user) {
      yield call(updateFirestoreCartItems, user, newCartItems);
    }

    yield put(addToCartSuccess(newCartItems));
  } catch (error) {
    yield put(addToCartFailure(error));
  }
}

export function* removeFromCart({ payload: item }) {
  try {
    const cartItems = yield select(selectCartItems);
    const newCartItems = yield call(removeItemFromCart, cartItems, item);
    const user = yield select(selectCurrentUser);

    if (user) {
      yield call(updateFirestoreCartItems, user, newCartItems);
    }

    yield put(removeFromCartSuccess(newCartItems));
  } catch (error) {
    yield put(removeFromCartFailure(error));
  }
}

export function* clearFromCart({ payload: item }) {
  try {
    const cartItems = yield select(selectCartItems);
    const newCartItems = yield call(clearItemFromCart, cartItems, item);
    const user = yield select(selectCurrentUser);

    if (user) {
      yield call(updateFirestoreCartItems, user, newCartItems);
    }

    yield put(clearItemFromCartSuccess(newCartItems));
  } catch (error) {
    yield put(clearItemFromCartFailure(error));
  }
}

export function* onAddToCartStart() {
  yield takeLatest(CartActionTypes.ADD_TO_CART_START, addToCart);
}

export function* onRemoveFromCartStart() {
  yield takeLatest(CartActionTypes.REMOVE_FROM_CART_START, removeFromCart);
}

export function* onClearItemFromCart() {
  yield takeLatest(
    CartActionTypes.CLEAR_ITEM_FROM_CART_START,
    clearFromCart
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onAddToCartStart),
    call(onRemoveFromCartStart),
    call(onClearItemFromCart),
    call(onSignInSuccess)
  ]);
}
