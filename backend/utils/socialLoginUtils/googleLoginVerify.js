import { OAuth2Client } from 'google-auth-library';

const googleLoginVerify = async (id) => {
  try {
    const { googleId, tokenId } = id;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return googleId == userid;
  } catch (error) {
    return false;
  }
};

export default googleLoginVerify;
