import axios from 'axios';
import { setUser } from '../redux';

// Request interceptor for API calls

const axiosApiInstance = axios.create();

const interceptor = (store) => {
  axios.interceptors.request.use(
    async (config) => {
      const accessToken = store.getState().token;
      config.withCredentials = true;
      config.headers['Authorization'] = accessToken;
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    async (err) => {
      const originalRequest = err.config;
      if (
        err.response.status === 401 &&
        err.response.data.message === 'Invalid access token.' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const accessToken = await refreshAccessToken();
        store.dispach(setUser({ token: accessToken }));
        originalRequest.headers['Authorization'] = accessToken;
        return axiosApiInstance(originalRequest);
      }
      return Promise.reject(err);
    }
  );
};

async function refreshAccessToken() {
  try {
    const res = await axios.get('/auth/refresh-access-token', {
      withCredentials: true,
    });
    return res.data['access-token'];
  } catch (err) {
    return err;
  }
}

export default {
  interceptor,
};
