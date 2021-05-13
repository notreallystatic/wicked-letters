// Redcuer accepts a state and an action as a parameter and returns a new state.
import { SET_USER, REMOVE_USER } from './userTypes';
const jwt = require('jsonwebtoken');

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        token: action.payload.token,
        user: jwt.decode(action.payload.token),
      };

    case REMOVE_USER:
      const newState = state;
      delete newState['user'];
      delete newState['token'];
      return newState;

    default:
      return state;
  }
};

export default userReducer;
