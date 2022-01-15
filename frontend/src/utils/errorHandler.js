import history from '../history';
import toastMessage from './toastMessage';
import { USER_LOGOUT, USER_DETAILS_REMOVE } from '../constants/userConstants';
import toast from 'react-hot-toast';

const errorHandler = (
  error,
  dispatch,
  dismissToastId = null,
  redirect = null,
  errorConfig = null
) => {
  dismissToastId && toast.dismiss(dismissToastId);

  const data = error?.response?.data;
  const status = error?.response?.status;

  switch (status) {
    case 401: {
      // Clear redux user data
      dispatch({ type: USER_LOGOUT });
      dispatch({ type: USER_DETAILS_REMOVE });
      // Clear local storage
      localStorage.clear();
      // push to auth screen
      redirect
        ? history.push(`/auth?redirect=${redirect}`)
        : history.push('/auth');
      // reload page to clear redux
      window.location.reload();
      break;
    }
    default: {
      const errorMessage = errorConfig?.customMessage
        ? errorConfig.customMessage
        : data?.message
        ? data.message
        : data;

      console.log(errorMessage);

      if (errorConfig && errorConfig.showError) {
        toastMessage(errorMessage, 'error');
        return;
      }

      toastMessage(errorMessage, 'error');
    }
  }
};

export default errorHandler;
