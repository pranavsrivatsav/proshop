import {
  CART_ADD_ITEM,
  CART_FAIL,
  CART_LOAD_ITEMS,
  CART_REMOVE_ITEM,
  CART_SUCCESS,
  CART_UPDATE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_LOAD_ITEMS: {
      return { loading: true, ...state };
    }

    case CART_SUCCESS: {
      return action.payload;
    }

    case CART_FAIL: {
      return { loading: false, error: action.payload, ...state };
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
    default:
      return state;
  }
};
