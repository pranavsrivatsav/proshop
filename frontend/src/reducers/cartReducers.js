import {
  CART_ADD_ITEM,
  CART_LOAD_ITEMS,
  CART_RELOAD,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_LOAD_ITEMS: {
      return action.payload;
    }

    case CART_ADD_ITEM: {
      return action.payload;
    }

    case CART_REMOVE_ITEM: {
      const { product } = action.payload;
      const cartItems = state.cartItems.filter(
        (item) => item.product !== product
      );

      return { cartItems };
    }

    case CART_UPDATE_ITEM: {
      const { product, qty } = action.payload;
      const cartItems = state.cartItems;
      const itemIndex = cartItems.findIndex((item) => item.product === product);

      cartItems[itemIndex].qty = qty;

      return { cartItems };
    }

    case CART_RELOAD: {
      return { ...state, reload: true };
    }
    default:
      return state;
  }
};
