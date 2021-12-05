import googleLoginVerify from './googleLoginVerify.js';

const SocialLoginVerify = async (email, id, platform) => {
  switch (platform) {
    case 'google': {
      return await googleLoginVerify(id);
    }

    default:
      return false;
  }
};

export default SocialLoginVerify;
