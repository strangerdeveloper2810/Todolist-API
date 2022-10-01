import {GET_ALL_TASK_API} from "../constants/TodolistConstants"
const initialState = {
    taskList:[]
}

const TodolistReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_TASK_API:
    console.log(action.taskList);
    state.taskList = action.taskList;
    return { ...state }

  default:
    return {...state}
  }
}

export default TodolistReducer;
