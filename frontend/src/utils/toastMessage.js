import toast from 'react-hot-toast';

const toastMessage = (message, variant = 'blank', duration = 4000) => {
  const config = {
    duration,
    position: 'bottom-center',
  };

  const toastId = toast[variant](message, config);
  return toastId;
};

export default toastMessage;
