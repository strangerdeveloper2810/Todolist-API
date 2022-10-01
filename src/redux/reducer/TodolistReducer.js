const initialState = {
    taskList:[]
}

const TodolistReducer = (state = initialState, action) => {
  switch (action.type) {

  case "":
    return { ...state }

  default:
    return {...state}
  }
}

export default TodolistReducer;
