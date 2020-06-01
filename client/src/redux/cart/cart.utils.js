export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearItemFromCart = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const mergeCarts = (firestoreCart, localCart) => {
  const itemsNotInFirestoreCart = localCart.filter(
    (localCartItem) =>
      !firestoreCart.some(
        (firestoreCartItem) => firestoreCartItem.id === localCartItem.id
      )
  );

  return [
    ...firestoreCart.map((firestoreCartItem) => {
      const cartItem = localCart.find(
        (localCartItem) => localCartItem.id === firestoreCartItem.id
      );

      return cartItem
        ? {
            ...firestoreCartItem,
            quantity: firestoreCartItem.quantity + cartItem.quantity,
          }
        : firestoreCartItem;
    }),
    ...itemsNotInFirestoreCart,
  ];
};
