import { createStore } from 'redux';
import userReducer from './User/userReducer';

export const store = createStore(userReducer);
