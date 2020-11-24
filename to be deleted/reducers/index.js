import { combineReducers } from 'redux';
import itemReducer from './groceryReducer';

const reducers = combineReducers({
  items: itemReducer
});

export default reducers;