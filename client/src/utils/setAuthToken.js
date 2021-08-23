import axios from 'axios';

/**
 * @param token
 * @property common
 */
function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
