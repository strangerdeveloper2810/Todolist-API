import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import TodolistReducer from "./reducer/TodolistReducer";
// Cấu hình cho redux-saga
import { rootSaga } from "./saga/rootSaga";
import createSagaMiddleware from "@redux-saga/core";
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  TodolistReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
