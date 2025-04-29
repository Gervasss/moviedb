import { combineReducers } from '@reduxjs/toolkit';
import sidePageReducer from './sidepage.reducer';

const rootReducer = combineReducers({
  sidePage: sidePageReducer,
});

export default rootReducer;
