// json object encoded to string with base64
const { REACT_APP_FIREBASE_AUTH_CONFIG } = process.env;

const decodedConfig = Buffer.from(REACT_APP_FIREBASE_AUTH_CONFIG, 'base64');
export const defaultConfig = JSON.parse(decodedConfig.toString('ascii'));
