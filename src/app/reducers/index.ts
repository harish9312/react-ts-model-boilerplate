import { combineReducers } from 'redux';
import { IArgosStore } from '../../../interfaces';
import { modelReducer } from './modelReducer';

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<IArgosStore>({
  models: modelReducer as any
});
