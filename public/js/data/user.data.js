import { getAPI } from '../API/fetch.js';

const getUserInfo = async () => {
  const response = await getAPI('/auth/user/info');
  return response.data;
};

export { getUserInfo };
