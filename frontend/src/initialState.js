const localStorageCartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const localStorageUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : undefined;

const initialState = {
  cart: { cartItems: localStorageCartItems },
  userLogin: { loggedIn: localStorageUserInfo ? true : false },
  user: { details: localStorageUserInfo },
};

export default initialState;
