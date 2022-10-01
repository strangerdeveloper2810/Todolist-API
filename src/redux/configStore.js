import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createStore } from "redux";
import TodolistReducer from "./reducer/TodolistReducer";

const rootReducer = combineReducers({
  TodolistReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
