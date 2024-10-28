import {getAPI} from '../API/fetch.js';

const getUserInfo = async () => {
    return await getAPI("/auth/user/info");
}

export {
    getUserInfo
}