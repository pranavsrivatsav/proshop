import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const newCartitem = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === newCartitem.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? newCartitem : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, newCartitem] };
      }
    }

    case CART_REMOVE_ITEM: {
      const cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== action.payload
      );
      return { ...state, cartItems };
    }
    default:
      return state;
  }
};
